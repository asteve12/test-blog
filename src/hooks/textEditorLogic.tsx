import { api } from '@/axios';
import React, { useMemo, useRef, useState } from 'react';
import {curry,pipe} from 'ramda'




type TextEditor = {
    value: string,
    onChange: (value: string) => void,
    uploadImageHandler: (imageToUpload: File) => Promise<any>,
    quillObj:any
} 


type UploadAnyFiles = {
    type: string,
    url: string,
    formData:File
}





export const useTextEditorLogic = (props: TextEditor) => {
    const [uploading, setUploading] = useState<boolean>()
    const [uploadVid, setUploadingVideo] = useState<boolean>()
    const { quillObj } = props
    
    const CustomBoldBtn = createCustomButton("bold")
    const CustomItalicBtn = createCustomButton("italic")
    const CustomUnderLineBtn = createCustomButton("underline")

    const selectImageToUpload = curry(selectFileToUpload)
    const uploadSelectedImage = curry((imageFileToUpload) => Promise.resolve(UploadAnyFiles(imageFileToUpload)))
    const injectUploadedImageToEditor =curry(InjectFileIntoEditor)
    const selectVideoToUpload = curry(selectFileToUpload)
    const uploadSelectedVideo = curry((videoFileToUpload) => Promise.resolve(UploadAnyFiles(videoFileToUpload)))
    const injectUploadedVideoToEditor = curry(InjectFileIntoEditor)


    const AddImageToTextEditor = pipe(selectImageToUpload, uploadSelectedImage, injectUploadedImageToEditor)
    const AddVideoToTextEditor = pipe(selectVideoToUpload, uploadSelectedVideo, injectUploadedVideoToEditor)    

    const modules = useMemo(() => ({
        toolbar: {
            container: "#toolbar",
            handlers: {
                custombold: CustomBoldBtn,
                image: AddImageToTextEditor,
                customItalic: CustomItalicBtn,
                customUnderline: CustomUnderLineBtn,
                video: AddVideoToTextEditor
            }
        }
    }), []);
    
    
    // handle creation of custom toolbar button 
    function createCustomButton(cusomType: string) {
        return function (this:any) {
           
          
            if (this.quill) {
                const format = this.quill?.getFormat();
               
                const selectionRange = this.quill?.getSelection();
                
                format[`${cusomType}`] === true ? this.quill.formatText(selectionRange.index, selectionRange.length, `${cusomType}`, false) :this.quill.formatText(selectionRange.index, selectionRange.length, `${cusomType}`, true)
               
           }
           
        }
        
    }

   
    function UploadAnyFiles(UploadAnyFiles: UploadAnyFiles) {
        let response = api.post(UploadAnyFiles.url, UploadAnyFiles.formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => response.data)
            .catch((e) => {
                alert(`error occuured while ${UploadAnyFiles.type}`)
                console.log("file upload error",)
            })
        



        return response
    
    }

    function InjectFileIntoEditor(this: any, arg: any) {
        const range = quillObj?.getEditorSelection();
        quillObj.getEditor().insertEmbed(range.index, arg.type, arg.url)
       
        
        
    }

    function selectFileToUpload(this: any, type: string): any {
        setUploadingVideo(true)
        const uploadUploadurl = type === "video" ?
            'https://api.cloudinary.com/v1_1/dy9d8uotq/video/upload' :
            "https://api.cloudinary.com/v1_1/dy9d8uotq/image/upload"
            
         
       
       
        
        const input = document.createElement('input');
      
        input.setAttribute('type', 'file');
        input.setAttribute('accept', type === "video" ? 'video/*' : 'image/*,.gif');
        input.click();
      
        input.onchange = async () => {
    
           
            var currentPosition = quillObj.current.getEditorSelection().index;
    
        
            this.quill.insertText(currentPosition, 'Uploading....', 'bold', true);
            //@ts-ignore
            var file: any = input!.files[0];
            var formData = new FormData();
      
            formData.append('file', file);
            formData.append('upload_preset', "asteve_test");

            return {
                type: type,
                url: uploadUploadurl,
                formData: formData
            }
            
            


      
        }
        


       

    }


    return {
        modules,
        uploading
    }

}

    // async function UploadFile(endpoint:string) {
    //     return   () => a
    // }


