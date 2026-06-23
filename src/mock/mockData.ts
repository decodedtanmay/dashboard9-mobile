import { subDays } from "date-fns";
import {
  ChlorineData,
  CommunicationStatus,
  EmailAlertLog,
  PressureData,
  Region,
  RegionName,
  ReportFile,
  SchemeEngineerDetails,
  SchemeLpcd,
  SchemeStatus,
  User,
  Vendor,
  WaterConsumption,
  WaterSchemeData
} from "@/domain/entities";
import { average, calculateLPCD } from "@/services/classification";

export const regionNames: RegionName[] = [
  "Nagpur",
  "Amravati",
  "Chhatrapati Sambhajinagar",
  "Nashik",
  "Konkan",
  "Pune"
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "System Administrator",
    email: "admin@mahajaliot.in",
    phone: "9876543210",
    role: "admin",
    region: null
  },
  {
    id: 2,
    username: "nashik_user",
    password: "user123",
    name: "Nashik Region Officer",
    email: "nashik@mahajaliot.in",
    phone: "9876543211",
    role: "user",
    region: "Nashik"
  }
];

const today = new Date();
const day = (offset: number) => subDays(today, offset).toISOString().slice(0, 10);

const regionSeeds = {
  Nagpur: { schemes: 45, villages: 312, esr: 289, population: 1250000 },
  Amravati: { schemes: 38, villages: 276, esr: 251, population: 980000 },
  "Chhatrapati Sambhajinagar": { schemes: 52, villages: 389, esr: 354, population: 1480000 },
  Nashik: { schemes: 61, villages: 445, esr: 412, population: 1720000 },
  Konkan: { schemes: 34, villages: 228, esr: 209, population: 870000 },
  Pune: { schemes: 58, villages: 421, esr: 390, population: 1650000 }
} satisfies Record<RegionName, { schemes: number; villages: number; esr: number; population: number }>;

export const mockRegions: Region[] = regionNames.map((region_name, index) => {
  const seed = regionSeeds[region_name];
  return {
    region_id: index + 1,
    region_name,
    total_esr_integrated: seed.esr,
    fully_completed_esr: Math.round(seed.esr * 0.78),
    partial_esr: Math.round(seed.esr * 0.14),
    total_villages_integrated: seed.villages,
    fully_completed_villages: Math.round(seed.villages * 0.8),
    total_schemes_integrated: seed.schemes,
    fully_completed_schemes: Math.round(seed.schemes * 0.76),
    flow_meter_integrated: Math.round(seed.esr * 0.92),
    rca_integrated: Math.round(seed.esr * 0.86),
    pressure_transmitter_integrated: Math.round(seed.esr * 0.88)
  };
});

const blocksByRegion: Record<RegionName, string[]> = {
  Nagpur: ["Kamptee", "Hingna", "Katol"],
  Amravati: ["Daryapur", "Achalpur", "Morshi"],
  "Chhatrapati Sambhajinagar": ["Paithan", "Sillod", "Kannad"],
  Nashik: ["Dindori", "Niphad", "Igatpuri"],
  Konkan: ["Roha", "Mahad", "Khed"],
  Pune: ["Baramati", "Daund", "Junnar"]
};

const schemeId = (region: RegionName, index: number) => `MH-${region.slice(0, 3).toUpperCase().replace("CHH", "CS")}-${String(index + 1).padStart(3, "0")}`;

