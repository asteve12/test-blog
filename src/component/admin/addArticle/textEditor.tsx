import { useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type TextEditor = {
    value: string,
    onChange:(value:string)=> void 
}



export const TextEditor = (props:TextEditor) => {
    const options = {
        uploadImage:true
  }  


    return (<SimpleMDE options={options} value={props.value} onChange={props?.onChange}/>)
}