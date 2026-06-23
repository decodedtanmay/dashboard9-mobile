export type Role = "admin" | "user";
export type RegionName =
  | "Nagpur"
  | "Amravati"
  | "Chhatrapati Sambhajinagar"
  | "Nashik"
  | "Konkan"
  | "Pune";

export interface User {
  id: number;
  username: string;
  password?: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: Role;
  region?: RegionName | null;
}

export interface GeoFields {
  region: RegionName;
  circle: string;
  division: string;
  sub_division: string;
  block: string;
}

export interface Region {
  region_id: number;
  region_name: RegionName;
  total_esr_integrated: number;
  fully_completed_esr: number;
  partial_esr: number;
  total_villages_integrated: number;
  fully_completed_villages: number;
  total_schemes_integrated: number;
  fully_completed_schemes: number;
  flow_meter_integrated: number;
  rca_integrated: number;
  pressure_transmitter_integrated: number;
}

export interface SchemeStatus extends GeoFields {
  sr_no: number;
  scheme_id: string;
  scheme_name: string;
  agency: string;
  number_of_village: number;
  total_villages_integrated: number;
  no_of_functional_village: number;
  no_of_partial_village: number;
  no_of_non_functional_village: number;
  fully_completed_villages: number;
  total_number_of_esr: number;
  scheme_functional_status: string;
  total_esr_integrated: number;
  no_fully_completed_esr: number;
  balance_to_complete_esr: number;
  flow_meters_connected: number;
  pressure_transmitter_connected: number;
  residual_chlorine_analyzer_connected: number;
  fully_completion_scheme_status: string;
  mjp_commissioned: string;
  mjp_fully_completed: string;
  water_supply: string;
  agency_type: "MJP" | "ZP";
  water_supply_status: "Full" | "Partial" | "No";
  dashboard_url?: string;
}

export interface RollingLpcdFields {
  water_value_day1: number;
  water_value_day2: number;
  water_value_day3: number;
  water_value_day4: number;
  water_value_day5: number;
  water_value_day6: number;
  water_value_day7: number;
  lpcd_value_day1: number;
  lpcd_value_day2: number;
  lpcd_value_day3: number;
  lpcd_value_day4: number;
  lpcd_value_day5: number;
  lpcd_value_day6: number;
  lpcd_value_day7: number;
  water_date_day1: string;
  water_date_day2: string;
  water_date_day3: string;
  water_date_day4: string;
  water_date_day5: string;
  water_date_day6: string;
  water_date_day7: string;
  lpcd_date_day1: string;
  lpcd_date_day2: string;
  lpcd_date_day3: string;
  lpcd_date_day4: string;
  lpcd_date_day5: string;
  lpcd_date_day6: string;
  lpcd_date_day7: string;
}

export interface WaterSchemeData extends GeoFields, RollingLpcdFields {
  scheme_id: string;
  scheme_name: string;
  village_name: string;
  population: number;
  number_of_esr: number;
  consistent_zero_lpcd_for_a_week: number;
  below_55_lpcd_count: number;
  above_55_lpcd_count: number;
  dashboard_url?: string;
}

export interface SchemeLpcd extends GeoFields, RollingLpcdFields {
  scheme_id: string;
  scheme_name: string;
  population: number;
  total_villages: number;
  consistent_zero_lpcd_for_a_week: number;
  below_55_lpcd_count: number;
  above_55_lpcd_count: number;
  villages_below_55: number;
  villages_above_55: number;
  villages_zero_supply: number;
  dashboard_url?: string;
}

export interface ChlorineData extends GeoFields {
  scheme_id: string;
  scheme_name: string;
  village_name: string;
  esr_name: string;
  chlorine_value_1: number;
  chlorine_value_2: number;
  chlorine_value_3: number;
  chlorine_value_4: number;
  chlorine_value_5: number;
  chlorine_value_6: number;
  chlorine_value_7: number;
  chlorine_date_day_1: string;
  chlorine_date_day_2: string;
  chlorine_date_day_3: string;
  chlorine_date_day_4: string;
  chlorine_date_day_5: string;
  chlorine_date_day_6: string;
  chlorine_date_day_7: string;
  number_of_consistent_zero_value_in_chlorine: number;
  chlorine_less_than_02_mgl: number;
  chlorine_between_02_05_mgl: number;
  chlorine_greater_than_05_mgl: number;
  dashboard_url?: string;
}