export const mockSchemes: SchemeStatus[] = regionNames.flatMap((region, regionIndex) =>
  Array.from({ length: 4 }, (_, localIndex) => {
    const globalIndex = regionIndex * 4 + localIndex;
    const block = blocksByRegion[region][localIndex % blocksByRegion[region].length] ?? "Block";
    const villages = 7 + ((globalIndex + 2) % 8);
    const esr = villages + ((globalIndex + 1) % 4);
    const completed = Math.max(1, Math.round(esr * (0.68 + (localIndex % 3) * 0.08)));
    return {
      sr_no: globalIndex + 1,
      scheme_id: schemeId(region, localIndex),
      region,
      circle: `${region} Circle`,
      division: `${region} Division ${localIndex % 2 ? "B" : "A"}`,
      sub_division: `${block} Sub Division`,
      block,
      scheme_name: `${block} Regional Rural Water Supply Scheme Phase-${localIndex + 1}`,
      agency: localIndex % 2 === 0 ? "Maharashtra Jeevan Pradhikaran" : "Zilla Parishad",
      number_of_village: villages,
      total_villages_integrated: Math.max(1, villages - (localIndex % 3)),
      no_of_functional_village: Math.max(1, villages - 2),
      no_of_partial_village: localIndex % 3,
      no_of_non_functional_village: localIndex % 2,
      fully_completed_villages: Math.max(1, villages - (localIndex % 4)),
      total_number_of_esr: esr,
      scheme_functional_status: localIndex % 5 === 0 ? "Partial Functional" : "Functional",
      total_esr_integrated: esr,
      no_fully_completed_esr: completed,
      balance_to_complete_esr: Math.max(0, esr - completed),
      flow_meters_connected: Math.round(esr * 0.92),
      pressure_transmitter_connected: Math.round(esr * 0.87),
      residual_chlorine_analyzer_connected: Math.round(esr * 0.83),
      fully_completion_scheme_status: completed === esr ? "Fully Completed" : "In Progress",
      mjp_commissioned: localIndex % 4 === 0 ? "No" : "Yes",
      mjp_fully_completed: completed === esr ? "Fully Completed" : "In Progress",
      water_supply: localIndex % 6 === 0 ? "Partial" : "Yes",
      agency_type: localIndex % 2 === 0 ? "MJP" : "ZP",
      water_supply_status: localIndex % 6 === 0 ? "Partial" : "Full",
      dashboard_url: `https://dashboard1.mahajaliot.in/scheme/${schemeId(region, localIndex)}`
    };
  })
);

function lpcdSeries(base: number, drift: number): number[] {
  return Array.from({ length: 7 }, (_, index) => Number(Math.max(0, base + drift * index + ((index % 3) - 1) * 2.4).toFixed(1)));
}

export const mockWaterSchemeData: WaterSchemeData[] = mockSchemes.flatMap((scheme, schemeIndex) =>
  Array.from({ length: Math.min(8, scheme.number_of_village) }, (_, villageIndex) => {
    const village_name = `${scheme.block} Village ${villageIndex + 1}`;
    const population = 1800 + villageIndex * 720 + schemeIndex * 65;
    const base = villageIndex % 9 === 0 ? 0 : villageIndex % 4 === 0 ? 42 : 62 + (schemeIndex % 5);
    const lpcd = lpcdSeries(base, villageIndex % 2 ? -0.4 : 0.35);
    const water = lpcd.map((value) => Number(((value * population) / 1000).toFixed(2)));
    return {
      region: scheme.region,
      circle: scheme.circle,
      division: scheme.division,
      sub_division: scheme.sub_division,
      block: scheme.block,
      scheme_id: scheme.scheme_id,
      scheme_name: scheme.scheme_name,
      village_name,
      population,
      number_of_esr: 1 + (villageIndex % 3),
      water_value_day1: water[0] ?? 0,
      water_value_day2: water[1] ?? 0,
      water_value_day3: water[2] ?? 0,
      water_value_day4: water[3] ?? 0,
      water_value_day5: water[4] ?? 0,
      water_value_day6: water[5] ?? 0,
      water_value_day7: water[6] ?? 0,
      lpcd_value_day1: lpcd[0] ?? 0,
      lpcd_value_day2: lpcd[1] ?? 0,
      lpcd_value_day3: lpcd[2] ?? 0,
      lpcd_value_day4: lpcd[3] ?? 0,
      lpcd_value_day5: lpcd[4] ?? 0,
      lpcd_value_day6: lpcd[5] ?? 0,
      lpcd_value_day7: lpcd[6] ?? 0,
      water_date_day1: day(0),
      water_date_day2: day(1),
      water_date_day3: day(2),
      water_date_day4: day(3),
      water_date_day5: day(4),
      water_date_day6: day(5),
      water_date_day7: day(6),
      lpcd_date_day1: day(0),
      lpcd_date_day2: day(1),
      lpcd_date_day3: day(2),
      lpcd_date_day4: day(3),
      lpcd_date_day5: day(4),
      lpcd_date_day6: day(5),
      lpcd_date_day7: day(6),
      consistent_zero_lpcd_for_a_week: lpcd.every((value) => value === 0) ? 1 : 0,
      below_55_lpcd_count: lpcd.filter((value) => value > 0 && value < 55).length,
      above_55_lpcd_count: lpcd.filter((value) => value >= 55).length,
      dashboard_url: scheme.dashboard_url
    };
  })
);

