import { useMemo } from 'react';
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
 //types
import { uploadImageHandlerType } from "../../../hooks/useBlogFormLogic"


const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);


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


  return (<SimpleMdeEditor
      style={{width:"100%"}}
        id="editor"
        //@ts-ignore
         options={newOptions}
        value={props.value}
        onChange={props?.onChange} />)
}