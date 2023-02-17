import { api } from "@/axios"
import { useFormik,} from "formik"
import React, { useRef, useCallback, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { injectErrorMessage, validateForm } from "@/utils/formHelperMethod"





//types
export type uploadImageHandlerType =  {
    (image: File, 
    onSuccess: (url: string) => void, 
    onError: (errorMessage: string) => void) : void
 }


type language = {
   [key:string]:string
     
 }


type formTypes = {
    [key:string]: language,
    
    
} 


type IuploadBackendFunc = {
    imageId: number,
    imagePath:string
    
}


type IuseBlogFormLogic = {
    profilePics: string,
    name:string
}




export const useBlogFormLogic = (props:IuseBlogFormLogic) => {

    const [isImageUploading, setIsUploading] = useState(false);
    const [isAddingBlog,setIsAddingBlog]  = useState(false)
    const [imageId, setImageId] = useState<any>()
    const [filledField,setfilledField] = useState<string | any>([])
    const formContainer = useRef<HTMLFormElement>(null)
    const ref = useRef<null | HTMLInputElement>(null)
    const Router = useRouter()
    const languageOPtions = [
        'ENGLISH','FRENCH'
      ];
    const [currentLanguage,setCurrentLanguage] = useState(languageOPtions[0])
    // const  = []

    const formikObject = useFormik<formTypes>({
        initialValues: {
            ENGLISH: {
                title: "",
                image: "",
                 blogContent:""
            },
            FRENCH: {
                title: "",
                image: "",
                 blogContent:""
                
            }
            
        },
        validate: (values) => validateForm<{ [key: string]: string }>(values[`${currentLanguage}`], currentLanguage, languageOPtions),
        onSubmit
       
    },
   
    )

    useEffect(() => {
        const { edit, id } = Router.query
        if (edit) {
            api.get(`/api/articles/${id}`)
                .then((response) => { 
                    alert("fethced blog content successfull")
                  
                    const blogData = response?.data?.data?.attributes
                    console.log("fetched blog content", blogData)
                    
                    const { content, image, title } = blogData
                    const currentField = formikObject.values[currentLanguage]
                    formikObject.setFieldValue(currentLanguage, {...currentField,blogContent:content, image, title})
                   
                    
                })
                .catch((e) => {
                    console.log("fetched error",e)
                    alert("error fetching blog content")
                })
            
            
        }
        
    }, [])
    

    //update formik field
    const updateFormikFields = (e: any) => {
        console.log("hello",e)
        const fieldName = e.target.name;
        const enteredValue = e.target.value
        console.log("before",formikObject.values[currentLanguage])
        const fieldValue = {...formikObject.values[currentLanguage],[fieldName]:enteredValue}
        console.log("hello",fieldValue,currentLanguage)
        formikObject.setFieldValue(currentLanguage, fieldValue)
      
        
        

    }

   

    //update blog content
    const updateBlogContent = (value: string) => {
        const fieldObject = {
            target: {
                name: "blogContent",
                value:value
            }

        }

        updateFormikFields(fieldObject)
       
        console.log("formed",formikObject.values)
    }; 

    
   

    //handle formSubmit
    async function onSubmit(values: formTypes, actions: any) {
        setfilledField((prev: string[]) => [...prev, filledField])
        if (filledField.length < languageOPtions.length) {
            const unfilledLanguageVersion = languageOPtions.filter((eachLang) => eachLang !== currentLanguage)[0]
            //alert(`fill in ${unfilledLanguageVersion} version of these content`)
            //return;
        }
        alert("form field successfully ")
        const currentValues = values[currentLanguage]
        
        try {
            const data_for_upload = JSON.stringify({
                data: {
                    title: currentValues?.title,
                    description: currentValues?.title,
                    content: currentValues?.blogContent,
                    image: currentValues?.image,
                    slug: currentValues?.title,
                    authorImage: props?.profilePics,
                    author:props?.name
                   
                }
            })
            console.log("upload-response", data_for_upload)
            const { edit, id } = Router.query
            
            let response 
            if (edit) {
                response =  await api.put(`/api/articles/${id}`, data_for_upload)
            }
            else {
                const contentVersionsFilled  =  []
                const arrayOfFormKeys = Object.keys(formikObject.values);
                arrayOfFormKeys.forEach(eachKeys => {
                    const formKeyValuePair = Object.entries(formikObject.values[eachKeys]);

                })


                response =  await api.post("/api/articles", data_for_upload)
            }
           
            if (response?.status === 200) {
                alert("blog added successfully")
                
            
            }

            console.log("upload-response",response)
            
            
        } catch (e) {
            alert("error image upload")
            
        }

        actions?.resetForm();

        
    }

    //open file to upload
    const changeImageHandlerBtn= (e: React.MouseEvent) => {
         const currentInputELement = ref.current;
        currentInputELement?.click();

        
    } 

    //upload image to strapi backend
    const uploadImageToStrapiBackedn =  async (fileToUpload: File) => {
          const formData = new FormData()
            formData.append("files", fileToUpload)
           const image_upload_response = await api.post("/api/upload",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           })
        
         return image_upload_response;
    
            
    }
    

//delete image 
const deleteImage = async (imageId: number) => {
        const delete_image_response = await api.delete(`/api/upload/files/${imageId}`)
        return delete_image_response
} 

     //update image data
    const addImageData = (responseObject:any) => {
        const { data } = responseObject;
        const imageId = data[0]?.id;
        const ImagePath = data[0]?.url 
        const formObj = {
            target: {
                name: "image",
                value:`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${ImagePath}`
            }
        }
        updateFormikFields(formObj)
        setImageId((prev:string [])=> ({...prev,[currentLanguage]:imageId}))
        if (ref.current) {
            ref.current.value = ""
        }
    }

    //handle uploaded image;
    const uploadSelectedImage = async (e: React.ChangeEvent) => {
        alert("me for image upload")
        const selectedImage = e.target   as HTMLInputElement;
        const fileList = selectedImage?.files as FileList;
        setIsUploading(true)
        try {

            if (imageId) {
                await deleteImage(imageId as number)
                const upload_response = await uploadImageToStrapiBackedn(fileList[0]);
                setIsUploading(false)
                addImageData(upload_response)
            }
            else {
                const upload_response = await uploadImageToStrapiBackedn(fileList[0]);
                addImageData(upload_response)
                console.log("upload_response", upload_response)
                alert("upload successfull")
                setIsUploading(false)
                
            }
          }
        catch (errorMessage) {
            setIsUploading(false)
            console.log("upload_failure", errorMessage)
            alert("upload  fail")
            
        }



       
       
    


    }

 



        //upload text editor images
        const uploadTextEditorImages:uploadImageHandlerType = async (image:File, onSuccess, onError) => {
           try {
                
                const upload_response = await uploadImageToStrapiBackedn(image)
                const { data } = upload_response;
                const ImagePath = data[0]?.url 
                const image_url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${ImagePath}`
               onSuccess(image_url)
                

            } catch (errorMessage) {
                onError("")
                
            }
        
        }
   
 




    return {
        formikObject,
        ref,
        changeImageHandlerBtn,
        uploadSelectedImage,
        updateBlogContent,
        isImageUploading,
        uploadTextEditorImages,
        formContainer,
        currentLanguage,
        setCurrentLanguage,
        languageOPtions,
        updateFormikFields
    }


    
}