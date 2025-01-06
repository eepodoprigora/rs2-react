export const parseNoteContent = (text: string) => {
  const trimmedText = text.trim();
  if (!trimmedText) return { title: "", description: "" };

  const [firstLine, ...rest] = trimmedText.split("\n");
  return {
    title: firstLine.trim(),
    description: rest.join("\n").trim(),
  };
};