//     function custombold(this:any) {
        
      
// }
      
// function customItalic(this:any) {
//        const format = this.quill.getFormat();
//         const isItalic = format["italic"]  
//         const selectionRange = this.quill.getSelection();
//         isItalic === true ? this.quill.formatText(selectionRange.index, selectionRange.length, 'italic', false) :this.quill.formatText(selectionRange.index, selectionRange.length, 'italic', true)
// } 
      
// function customUnderline(this:any) {
      
//         const format = this.quill.getFormat();
//         const isUnderline = format["underline"]  
//         const selectionRange = this.quill.getSelection();
//        isUnderline === true ? this.quill.formatText(selectionRange.index, selectionRange.length, "underline", false) :this.quill.formatText(selectionRange.index, selectionRange.length, "underline", true)
      
// }

    /*
    
      async function uploadFiles(uploadFileObj: File, quillObj: any, type: string) {
        let uplaodResponse:boolean;
        //const ifFileSizeIsNotAllowed = !validDateFileSize(uploadFileObj);
               
      
        console.log("uploadFileObj",uploadFileObj)
        try {
          //if (ifFileSizeIsNotAllowed) throw new Error("file size too large");
          
                    
          const upload_response =  await props!.uploadImageHandler(uploadFileObj)
          const { data } = upload_response;
          const ImagePath = data.url 
          const image_url = `${ImagePath}`
          const range = quillObj.getEditorSelection();  
    
          quillObj.getEditor().insertEmbed(range.index, 'image', image_url) 
          console.log("upload_response",upload_response)
         
         //onSuccess(image_url)
         return  uplaodResponse = true;
    
        } catch (error) {
          //@ts-ignore
          error!.message === "file size too large" ? alert("fileSize  is too large") :
            alert("error occuured, try again")
            
            setUploading(false)
          
          //@ts-ignore
          console.log("errorMessage12",error.message)
          // setUploading(false)
          //onError("")
          
      }
        
        
        
        
    } 

    */

    /*
    
    function uploadVideo(videoData: File, quillObj: any) {
        
    
      
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
          console.error("video upload error",error);
        });
      }
    */

    /*
    async function imageHandler() { 
        
        setUploading(true)
        
        const input = document.createElement('input');  
      
        input.setAttribute('type', 'file');  
        input.setAttribute('accept', 'image/*,.gif');  
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
            setUploading(false)
         
           
          }
          else {
              //@ts-ignore
            const currentPosition = this.quill.getSelection()?.index;
             //@ts-ignore  
             this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length)
            setUploading(false)
            
          }
          
          console.log("upload image response",res)
        };  
      }  
    */



    /*
    async function videoHandler() { 
        
        
        setUploadingVideo(true)
       
        
        const input = document.createElement('input');  
      
        input.setAttribute('type', 'file');  
        input.setAttribute('accept', 'video/*');  
        input.click();  
      
        input.onchange = async () => {  
    
           //@ts-ignore
        var currentPosition = quillRef.current.getEditorSelection().index;
    
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
            setUploadingVideo(false)
            //@ts-ignore
            const currentPosition = quillRef.current.getEditorSelection()?.index;
          //@ts-ignore  
            this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length);
           
          }
          else {
      //@ts-ignore
      const currentPosition = this.quill.getSelection()?.index;
      //@ts-ignore  
        this.quill.deleteText(currentPosition - 'Uploading....'.length, 'Uploading....'.length)
         setUploadingVideo(false)
    
       
           
            alert("error uploading video, try again")
            
            //alert("an error occured")
            
           
          }
          setUploadingVideo(false)
          console.log("upload image response", res)
        
    
        };  
    }
    
    */