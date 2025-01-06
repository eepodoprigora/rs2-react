export const formatTime = (createdAt: Date): string => {
  const now = new Date();
  const isSameDay =
    createdAt.getDate() === now.getDate() &&
    createdAt.getMonth() === now.getMonth() &&
    createdAt.getFullYear() === now.getFullYear();

  if (isSameDay) {
    const hours = createdAt.getHours().toString().padStart(2, "0");
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    const day = createdAt.getDate().toString().padStart(2, "0");
    const month = (createdAt.getMonth() + 1).toString().padStart(2, "0");
    const year = createdAt.getFullYear();
    return `${day}.${month}.${year}`;
  }
};
