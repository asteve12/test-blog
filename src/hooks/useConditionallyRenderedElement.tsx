import React from 'react';

export const useConditionallyRenderElement = (
  elementToRender: React.ReactNode,
  condition: boolean
): React.ReactNode | void => {
  if (condition) return elementToRender;
  return;
};
