export const CATEGORYCOLORS = [
  { category: "allowance", color: "#0010F1" },
  { category: "necessities", color: "#128412" },
  { category: "healthcare", color: "#E41010" },
  { category: "education", color: "#0010F1" },
  { category: "entertainment", color: "#FF8F07" },
  { category: "food", color: "#0010F1" },
  { category: "transport", color: "#FF8F07" },
  { category: "travel", color: "#FF8F07" },
];


const getCategoryColorsObj = (categoryColors: any) => {
  const categoryColorsObj: any = {};
  for (const color of categoryColors) {
    categoryColorsObj[color.category] = color.color;
  }
  return categoryColorsObj;
}

export const CATEGORYCOLORSOBJ = getCategoryColorsObj(CATEGORYCOLORS)


