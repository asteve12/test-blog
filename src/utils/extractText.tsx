



export const extractTextFromHtmlStringToText = (HtmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(HtmlString, 'text/html');
    const allText = doc.body.textContent as string;

    return allText;
    

}