import React from "react";






export const useConditionallyRenderElemnent = (elementToRender:React.ReactNode, condtion:boolean):React.ReactNode |void  => {
    
    if (condtion) return elementToRender;
    return;



}