

import React,{ useMemo, useRef,useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import {BiBold} from "react-icons/bi"
import 'react-quill/dist/quill.snow.css';
import { BiItalic } from "react-icons/bi"
import {AiOutlineUnderline} from "react-icons/ai"
//types
import { uploadImageHandlerType } from "../../../hooks/useBlogFormLogic"
import { Box,Text,Modal, ChakraProps} from '@chakra-ui/react';
import { api } from '@/axios';
import { BooleanLiteral } from 'typescript';
//utils
import { validDateFileSize } from '@/utils/textEditor';


const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }:any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);



const styles = {
  editorWrapperStyles: {
    position:"relative",
    

  },
  editorInnerWrapper: {
    h:"300px",
    minHeight:"100%",
  overflowY:"auto",
   marginTop:"0px"
    
  },
  editorContainerStyle: {
    minHeight:"100%",
    h: ""
  },
  editorStyle: {
    height: "100%",
    paddingTop:"5rem"
    
    
  }
}






 
type TextEditor = {
    value: string,
    onChange: (value: string) => void,
    uploadImageHandler: (imageToUpload: File) => Promise<any>,
    uploading:any
}



const CustomBoldBtn = () => <BiBold size="25"></BiBold>
const CustomUnderLinebtn  = ()=> <AiOutlineUnderline size="25"></AiOutlineUnderline>

const CustomItalicBtn = ()=> <BiItalic size="25"/>


const CustomToolBar = () => {

 
 
  

  return <div id="toolbar">
    
    <select className='ql-size'/>
   
    <button className='ql-image' />
    <button className='ql-video' /> 

    {/* <button className='ql-outline' />  */}
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
    <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
      <option value=""></option>
      
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




function custombold(this:any) {
  
  const format = this.quill.getFormat();
  
  const selectionRange = this.quill.getSelection();
   const isBold = format['bold'];

  this.quill.formatText(selectionRange?.index, selectionRange.length,{'bold': !isBold}); 

  
}


function customItalic(this:any) {

  
  const format = this.quill.getFormat();
  
   const isItalic = format["italic"]  // check for default or custom italic format
  
  const selectionRange = this.quill.getSelection();
  
  isItalic === true ? this.quill.formatText(selectionRange?.index, selectionRange.length, 'italic', false) :this.quill.formatText(selectionRange?.index, selectionRange.length, 'italic', true)
  
  
} 


function customUnderline(this:any) {

   
   const format = this.quill.getFormat();
  
   const isUnderline = format["underline"]  
  
  const selectionRange = this.quill.getSelection();
  
  isUnderline === true ? this.quill.formatText(selectionRange.index, selectionRange.length, "underline", false) :this.quill.formatText(selectionRange.index, selectionRange.length, "underline", true)

  
}





export const TextEditor = (props: TextEditor) => {

  const [uploading, setUploading] = useState<boolean>()
  const [uploadVid, setUploadingVideo] = useState<boolean>()

   const quillRef = useRef();

  
  
  async function uploadFiles(uploadFileObj: File, quillObj: any, type: string) {
    let uplaodResponse:boolean;
    const ifFileSizeIsNotAllowed = !validDateFileSize(uploadFileObj);
           
  
    console.log("uploadFileObj",uploadFileObj)
    try {
      if (ifFileSizeIsNotAllowed) throw new Error("file size too large");
    
                
      const upload_response =  await props.uploadImageHandler(uploadFileObj)
      const { data } = upload_response;
      const ImagePath = data.url 
      const image_url = `${ImagePath}`
      const range = quillObj?.getEditorSelection();  
      props.uploading.current = "SUCCESS"
      quillObj?.getEditor()?.insertEmbed(range?.index, 'image', image_url) 
      console.log("upload_response",upload_response)
     
     //onSuccess(image_url)
     return  uplaodResponse = true;

    } catch (error) {
      //@ts-ignore
      error!.message === "file size too large" ? alert("fileSize  is too large") :
        alert("error uploading image, try again")
        props.uploading.current = "SUCCESS"
        
        setUploading(false)
      
      //@ts-ignore
      console.log("errorMessage12",error.message)
      // setUploading(false)
      //onError("")
      
  }
    
    
    
    
  } 


  function uploadVideo(videoData: File, quillObj: any) {
    

  
    // Define the Cloudinary API URL for image uploads
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dy9d8uotq/video/upload';;
  
   props.uploading.current =  "UPLOADING"
  
    // Make a POST request to the Cloudinary API to upload the image
    return api.post(cloudinaryUrl,videoData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response)
    .then(data => {
      // Return the secure URL of the uploaded image
      const range = quillObj?.getEditorSelection(); 
      quillObj.getEditor().insertEmbed(range?.index, 'video', data.data.secure_url)
      props.uploading.current = "SUCCESS"
      return data.data.secure_url;

    

      
    })
    .catch(error => {
      console.error("video upload error",error);
    });
  }


  async function imageHandler(this:any) { 
    
    setUploading(true)
    props.uploading.current = "UPLOADING"
    
    const input = document.createElement('input');  
  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'image/*,.gif');  
    input.click();  
  
    input.onchange = async () => {  

       
    var currentPosition = this.quill?.getSelection()?.index;

    
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
        
        const currentPosition = this.quill.getSelection()?.index;
        props.uploading.current = "SUCCESS";
        
         this.quill?.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);
        setUploading(false)
      
     
       
      }
      else {
         
        const currentPosition = this.quill.getSelection()?.index;
        props.uploading.current = "SUCCESS"
         
         this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length)
        setUploading(false)
      
        
      }
      
      console.log("upload image response",res)
    };  
  }  


  async function videoHandler(this:any) { 
    
    
    setUploadingVideo(true)
   
    
    const input = document.createElement('input');  
  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'video/*');  
    input.click();  
  
    input.onchange = async () => {  

       //@ts-ignore
    var currentPosition = quillRef.current?.getEditorSelection()?.index;

    
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
        setUploadingVideo(false)
        //@ts-ignore
        const currentPosition = quillRef.current.getEditorSelection()?.index;
     
    this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);
       
      }
      else {
  
  const currentPosition = this.quill.getSelection()?.index;
  
    this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length)
     setUploadingVideo(false)

   
       
        alert("error uploading video, try again")
        
        //alert("an error occured")
        
       
      }
      setUploadingVideo(false)
      console.log("upload image response", res)
    

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
    "image",
    "video",
    "header",
   
    
    
   
  ];

  return <Box  {...styles.editorWrapperStyles as ChakraProps}>
  <Box id="editorcontainer"  {...styles.editorInnerWrapper as ChakraProps}   >
      <Box   {...styles.editorInnerWrapper as ChakraProps}  >
        
            
     <CustomToolBar></CustomToolBar>
     <ReactQuill
       value={props.value}
       theme="snow"
      formats={formats}
     modules={modules}
          onChange={props.onChange}
          readOnly={uploadVid  === true  || uploading === true  ? true :false}
       placeholder="Content goes here..."
          forwardedRef={quillRef}
          style={{ ...styles.editorStyle }}
          
    />
     </Box>
  </Box>
</Box>
  
  
}

