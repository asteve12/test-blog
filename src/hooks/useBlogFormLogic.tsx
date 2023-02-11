import { api } from "@/axios"
import { useFormik,} from "formik"
import React, { useRef, useCallback, useState } from "react"
//axios





type formTypes= {
    title: string,
    image: string,
    blogContent:string
} 


type IuploadBackendFunc = {
    imageId: number,
    imagePath:string
    
}





export const useBlogFormLogic = () => {

    const [isUploading, setIsUploading] = useState(false) 
    const [imageId,setImageId] = useState<number>()

    const ref = useRef<HTMLInputElement>(null)

    const formikObject = useFormik({
        initialValues: {
            title: "",
            image: "",
            blogContent:""
        },
        validate:validateForm,
        onSubmit
       
    },
   
    )

    //update blog content
    const updateBlogContent = useCallback((value: string) => {
       formikObject.setFieldValue("blogContent",value)
      }, []); 
   //validate form input
    function validateForm(values:formTypes) {
        const errors:{[key:string]:string} = {}
        
        const arrayofFormFields = Object.entries(values)
        arrayofFormFields.forEach((eachFormField) => {
            const fieldName = eachFormField[0] ;
            const fieldValue = eachFormField[1] 
            const isFieldValueNotDefined = !fieldValue;
            if(isFieldValueNotDefined)  errors[fieldName] = "required"
        })
        


        return errors
        
        
        
    }

    //handle formSubmit
    function onSubmit(values: formTypes) {
        alert("form field successfully ")

        
    }

    //open file to upload
    const changeImageHandlerBtn= (e: React.MouseEvent) => {
         const currentInputELement = ref.current;
        currentInputELement?.click();

        
    } 

        //upload image to strapi backend
    const uploadImageToStrapiBackedn =  (fileToUpload: File):IuploadBackendFunc | void => {
           let imageId = null;;
           let imagePath = null;
           const formData = new FormData()
            formData.append("files", fileToUpload)
        
           api.post("/api/upload",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } ).then((response) => {
                console.log("sucessful", response)
                const { data } = response
                const imageData = data[0]
                imageId = parseInt(imageData?.id)
                imagePath = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${imageData?.url}`
              
              
                alert("successfull")
            }).catch((e) => {
                
                console.log("failure",e)
                alert("failure")
            }) 

        if(imageId && imagePath)return {imageId,imagePath}
            
    }
    

      //delete image 
      const deleteImage = (imageId: number):string | void => {
        let status = null;
        let error = null
        api.delete(`/api/upload/${imageId}`).then((response) => {
            status = "success"
            
        }).catch((e) => {
            error = "failure"
             
        })

        if (status) return status;
        if (error) return error
        return;
        
    } 

    //handle uploaded image;
    const uploadSelectedImage = async (e: React.ChangeEvent) => {
        
        let selectedImage = e.target   as HTMLInputElement;
        const fileList = selectedImage?.files as FileList;
    if (imageId) {
            const response = deleteImage(imageId);
            if (response === "success") {
                const imageObj = uploadImageToStrapiBackedn(fileList[0]);
                console.log("imageObj",imageObj)
                if (imageObj?.imageId && imageObj?.imagePath) {
                    
                    setImageId(imageObj?.imageId);
                    formikObject.setFieldValue("image",imageObj?.imagePath)
                }
            }
            
        }

        else {
        const imageObj = uploadImageToStrapiBackedn(fileList[0]);
        console.log("imageObj",imageObj)
                if (imageObj?.imageId && imageObj?.imagePath) {
                    setImageId(imageObj?.imageId);
                    formikObject.setFieldValue("image",imageObj?.imagePath)
                }
            
        }
       


    }

 



   

    



    return {
        formikObject,
        ref,
        changeImageHandlerBtn,
        uploadSelectedImage,
        updateBlogContent
    }


    
}