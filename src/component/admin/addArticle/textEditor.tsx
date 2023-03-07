import React,{ useMemo, useRef,useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import {BiBold} from "react-icons/bi"
import 'react-quill/dist/quill.snow.css';
import { BiItalic } from "react-icons/bi"
import {AiOutlineUnderline} from "react-icons/ai"
//types
import { uploadImageHandlerType } from "../../../hooks/useBlogFormLogic"
import { Box,Text,Modal} from '@chakra-ui/react';
import { api } from '@/axios';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }:any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);






 
type TextEditor = {
    value: string,
    onChange: (value: string) => void,
    uploadImageHandler:(imageToUpload:File)=>  Promise<any>
}



const CustomBoldBtn = () => <BiBold size="25"></BiBold>
const CustomUnderLinebtn  = ()=> <AiOutlineUnderline size="25"></AiOutlineUnderline>

const CustomItalicBtn = ()=> <BiItalic size="25"/>


const CustomToolBar = () => {

  // "header",
  // "size",
  // "bold",
  // "italic",
  // "underline",
  // "strike",
  // "blockquote",
  // "list",
  // "bullet",
  // "indent",
  // "link",
  // "image",
  // "color",
  // " video",
 
  

  return <div id="toolbar">
    
    <select className='ql-size'/>
    {/* <select className="ql-align" /> */}
    {/* <button className='ql-underline' /> */}
    <button className='ql-image' />
    <button className='ql-video' /> 
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
    <option value="1" />
      <option value="2" />
      
    </select>
    {/* <button className='ql-heading' />  */}
    
    <button className='ql-custombold' >
    {/* <button className="ql-italic" /> */}
      <CustomBoldBtn></CustomBoldBtn>
    </button>
    <button className='ql-customItalic'>
      <CustomItalicBtn></CustomItalicBtn>
    </button>
    <button className='ql-customUnderline'>
      <CustomUnderLinebtn></CustomUnderLinebtn>
    </button>

    {/* <button className="ql-clean" /> */}
  </div>
}




function custombold() {
  //@ts-ignore
  const format = this.quill.getFormat();
  //@ts-ignore
  const selectionRange = this.quill.getSelection();
   const isBold = format['bold'];
  //@ts-ignore
  this.quill.formatText(selectionRange.index, selectionRange.length,{'bold': !isBold}); 

  
}


function customItalic() {

    //@ts-ignore
  const format = this.quill.getFormat();
  
   const isItalic = format["italic"]  // check for default or custom italic format
  //@ts-ignore
  const selectionRange = this.quill.getSelection();
  //@ts-ignore
  isItalic === true ? this.quill.formatText(selectionRange.index, selectionRange.length, 'italic', false) :this.quill.formatText(selectionRange.index, selectionRange.length, 'italic', true)
  
  
} 


function customUnderline() {

   //@ts-ignore
   const format = this.quill.getFormat();
  
   const isUnderline = format["underline"]  // check for default or custom italic format
  //@ts-ignore
  const selectionRange = this.quill.getSelection();
  //@ts-ignore
  isUnderline === true ? this.quill.formatText(selectionRange.index, selectionRange.length, "underline", false) :this.quill.formatText(selectionRange.index, selectionRange.length, "underline", true)

  
}





export const TextEditor = (props: TextEditor) => {

  const [uploading,setUploading] = useState<boolean>()

   const quillRef = useRef();


 


  // useEffect(() => {
  //   if (!quillRef.current) return;

  //   console.log("ref",quillRef.current)
  //   //@ts-ignore
    
  // }, [quillRef])


  async function uploadFiles(uploadFileObj: File, quillObj: any,type:string) {
    
    let uplaodResponse :boolean; 

  

    try {
                
      const upload_response =  await props.uploadImageHandler(uploadFileObj)
      const { data } = upload_response;
      const ImagePath = data[0]?.url 
      const image_url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${ImagePath}`
      const range = quillObj.getEditorSelection();  

     quillObj.getEditor().insertEmbed(range.index, 'image', image_url) 
     
     //onSuccess(image_url)
     return  uplaodResponse = true;

    } catch (errorMessage) {
      setUploading(false)
      //onError("")
      
  }
    
    
    
    
  } 


  function uploadVideo(videoData:File,quillObj: any) {
    // Define the Cloudinary API URL for image uploads
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dy9d8uotq/video/upload';;
  
    
  
    // Make a POST request to the Cloudinary API to upload the image
    return api.post(cloudinaryUrl,videoData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response)
    .then(data => {
      // Return the secure URL of the uploaded image
      const range = quillObj.getEditorSelection(); 
      quillObj.getEditor().insertEmbed(range.index, 'video', data.data.secure_url)
      return data.data.secure_url;

      

      
    })
    .catch(error => {
      console.error(error);
    });
  }


  async function imageHandler() { 
    
   
    
    const input = document.createElement('input');  
  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'image/*');  
    input.click();  
  
    input.onchange = async () => {  

       //@ts-ignore
    var currentPosition = this.quill.getSelection().index;

    //@ts-ignore
    this.quill.insertText(currentPosition, 'Uploading....', 'bold', true);
      //@ts-ignore
      var file: any = input.files[0];  
      var formData = new FormData();  
  
      formData.append('image', file);  
     
  
      var fileName = file.name;  
      //@ts-ignore
      const res = await uploadFiles(file, quillRef.current); 
      //@ts-ignore
      if (res) { 
        //@ts-ignore
        const currentPosition = this.quill.getSelection().index;
      //@ts-ignore  
      this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);
      }
      
      console.log("upload image response",res)
    };  
  }  


  async function videoHandler() { 
    
   
    
    const input = document.createElement('input');  
  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'video/*');  
    input.click();  
  
    input.onchange = async () => {  

       //@ts-ignore
    var currentPosition = this.quill.getSelection().index;

    //@ts-ignore
    this.quill.insertText(currentPosition, 'Uploading....', 'bold', true);
      //@ts-ignore
      var file: any = input.files[0];  
      var formData = new FormData();  
  
      formData.append('file', file);  
      formData.append('upload_preset', "asteve_test");
  
      var fileName = file.name;  
      //@ts-ignore
      const res = await uploadVideo(formData,quillRef.current); 
      console.log("video-upload-respoonse",res)
      //@ts-ignore
      if (res) { 
        //@ts-ignore
        const currentPosition = this.quill.getSelection().index;
      //@ts-ignore  
      this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);
      }
      else {
        //alert("an error occured")
        //@ts-ignore 
        this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);

      }
      
      console.log("upload image response", res)
      alert("vids")
    };  
  }  

 
  const modules = useMemo(()=>({
    toolbar: {
      container: "#toolbar",
      handlers: {
        custombold: custombold,
        image: imageHandler,
        customItalic: customItalic,
        customUnderline: customUnderline,
        video:videoHandler
      }
    }
  }),[]);

  const formats = [
    
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "video",
    "header"
   
  ];

  return <div className="text-editor" >
    
    
    
    <CustomToolBar></CustomToolBar>
    <ReactQuill
      value={props.value}
      theme="snow"
     formats={formats}
    modules={modules}
      onChange={props.onChange}
      placeholder="Content goes here..."
      forwardedRef={quillRef}
    />
  </div>
  
}

