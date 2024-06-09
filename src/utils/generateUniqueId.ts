export const generateUniqueId = (index?: number) =>
  `${new Date().getTime().toString()}_${index || ""}`;
