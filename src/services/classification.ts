export type LpcdStatus = "above_55" | "below_55" | "zero";
export type ChlorineStatus = "optimal" | "below" | "above";
export type PressureStatus = "low" | "optimal" | "high";

export function classifyLPCD(value: number | null | undefined): LpcdStatus {
  if (value == null || value === 0) return "zero";
  return value >= 55 ? "above_55" : "below_55";
}

export function classifyChlorine(value: number | null | undefined): ChlorineStatus {
  if (value == null || value < 0.2) return "below";
  if (value <= 0.5) return "optimal";
  return "above";
}

export function classifyPressure(value: number | null | undefined): PressureStatus {
  if (value == null || value < 0.2) return "low";
  if (value <= 0.7) return "optimal";
  return "high";
}

export function calculateLPCD(waterValueKL: number, population: number): number {
  if (!population) return 0;
  return (waterValueKL * 1000) / population;
}

export function average(values: (number | null | undefined)[]): number {
  const valid = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!valid.length) return 0;
  return Number((valid.reduce((sum, value) => sum + value, 0) / valid.length).toFixed(2));
}

export function classifyCommunication(lastSeen: string | null | undefined): "communicating" | "not_communicating" {
  if (!lastSeen) return "not_communicating";
  const minutes = (Date.now() - new Date(lastSeen).getTime()) / 60000;
  return minutes <= 30 ? "communicating" : "not_communicating";
}

export function classifyOfflineDuration(lastSeen: string | null | undefined): "0-72h" | ">72h" | "unknown" {
  if (!lastSeen) return "unknown";
  const hours = (Date.now() - new Date(lastSeen).getTime()) / 3600000;
  return hours <= 72 ? "0-72h" : ">72h";
}

export function isSensorCommunicating(sensorType: string, flowError: number, clError: number, lastSeen?: string | null): boolean {
  switch (sensorType) {
    case "Flow Meter":
      return flowError === 0 && clError === 1;
    case "Chlorine (4-20mA)":
      return (flowError === 1 && clError === 0) || (flowError === 1 && clError === 1);
    case "Chlorine (Rs485)":
      return flowError === 1 && clError === 0;
    case "Pressure":
      return classifyCommunication(lastSeen) === "communicating";
    default:
      return false;
  }
}