export interface PressureData extends GeoFields {
  scheme_id: string;
  scheme_name: string;
  village_name: string;
  esr_name: string;
  pressure_value_1: number;
  pressure_value_2: number;
  pressure_value_3: number;
  pressure_value_4: number;
  pressure_value_5: number;
  pressure_value_6: number;
  pressure_value_7: number;
  pressure_date_day_1: string;
  pressure_date_day_2: string;
  pressure_date_day_3: string;
  pressure_date_day_4: string;
  pressure_date_day_5: string;
  pressure_date_day_6: string;
  pressure_date_day_7: string;
  number_of_consistent_zero_value_in_pressure: number;
  pressure_less_than_02_bar: number;
  pressure_between_02_07_bar: number;
  pressure_greater_than_07_bar: number;
  dashboard_url?: string;
}

export interface WaterConsumption extends GeoFields {
  scheme_id: string;
  scheme_name: string;
  village_name: string;
  esr_name: string;
  flow_rate_m3: number;
  flow_meter_connected: string;
  online_status: string;
  time_duration: string;
  esr_capacity: number;
  water_value_day1: number;
  water_value_day2: number;
  water_value_day3: number;
  water_value_day4: number;
  water_value_day5: number;
  water_value_day6: number;
  water_value_day7: number;
  water_date_day1: string;
  water_date_day2: string;
  water_date_day3: string;
  water_date_day4: string;
  water_date_day5: string;
  water_date_day6: string;
  water_date_day7: string;
  consistent_zero_consumption: number;
  percentage_consumption_previous_day: number;
  dashboard_url?: string;
}

export interface CommunicationStatus extends GeoFields {
  id: number;
  scheme_id: string;
  scheme_name: string;
  village_name: string;
  esr_name: string;
  chlorine_connected: string;
  pressure_connected: string;
  flow_meter_connected: string;
  chlorine_status: string;
  pressure_status: string;
  flow_meter_status: string;
  overall_status: "Online" | "Offline" | "Partial";
  chlorine_0h_72h: string;
  chlorine_72h: string;
  pressure_0h_72h: string;
  pressure_72h: string;
  flow_meter_0h_72h: string;
  flow_meter_72h: string;
  last_seen: string;
  pressure_last_seen: string;
}

export interface SchemeEngineerDetails {
  id: number;
  region: RegionName;
  district: string;
  division: string;
  scheme_id: string;
  scheme: string;
  civil_engineer_name: string;
  civil_engineer_mobile: string;
  civil_engineer_email: string;
  mechanical_engineer_name: string;
  mechanical_engineer_mobile: string;
  mechanical_engineer_email: string;
  site_supervisor_name: string;
  site_supervisor_mobile: string;
  site_supervisor_email: string;
}

export interface HelpdeskTicket extends GeoFields {
  id: number;
  ticket_id: string;
  title: string;
  category: string;
  specific_issue: string;
  description: string;
  level: "Region" | "Circle" | "Division" | "Subdivision" | "Block" | "Scheme" | "Village" | "ESR";
  scheme_id?: string;
  scheme_name?: string;
  village_name?: string;
  esr_name?: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In-Progress" | "Resolved" | "Closed";
  contact_name: string;
  contact_phone?: string;
  contact_email: string;
  dashboard_url?: string;
  created_by: number;
  attachment_path?: string;
  attachment_filename?: string;
  admin_comments?: string;
  created_at: string;
  updated_at: string;
}

export interface ReportFile {
  id: number;
  file_name: string;
  original_name: string;
  file_path: string;
  report_type: string;
  upload_date: string;
  uploaded_by: number;
  file_size: number;
  is_active: boolean;
}

export interface Vendor {
  id: number;
  region: RegionName;
  agency: string;
  employee_name: string;
  email: string;
  phone: string;
}

export interface EmailAlertLog {
  id: number;
  scheme_id: string;
  scheme_name: string;
  region: RegionName;
  village_name?: string;
  esr_name?: string;
  alert_type: "LPCD" | "Chlorine" | "Pressure" | "Water" | "Communication";
  alert_value: string;
  civil_engineer_name?: string;
  civil_engineer_email?: string;
  mechanical_engineer_name?: string;
  mechanical_engineer_email?: string;
  site_supervisor_name?: string;
  site_supervisor_email?: string;
  sent_date: string;
  sent_time: string;
  ticket_id?: string;
  created_at: string;
  acknowledged?: boolean;
}

export interface DashboardSummary {
  totalSchemes: number;
  totalVillages: number;
  totalEsr: number;
  totalPopulation: number;
  avgLpcd: number;
  above55Count: number;
  below55Count: number;
  zeroCount: number;
  optimalChlorine: number;
  belowChlorine: number;
  aboveChlorine: number;
  optimalPressure: number;
  lowPressure: number;
  highPressure: number;
  communicatingSensors: number;
  nonCommunicatingSensors: number;
  lastUpdated: string;
}

export interface GeoFilter {
  region?: RegionName | "All";
  circle?: string;
  division?: string;
  sub_division?: string;
  block?: string;
  scheme_id?: string;
  village_name?: string;
  esr_name?: string;
}
