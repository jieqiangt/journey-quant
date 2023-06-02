export const convertDatetoStr = (date: Date) => {
  const yearStr = date.toLocaleString("default", { year: "numeric" });
  const monthStr = date.toLocaleString("default", { month: "2-digit" });
  const dayStr = date.toLocaleString("default", { day: "2-digit" });

  return `${yearStr}-${monthStr}-${dayStr}`;
};

export const addYears = (date: Date, years: number) => {
  const newDate = new Date(date)
  newDate.setFullYear(date.getFullYear() + years);
  return newDate;
}
