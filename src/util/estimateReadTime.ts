//estimate article read time
export function estimateArticleReadTime(article: string): number {
  const wordsPerMinute = 200;
  let value = 0;

  let textLength = article?.split(' ').length;
  if (textLength > 0) {
    value = Math.ceil(textLength / wordsPerMinute);

    return value;
  }

  return value;
}
