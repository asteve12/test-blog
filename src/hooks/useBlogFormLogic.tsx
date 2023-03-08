import { api } from "@/axios"
import { useFormik,} from "formik"
import React, { useRef, useCallback, useState, useLayoutEffect ,useEffect} from "react"
import { useRouter } from "next/router"
import { injectErrorMessage, validateForm } from "@/utils/formHelperMethod"
import slug from "slug"
import { SlowBuffer } from "node:buffer"
import { parseContent } from "@/util/parser"
import { debounce } from "lodash"
import { useLeavePageConfirm}  from "../hooks/useLeave"





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
    const [currentId, setCurrentId] = useState<number>()
    const [preview, setPreview] = useState(false)
    const [parsedBlogContentValue, setparsedBlogContentValue] = useState("");
    const [saveAsDraft, setSaveAsDraft] = useState(false)
    const [draftArticleId, setDraftArticleId] = useState<number | null>()
    let [saveDraftCallCount, setSaveDraftCallCount] = useState(0)
    const [endDraft, setEndDraft] = useState<null | boolean>(null)
    const [isDraftRenderSuccess, setIsDraftRenderSucces] = useState(false)
    const [deleteDraftStatus, setDeleteDraftStatus] = useState(false)
    const [convertEditToDraft, setConvertEditToDraft] = useState(true)
    const [isEditRenderSucess, setEditRenderSucess] = useState(false)
    const publish = useRef(false)
    const stopFurtherDraftSave = useRef(false)
    const Router = useRouter()
    const { id, edit, draft } = Router.query
     useLeavePageConfirm(Boolean(edit) === true && convertEditToDraft  === true)
  
    
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
        validate: (values) => validateForm<{[key: string]: string }>(values[`${currentLanguage}`], currentLanguage, languageOPtions),
        onSubmit
       
    },
   
    )


    //get  draft article and populate  form fields
    useLayoutEffect(() => {
        const {  id, draft } = Router.query
        if (draft) {

            api.get(`/api/drafts?filters[id][$eq]=${id}&populate=*&locale=${languageObject[currentLanguage]}`)
                .then((response) => {

                      console.log("response",)
                    if (response.status === 200) {
                        const blogData = response?.data?.data[0]?.attributes
                        setDraftArticleId(response?.data.data[0].id)
                        
                        console.log("ided", response?.data.data[0].id)
                      
                        const { content, image, title } = blogData
                        // alert("draft")
                      
                        const currentField = formikObject.values[currentLanguage]
                        console.log("draft error  344", currentField,{blogContent:content, image, title})
                            formikObject.setFieldValue(currentLanguage, {blogContent:content, image, title})   
                            setIsDraftRenderSucces(true)
                    }
                    
                    
                     
                }).catch((errorObject) => {
                
                    console.log("draft error",errorObject)
            })
            
        }

        

    }, [])
    




    //handle deleting edit article converting to draft from the article collection
    useEffect(() => {
        Router.events.on('routeChangeStart',unLoadHandler)
        //window.addEventListener('beforeunload',unLoadHandler)  
        return () => {

            Router.events.off('routeChangeStart',unLoadHandler)
}
    }, [])


    //event handler handle for unLoad
    function unLoadHandler(event: BeforeUnloadEvent) {
       
        if (edit && convertEditToDraft === true && !publish.current) {
            stopFurtherDraftSave.current = true
            alert("saving article as draft")
            deleteArticle(id!.toString())    
        }
        
       
        
    }


  //get and populate article field to edit 
    useEffect(() => {
        const { edit, id, slug} = Router.query
        console.log("slug",Router.query)
        if (edit) {
            if(slug) setSlug(slug as string)
          
           
            api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=${languageObject[currentLanguage]}`)
                .then((response) => { 
                    console.log("response",response?.data.data,`/api/articles/${id}/?locale=${languageObject[currentLanguage]}`)
                    if (response?.data.data.length === 0) return setIsDataAvailable(false);
                  
                    const blogData = response?.data?.data[0]?.attributes
                    setCurrentId(response?.data.data[0].id)
                  
                        const { content, image, title } = blogData
                        const currentField = formikObject.values[currentLanguage]
                        formikObject.setFieldValue(currentLanguage, {...currentField,blogContent:content, image, title})   
                    
                   
                        setEditRenderSucess(true)
                })
                .catch((e) => {
                    console.log("fetched error",e)
                    alert("error fetching blog content")
                })
            
            
        }

     
    }, [currentLanguage])


    

    useEffect(() => {
        const currentFormField = formikObject["values"][currentLanguage]
        const isBlogCotentFilledAvaible = currentFormField["blogContent"] 
        
   
        if (isBlogCotentFilledAvaible) {
            setparsedBlogContentValue(currentFormField["blogContent"])
        }
     


    }, [formikObject["values"][currentLanguage]])
    

    

    //update formik field
    const updateFormikFields = (e: any) => {
       
        


        console.log("hello",e)
        const fieldName = e.target.name;
        const enteredValue = e.target.value

        
        
        
        console.log("before", formikObject.values[currentLanguage])
        const currentValues = formikObject.values[currentLanguage]
        const fieldValue = {...formikObject.values[currentLanguage],[fieldName]:enteredValue}
        console.log("hello", fieldValue, currentLanguage)
        formikObject.setFieldValue(currentLanguage, fieldValue)
     
        if (fieldName === "image" || "title") {
            if (saveDraftCallCount === 1 && !draftArticleId) return;


            //alert("update")
          
            saveAsDraftHandler("", currentValues)()
            
            setSaveDraftCallCount((prev)=> prev +1)
            
            
        }
      
        
        

    }

 
    
    //handle saving article as draft
    const saveAsDraftHandler = (value:any, currentValues:any)=>debounce(async () => {
        const { id, draft, edit } = Router.query
    
       
        if (endDraft === true) return
        if (edit && !currentId) return;
        if (draft && !draftArticleId) return;
        if (stopFurtherDraftSave.current === true) return;
        //alert("debouncing ")
        setSaveAsDraft(true)

        console.log("dogo123",currentValues,!currentValues?.title)
        

        const data_for_upload = JSON.stringify( {data:{
            title: currentValues?.title || "Untitled",
            description: currentValues?.title ,
            content: currentValues?.blogContent , 
            image: currentValues?.image ,
            slug:slug(articleslug) ,
            authorImage: props?.profilePics ,
            author: props?.name ,
            publishedAt:new Date().toISOString() ,
            locale: languageObject[currentLanguage] ,
           
        }}
    )
    
        let response: any; 
        console.log("response123", data_for_upload)
        
        
        if (draftArticleId) {
             response = await api.put(`/api/drafts/${draftArticleId}`, data_for_upload)
            setSaveAsDraft(false)

            return;
        }

        else{
           response = await api.post(`/api/drafts`, data_for_upload)
           
        }

    if (response.status === 200) {
        const id = response?.data?.data?.id
    
       console.log("ided",id)
        setSaveAsDraft(false)
        setDraftArticleId(id)
       
    

        return
        
    }
    },1000)

   

    //update blog content
    async function updateBlogContent(value: string) {
        const {  id, draft } = Router.query
       const currentValues = formikObject.values[currentLanguage]
           const fieldObject = {
            target: {
                name: "blogContent",
                value:value
            }

           }
        if (convertEditToDraft === false) return;
        if (draft && !isDraftRenderSuccess) return;
        if (edit && !isEditRenderSucess) return;
        

        // alert("update blog content")
        console.log("proceeding",formikObject.values)

        updateFormikFields(fieldObject)
        
         //@ts-ignore
         //updateBlogContent.calls = updateBlogContent.calls + 1;
        if (saveDraftCallCount === 1 && !draftArticleId) return;


        //alert("update")
      
        saveAsDraftHandler(value, currentValues)()
        
        setSaveDraftCallCount((prev)=> prev +1)
       

       
 
       
        
    }; 



    const deleteDraft = async (draftId:string,onPageCall?:boolean) => {
        try {

            const response = await api.delete(`/api/drafts/${draftId}`)
            if (onPageCall) {
                setDeleteDraftStatus(true)
                
            }
            if (response.status === 200) { 
       

                if (onPageCall) {
                    alert("draft successfully deleted")
                  
                    setDeleteDraftStatus(false)
                    Router.push("/admin")
                    
                }
               
               
                return true
                
            }  
            

        }
        catch (e) {
            console.log("draft delete error", e)
            alert("error occurred while deleting draft")
            
        }
        
    }

    
   

    //handle formSubmit
    async function onSubmit(values: formTypes, actions: any) {
        setIsAddingBlog(true)
        setConvertEditToDraft(false)
        publish.current = true
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
            
            const { edit, id,draft } = Router.query
            const current_language_formik_field = formikObject["values"][currentLanguage]
          
            
            let isLanguageVersionFieldValuesPresent;

                Object.entries(current_language_formik_field).forEach((eachField) => {
                    if(eachField[1])  isLanguageVersionFieldValuesPresent = true
                
            })

          
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
                    setDraftArticleId(null)
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

                if (draft && id) {
                    // saveAsDraftHandler.cancel();
                    setEndDraft(true)
                    deleteDraft(id.toString())
                };
                response = await api.post("/api/articles", data_for_upload)
                setDraftArticleId(null);
                setSaveDraftCallCount(0)
                // saveAsDraftHandler.flush()
            }
           
            if (response?.status === 200) {
                setIsAddingBlog(false)
                if (!draft ) {
                     deleteDraft(draftArticleId!.toString())
                }
               
                alert("blog added successfully")
             
                
                //Router.push("/admin")
                
                Router.push("/admin")
            
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



    //delete unwanted article
    async function deleteArticle(articleId:string) {

        try {
            const deleteRes = await api.delete(`/api/articles/${articleId}`)
            if(deleteRes.status === 200 ) return true    
        }
        catch (e) {
            alert("error coccured when deleting article")
            console.log("deleteEror",e)
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
        isAddingBlog,
        preview,
        setPreview,
        parsedBlogContentValue,
        uploadImageToStrapiBackedn,
        saveAsDraft,
        draftArticleId,
        deleteDraftStatus,
        deleteDraft
    
    }


    
}