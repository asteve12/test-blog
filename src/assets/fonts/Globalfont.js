import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
        @font-face{
            // font-family:"satoshi";
            src:url(./Satoshi_Complete/Fonts/OTF/Satoshi-Regular.otf);
        }
        
        `}
  ></Global>
);