export const mockSchemeLpcd: SchemeLpcd[] = mockSchemes.map((scheme) => {
  const villages = mockWaterSchemeData.filter((item) => item.scheme_id === scheme.scheme_id);
  const population = villages.reduce((sum, village) => sum + village.population, 0);
  const water = [1, 2, 3, 4, 5, 6, 7].map((dayNumber) =>
    villages.reduce((sum, village) => sum + Number(village[`water_value_day${dayNumber}` as keyof WaterSchemeData]), 0)
  );
  const lpcd = water.map((value) => Number(calculateLPCD(value, population).toFixed(1)));
  return {
    region: scheme.region,
    circle: scheme.circle,
    division: scheme.division,
    sub_division: scheme.sub_division,
    block: scheme.block,
    scheme_id: scheme.scheme_id,
    scheme_name: scheme.scheme_name,
    population,
    total_villages: villages.length,
    water_value_day1: water[0] ?? 0,
    water_value_day2: water[1] ?? 0,
    water_value_day3: water[2] ?? 0,
    water_value_day4: water[3] ?? 0,
    water_value_day5: water[4] ?? 0,
    water_value_day6: water[5] ?? 0,
    water_value_day7: water[6] ?? 0,
    lpcd_value_day1: lpcd[0] ?? 0,
    lpcd_value_day2: lpcd[1] ?? 0,
    lpcd_value_day3: lpcd[2] ?? 0,
    lpcd_value_day4: lpcd[3] ?? 0,
    lpcd_value_day5: lpcd[4] ?? 0,
    lpcd_value_day6: lpcd[5] ?? 0,
    lpcd_value_day7: lpcd[6] ?? 0,
    water_date_day1: day(0),
    water_date_day2: day(1),
    water_date_day3: day(2),
    water_date_day4: day(3),
    water_date_day5: day(4),
    water_date_day6: day(5),
    water_date_day7: day(6),
    lpcd_date_day1: day(0),
    lpcd_date_day2: day(1),
    lpcd_date_day3: day(2),
    lpcd_date_day4: day(3),
    lpcd_date_day5: day(4),
    lpcd_date_day6: day(5),
    lpcd_date_day7: day(6),
    consistent_zero_lpcd_for_a_week: villages.filter((village) => village.consistent_zero_lpcd_for_a_week).length,
    below_55_lpcd_count: villages.filter((village) => village.lpcd_value_day1 > 0 && village.lpcd_value_day1 < 55).length,
    above_55_lpcd_count: villages.filter((village) => village.lpcd_value_day1 >= 55).length,
    villages_below_55: villages.filter((village) => village.lpcd_value_day1 > 0 && village.lpcd_value_day1 < 55).length,
    villages_above_55: villages.filter((village) => village.lpcd_value_day1 >= 55).length,
    villages_zero_supply: villages.filter((village) => village.lpcd_value_day1 === 0).length,
    dashboard_url: scheme.dashboard_url
  };
});

export const mockChlorineData: ChlorineData[] = mockWaterSchemeData.flatMap((village, index) =>
  Array.from({ length: Math.min(2, village.number_of_esr) }, (_, esrIndex) => {
    const base = (index + esrIndex) % 8 === 0 ? 0.12 : (index + esrIndex) % 7 === 0 ? 0.62 : 0.32 + (index % 5) * 0.02;
    const values = Array.from({ length: 7 }, (_, dayIndex) => Number(Math.max(0, base + ((dayIndex % 3) - 1) * 0.03).toFixed(2)));
    return {
      region: village.region,
      circle: village.circle,
      division: village.division,
      sub_division: village.sub_division,
      block: village.block,
      scheme_id: village.scheme_id,
      scheme_name: village.scheme_name,
      village_name: village.village_name,
      esr_name: `${village.village_name} ESR-${esrIndex + 1}`,
      chlorine_value_1: values[0] ?? 0,
      chlorine_value_2: values[1] ?? 0,
      chlorine_value_3: values[2] ?? 0,
      chlorine_value_4: values[3] ?? 0,
      chlorine_value_5: values[4] ?? 0,
      chlorine_value_6: values[5] ?? 0,
      chlorine_value_7: values[6] ?? 0,
      chlorine_date_day_1: day(0),
      chlorine_date_day_2: day(1),
      chlorine_date_day_3: day(2),
      chlorine_date_day_4: day(3),
      chlorine_date_day_5: day(4),
      chlorine_date_day_6: day(5),
      chlorine_date_day_7: day(6),
      number_of_consistent_zero_value_in_chlorine: values.every((value) => value === 0) ? 1 : 0,
      chlorine_less_than_02_mgl: values.filter((value) => value < 0.2).length,
      chlorine_between_02_05_mgl: values.filter((value) => value >= 0.2 && value <= 0.5).length,
      chlorine_greater_than_05_mgl: values.filter((value) => value > 0.5).length,
      dashboard_url: village.dashboard_url
    };
  })
);

