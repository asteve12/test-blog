import { api } from "@/axios"
import { useFormik,} from "formik"
import React, { useRef, useCallback, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { injectErrorMessage, validateForm } from "@/utils/formHelperMethod"
import slug from "slug"
import { SlowBuffer } from "node:buffer"





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


type IimageId = {
    [key:string]:string
}



export const useBlogFormLogic = (props: IuseBlogFormLogic) => {
    const languageOPtions = ['ENGLISH', 'FRENCH'];
    const [articleslug, setSlug] = useState<string>("");
    const [currentLanguage,setCurrentLanguage] = useState(languageOPtions[0])
    const [isImageUploading, setIsUploading] = useState(false);
    const [isAddingBlog,setIsAddingBlog]  = useState(false)
    const [imageId, setImageId] = useState<IimageId>({[currentLanguage]:""})
    const formContainer = useRef<HTMLFormElement>(null)
    const ref = useRef<null | HTMLInputElement>(null)
    const [isDataAvailable,setIsDataAvailable] = useState<boolean>()
    const [unfilledLanguageVersion, setUnfilledLangVersion] = useState<string[]>()
    const [currentId,setCurrentId] = useState<number>()
    const Router = useRouter()
    
    const languageObject:{[key:string]:string} = {
        ENGLISH: "en",
        FRENCH:"fr-BJ"
    }
 
   


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
        const { edit, id, slug } = Router.query
        console.log("slug",Router.query)
        if (edit) {
            if(slug) setSlug(slug as string)
           
            //api.get(`/api/articles/${id}?locale=${languageObject[currentLanguage]}`)
            api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=${languageObject[currentLanguage]}`)
                .then((response) => { 
                    console.log("response",response?.data.data,`/api/articles/${id}/?locale=${languageObject[currentLanguage]}`)
                    if (response?.data.data.length === 0) return setIsDataAvailable(false);
                  
                    const blogData = response?.data?.data[0]?.attributes
                    setCurrentId(response?.data.data[0].id)
                    console.log("blogData",blogData)
                    const currentLanguageArtcicleVersion = response?.data?.data?.filter((eachArticle:any)=>  eachArticle?.locale === languageObject[currentLanguage] )
                        const { content, image, title } = blogData
                        const currentField = formikObject.values[currentLanguage]
                        formikObject.setFieldValue(currentLanguage, {...currentField,blogContent:content, image, title})   
                    
                   
                    
                })
                .catch((e) => {
                    console.log("fetched error",e)
                    alert("error fetching blog content")
                })
            
            
        }
        
    }, [currentLanguage])
    

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
        setIsAddingBlog(true)
        const currentValues = values[currentLanguage]
        
        try {
            const data_for_upload = JSON.stringify({
                data: {
                    title: currentValues?.title,
                    description: currentValues?.title,
                    content: currentValues?.blogContent,
                    image: currentValues?.image,
                    slug: slug(currentValues?.title),
                    authorImage: props?.profilePics,
                    author: props?.name,
                    locale:languageObject[currentLanguage]
                   
                }
            })
            
            const { edit, id } = Router.query
            const current_language_formik_field = formikObject["values"][currentLanguage]
            console.log("upload-response", current_language_formik_field)
            
            let isLanguageVersionFieldValuesPresent;

                Object.entries(current_language_formik_field).forEach((eachField) => {
                    if(eachField[1])  isLanguageVersionFieldValuesPresent = true
                
            })

           console.log("isLanguageVersionFieldValuesPresent",Object.entries(current_language_formik_field))
           console.log("values123",formikObject["values"])
            
            let response 

            if (isDataAvailable  === false && edit) {
                
                const data_for_upload = JSON.stringify( {
                        title: currentValues?.title,
                        description: currentValues?.title,
                        content: currentValues?.blogContent,
                        image: currentValues?.image,
                        slug:articleslug,
                        authorImage: props?.profilePics,
                        author: props?.name,
                    locale: languageObject[currentLanguage],
                    publishedAt:new Date().toISOString(),
                       
                    }
                )
                
                response = await api.post(`/api/articles/${id}/localizations`,data_for_upload)
            console.log("response123",response)

                if (response.status === 200) {
                    setIsAddingBlog(false)
                    alert("blog added successfully")
                    Router.push("/admin")

                    return
                    
                }
            }
            
            if (edit) {
                const data_for_upload = JSON.stringify({
                    data: {
                        title: currentValues?.title,
                        description: currentValues?.title,
                        content: currentValues?.blogContent,
                        image: currentValues?.image,
                        slug,
                        authorImage: props?.profilePics,
                        author: props?.name,
                        locale:languageObject[currentLanguage]
                       
                    }
                })
                response =  await api.put(`/api/articles/${currentId}`, data_for_upload)
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
                setIsAddingBlog(false)
                alert("blog added successfully")
                
                //Router.push("/admin")
                
                Router.replace("/admin")
            
            }

            console.log("upload-response",response)
            
            
        } catch (e) {
            console.log("blog error",e)
            alert("error occurred while adding blog")
            setIsAddingBlog(false)
            
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
const deleteImage = async (uniqueImageId:string) => {
        const delete_image_response = await api.delete(`/api/upload/files/${uniqueImageId}`)
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
        setImageId((prev)=> ({...prev,[currentLanguage]:imageId}))
        if (ref.current) {
            ref.current.value = ""
        }
    }

    //handle uploaded image;
    const uploadSelectedImage = async (e: React.ChangeEvent) => {
      
        const selectedImage = e.target   as HTMLInputElement;
        const fileList = selectedImage?.files as FileList;
        setIsUploading(true)
        try {
            const uniqueImageId = imageId[currentLanguage];

            if (uniqueImageId) {
                await deleteImage(uniqueImageId)
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
        updateFormikFields,
        isAddingBlog
    }


    
}