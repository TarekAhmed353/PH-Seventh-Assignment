import type { ChangeDir } from "./types";

const bnNumber = new Intl.NumberFormat("bn-BD");

const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function toBn(value: number) {
  return bnNumber.format(value);
}

export function formatPrice(value: number) {
  return `${bnNumber.format(value)} টাকা`;
}

export function formatPercent(pct: number) {
  return `${bnPercent.format(Math.abs(pct))}%`;
}

export function unitName(unit: string) {
  return unitNames[unit] ?? unit;
}

export function perUnit(unit: string) {
  return `প্রতি ${unitName(unit)}`;
}

export function changeArrow(dir: ChangeDir) {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}
export function bnDate(date: Date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}