export const mockPressureData: PressureData[] = mockChlorineData.map((item, index) => {
  const base = index % 9 === 0 ? 0.12 : index % 8 === 0 ? 0.86 : 0.41 + (index % 4) * 0.05;
  const values = Array.from({ length: 7 }, (_, dayIndex) => Number(Math.max(0, base + ((dayIndex % 3) - 1) * 0.04).toFixed(2)));
  return {
    region: item.region,
    circle: item.circle,
    division: item.division,
    sub_division: item.sub_division,
    block: item.block,
    scheme_id: item.scheme_id,
    scheme_name: item.scheme_name,
    village_name: item.village_name,
    esr_name: item.esr_name,
    pressure_value_1: values[0] ?? 0,
    pressure_value_2: values[1] ?? 0,
    pressure_value_3: values[2] ?? 0,
    pressure_value_4: values[3] ?? 0,
    pressure_value_5: values[4] ?? 0,
    pressure_value_6: values[5] ?? 0,
    pressure_value_7: values[6] ?? 0,
    pressure_date_day_1: day(0),
    pressure_date_day_2: day(1),
    pressure_date_day_3: day(2),
    pressure_date_day_4: day(3),
    pressure_date_day_5: day(4),
    pressure_date_day_6: day(5),
    pressure_date_day_7: day(6),
    number_of_consistent_zero_value_in_pressure: values.every((value) => value === 0) ? 1 : 0,
    pressure_less_than_02_bar: values.filter((value) => value < 0.2).length,
    pressure_between_02_07_bar: values.filter((value) => value >= 0.2 && value <= 0.7).length,
    pressure_greater_than_07_bar: values.filter((value) => value > 0.7).length,
    dashboard_url: item.dashboard_url
  };
});

export const mockWaterConsumption: WaterConsumption[] = mockPressureData.map((item, index) => {
  const values = Array.from({ length: 7 }, (_, dayIndex) => Number((75 + index * 1.7 + ((dayIndex % 3) - 1) * 8).toFixed(1)));
  return {
    region: item.region,
    circle: item.circle,
    division: item.division,
    sub_division: item.sub_division,
    block: item.block,
    scheme_id: item.scheme_id,
    scheme_name: item.scheme_name,
    village_name: item.village_name,
    esr_name: item.esr_name,
    flow_rate_m3: Number((8 + (index % 10) * 0.7).toFixed(1)),
    flow_meter_connected: index % 12 === 0 ? "No" : "Yes",
    online_status: index % 12 === 0 ? "Offline" : "Online",
    time_duration: index % 12 === 0 ? ">72h" : "0-72h",
    esr_capacity: 75000 + (index % 6) * 25000,
    water_value_day1: values[0] ?? 0,
    water_value_day2: values[1] ?? 0,
    water_value_day3: values[2] ?? 0,
    water_value_day4: values[3] ?? 0,
    water_value_day5: values[4] ?? 0,
    water_value_day6: values[5] ?? 0,
    water_value_day7: values[6] ?? 0,
    water_date_day1: day(0),
    water_date_day2: day(1),
    water_date_day3: day(2),
    water_date_day4: day(3),
    water_date_day5: day(4),
    water_date_day6: day(5),
    water_date_day7: day(6),
    consistent_zero_consumption: values.every((value) => value === 0) ? 1 : 0,
    percentage_consumption_previous_day: Number((((values[0] ?? 0) / Math.max(1, values[1] ?? 1) - 1) * 100).toFixed(1)),
    dashboard_url: item.dashboard_url
  };
});

