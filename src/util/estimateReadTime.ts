  //estimate article read time 
export function estimateArticleReadTime  (article: string):number | void {
    const wordsPerMinute = 200; 
    
    
    let textLength = article?.split(" ").length;
    if(textLength > 0){
      let value = Math.ceil(textLength / wordsPerMinute);
         
        return value
    }

  
    
}