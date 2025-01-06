export const removeMarkdown = (markdownText: string) => {
  return markdownText
    .replace(/([*_~`])/g, "")
    .replace(/#{1,6}\s?/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/>.*$/gm, "")
    .trim();
};