export const mockCommunicationStatus: CommunicationStatus[] = mockPressureData.map((item, index) => {
  const offline = index % 11 === 0;
  const partial = !offline && index % 7 === 0;
  return {
    id: index + 1,
    region: item.region,
    circle: item.circle,
    division: item.division,
    sub_division: item.sub_division,
    block: item.block,
    scheme_id: item.scheme_id,
    scheme_name: item.scheme_name,
    village_name: item.village_name,
    esr_name: item.esr_name,
    chlorine_connected: offline ? "No" : "Yes",
    pressure_connected: partial ? "No" : "Yes",
    flow_meter_connected: offline ? "No" : "Yes",
    chlorine_status: offline ? "Offline" : "Online",
    pressure_status: offline || partial ? "Offline" : "Online",
    flow_meter_status: offline ? "Offline" : "Online",
    overall_status: offline ? "Offline" : partial ? "Partial" : "Online",
    chlorine_0h_72h: offline ? "0" : "1",
    chlorine_72h: offline ? "1" : "0",
    pressure_0h_72h: partial ? "1" : "0",
    pressure_72h: offline ? "1" : "0",
    flow_meter_0h_72h: offline ? "0" : "1",
    flow_meter_72h: offline ? "1" : "0",
    last_seen: subDays(today, offline ? 4 : 0).toISOString(),
    pressure_last_seen: subDays(today, offline ? 5 : partial ? 2 : 0).toISOString()
  };
});

export const mockEngineers: SchemeEngineerDetails[] = mockSchemes.map((scheme, index) => ({
  id: index + 1,
  region: scheme.region,
  district: scheme.block,
  division: scheme.division,
  scheme_id: scheme.scheme_id,
  scheme: scheme.scheme_name,
  civil_engineer_name: `Civil Engineer ${index + 1}`,
  civil_engineer_mobile: `98${String(70000000 + index * 19).padStart(8, "0")}`,
  civil_engineer_email: `civil.${index + 1}@mahajaliot.in`,
  mechanical_engineer_name: `Mechanical Engineer ${index + 1}`,
  mechanical_engineer_mobile: `97${String(60000000 + index * 23).padStart(8, "0")}`,
  mechanical_engineer_email: `mechanical.${index + 1}@mahajaliot.in`,
  site_supervisor_name: `Site Supervisor ${index + 1}`,
  site_supervisor_mobile: `96${String(50000000 + index * 31).padStart(8, "0")}`,
  site_supervisor_email: `site.${index + 1}@mahajaliot.in`
}));

export const mockVendors: Vendor[] = regionNames.map((region, index) => ({
  id: index + 1,
  region,
  agency: index % 2 === 0 ? "MJP" : "ZP",
  employee_name: `${region} Vendor Coordinator`,
  email: `${region.toLowerCase().replaceAll(" ", ".")}@vendor.mahajaliot.in`,
  phone: `95${String(50000000 + index * 777).padStart(8, "0")}`
}));

export const mockReports: ReportFile[] = [
  "esr_level",
  "water_consumption",
  "lpcd_village",
  "chlorine",
  "pressure",
  "scheme_level"
].map((report_type, index) => ({
  id: index + 1,
  file_name: `${report_type}_${day(index)}.xlsx`,
  original_name: `${report_type.replaceAll("_", " ")} report ${day(index)}.xlsx`,
  file_path: `/reports/admin/${report_type}_${day(index)}.xlsx`,
  report_type,
  upload_date: subDays(today, index).toISOString(),
  uploaded_by: 1,
  file_size: 180000 + index * 42000,
  is_active: true
}));

export const mockAlerts: EmailAlertLog[] = mockChlorineData.slice(0, 12).map((item, index) => ({
  id: index + 1,
  scheme_id: item.scheme_id,
  scheme_name: item.scheme_name,
  region: item.region,
  village_name: item.village_name,
  esr_name: item.esr_name,
  alert_type: index % 3 === 0 ? "Chlorine" : index % 3 === 1 ? "Pressure" : "LPCD",
  alert_value: index % 3 === 0 ? `${item.chlorine_value_1} mg/L` : index % 3 === 1 ? "0.12 bar" : "42 LPCD",
  civil_engineer_name: `Civil Engineer ${index + 1}`,
  civil_engineer_email: `civil.${index + 1}@mahajaliot.in`,
  sent_date: day(index % 4),
  sent_time: "09:30:00",
  ticket_id: `AL-${String(index + 1).padStart(5, "0")}`,
  created_at: subDays(today, index % 4).toISOString()
}));

export function lpcdValues(item: WaterSchemeData | SchemeLpcd): number[] {
  return [
    item.lpcd_value_day1,
    item.lpcd_value_day2,
    item.lpcd_value_day3,
    item.lpcd_value_day4,
    item.lpcd_value_day5,
    item.lpcd_value_day6,
    item.lpcd_value_day7
  ];
}

export function latestAverageLpcd(items: (WaterSchemeData | SchemeLpcd)[]): number {
  return average(items.map((item) => item.lpcd_value_day1));
}
