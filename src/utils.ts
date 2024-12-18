export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
