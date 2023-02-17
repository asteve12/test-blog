import { useMemo } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
 //types
 import {uploadImageHandlerType} from "../../../hooks/useBlogFormLogic"


type TextEditor = {
    value: string,
    onChange: (value: string) => void,
    uploadImageHandler:uploadImageHandlerType
}



export const TextEditor = (props:TextEditor) => {
//     const options = {
//         uploadImage: true,
//         imageUploadFunction:props.uploadImageHandler
//   }  
    
const newOptions = useMemo(() => {
    return {
      spellChecker: false,
      // hide image icon and show upload-image icon 
      showIcons: ["strikethrough", "table", "code", "upload-image"],
       hideIcons: [ "image"],
      uploadImage: true,
      imageUploadFunction:props.uploadImageHandler,
    };
  }, [])


    return (<SimpleMDE
        id="editor"
        //@ts-ignore
         options={newOptions}
        value={props.value}
        onChange={props?.onChange} />)
}