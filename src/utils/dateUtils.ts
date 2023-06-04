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


export const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date)

  const curMonth = newDate.getMonth() + 1
  const posNeg = months > 0 ? 1 : -1;
  const monthsLeft = Math.abs(months) % 12
  let yearsToAdd = Math.floor(Math.abs(months) / 12)

  let newMonth = curMonth + posNeg * monthsLeft

  if (newMonth <= 0) {
    yearsToAdd += 1
    newMonth = 12 + (newMonth)
  }

  if (newMonth > 12) {
    yearsToAdd += 1
    newMonth = (newMonth) % 12
  }

  newDate.setFullYear(date.getFullYear() + posNeg * yearsToAdd);
  newDate.setMonth(newMonth - 1)
  return newDate;
}
