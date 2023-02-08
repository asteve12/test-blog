import { remark } from "remark";
import html from "remark-html";

export async function parseContent(context: string) {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(context);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return contentHtml;
}
