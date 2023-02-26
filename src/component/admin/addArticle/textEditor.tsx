import { useMemo } from 'react';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
//types
import { uploadImageHandlerType } from "../../../hooks/useBlogFormLogic"

type TextEditor = {
    value: string,
    onChange: (value: string) => void,
    uploadImageHandler:uploadImageHandlerType
}
export const TextEditor = (props: TextEditor) => {


  return <ReactQuill theme='bubble' value={props?.value} onChange={props.onChange} />
  
}


// const SimpleMdeEditor = dynamic(
// 	() => import("react-simplemde-editor"),
// 	{ ssr: false }
// );


// type TextEditor = {
//     value: string,
//     onChange: (value: string) => void,
//     uploadImageHandler:uploadImageHandlerType
// }



// export const TextEditor = (props:TextEditor) => {
// //     const options = {
// //         uploadImage: true,
// //         imageUploadFunction:props.uploadImageHandler
// //   }  
    
// const newOptions = useMemo(() => {
//     return {
//       spellChecker: false,
//       // hide image icon and show upload-image icon 
//       //showIcons: ["strikethrough", "table", "code", "upload-image"],
//       autofocus: true,
//       uploadImage: true,
//       imageUploadFunction:props.uploadImageHandler,
//     };
//   }, [])


//   return (<SimpleMdeEditor
//       //style={{width:"100%"}}
//        //@ts-ignore
//          options={newOptions}
//         value={props.value}
//         onChange={props?.onChange} />)
// }