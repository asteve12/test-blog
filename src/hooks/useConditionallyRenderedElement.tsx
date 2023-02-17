import React from 'react';



export const useConditionallyRenderElement = (
  elementToRender: React.ReactNode,
  condition: boolean,
  loaderToShow?: React.ReactNode,
  showLoader?:boolean
): React.ReactNode | void => {
  if (condition) return elementToRender;
  if(showLoader) return loaderToShow 
  return <></>;
};
