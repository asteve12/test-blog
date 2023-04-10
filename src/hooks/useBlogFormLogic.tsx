import { api } from "@/axios"
import { useFormik,} from "formik"
import React, { useRef, useCallback, useState, useLayoutEffect ,useEffect,useMemo} from "react"
import { useRouter } from "next/router"
import { generateSHA1, generateSignature, getPublicIdFromUrl, validateForm } from "@/utils/formHelperMethod"
import slug from "slug"
import { debounce } from "lodash"
import { useLeavePageConfirm } from "../hooks/useLeave"
import { useSpring } from "@react-spring/web";
import { validDateFileSize } from "@/utils/textEditor"
import axios from "axios"










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
    name: string,
    featuredArticleId:number
}


type IimageId = {
    [key:string]:string
}

type currentValue = {
    title: string,
    image:  string,
    blogContent: string,
    category:string,
    summary: string ,
    featured: string,
    thumbNail: string

}



export const useBlogFormLogic = (props: IuseBlogFormLogic) => {
    const languageOPtions = ['ENGLISH', 'FRENCH'];
    const [articleslug, setSlug] = useState<string>("");
    const [currentLanguage,setCurrentLanguage] = useState(languageOPtions[0])
    const [isImageUploading, setIsUploading] = useState(false);
    const [isUploadingThumbNail,setIsUploadingThumbNail] = useState(false)
    const [isAddingBlog,setIsAddingBlog]  = useState(false)
    //const [imageId, setImageId] = useState<IimageId>({[currentLanguage]:""})
    const imageId = useRef({ [currentLanguage]: "" });
    const thumbNailId = useRef({[currentLanguage]:""});
    const formContainer = useRef<HTMLFormElement>(null)
    const ref = useRef<null | HTMLInputElement>(null)
    const thumbNailRef = useRef<null | HTMLInputElement>(null)
    const [isDataAvailable,setIsDataAvailable] = useState<boolean>()
    const [unfilledLanguageVersion, setUnfilledLangVersion] = useState<string[]>()
    const [currentId, setCurrentId] = useState<number>()
    const [preview, setPreview] = useState(false)
    const [parsedBlogContentValue, setparsedBlogContentValue] = useState("");
    const [saveAsDraft, setSaveAsDraft] = useState(false)
    //const [draftArticleId, setDraftArticleId] = useState<number | null| undefined>()
    const draftArticleId = useRef<string | null>()
    //let [saveDraftCallCount, setSaveDraftCallCount] = useState(0)
    const saveDraftCallCount = useRef(0)
   
    
    const [endDraft, setEndDraft] = useState<null | boolean>(null)
    const [isDraftRenderSuccess, setIsDraftRenderSucces] = useState(false)
    const [deleteDraftStatus, setDeleteDraftStatus] = useState(false)
    const [convertEditToDraft, setConvertEditToDraft] = useState(true)
    const [isEditRenderSucess, setEditRenderSucess] = useState(false)
    const trackDraft =  useRef(false)
    //const [currentFieldValue, setCurrentField] = useState({})
    
    const currentFieldValue = useRef({
        title: "",
        image: "",
        blogContent: "",
        category: "",
        summary: "",
        featured: "",
        thumbNail:""
    })
    const [category, setAllCategory] = useState<any[]>([])
     const publish = useRef(false)
    const refDraftId = useRef<null>()
    const stopFurtherDraftSave = useRef(false)
    const Router = useRouter()
    const { id, edit, draft } = Router.query
    const draftData = useRef<currentValue | undefined >();
     useLeavePageConfirm(Boolean(edit) === true && convertEditToDraft  === true && draftArticleId.current as undefined)
    const madeUpdate = useRef(false)
   const uploading = useRef<"UPLOADING" | "SUCCESS" | "ERROR">()
    
    const languageObject:{[key:string]:string} = {
        ENGLISH: "en",
        FRENCH:"fr-BJ"
    }
    
   const [springs, springApi] = useSpring(() => ({
       opacity: 0,
       
      }))

      const [springsThumb, springThumbApi] = useSpring(() => ({
        opacity: 0,
        
       }))

    
   
     

    const formikObject = useFormik<formTypes>({
        initialValues: {
            ENGLISH: {
                title: "",
                image: "",
                blogContent: "",
                category: "",
                summary: "",
                featured: "",
                thumbNail:""
            },
            FRENCH: {
                title: "",
                image: "",
                blogContent: "",
                category: "",
                summary: "",
                featured: "",
                thumbNail:""
                
            }
            
        },
        validate: (values) => validateForm<{ [key: string]: string }>(values[`${currentLanguage}`],currentLanguage, languageOPtions),
        onSubmit
       
    },
   
    )

    //remove uploading text
    useEffect(() => {
        
    },[formikObject.values[currentLanguage]["blogContent"]])


    //listen for banner image upload 
    useEffect(() => {
        if (isImageUploading === false) {
            springApi.start({ opacity: 0 })
            return
            }
        springApi.start({opacity:8})

    },[isImageUploading])


    //get  draft article and populate  form fields
    useLayoutEffect(() => {
        const {  id, draft } = Router.query
        if (draft) {

            api.get(`/api/drafts?filters[id][$eq]=${id}&populate=*&locale=${languageObject[currentLanguage]}`)
                .then((response) => {

                      console.log("response",)
                    if (response.status === 200) {
                        const blogData = response?.data?.data[0]?.attributes
                        draftArticleId.current = response?.data.data[0].id
                        refDraftId.current = response?.data.data[0].id
                        console.log("blogData", blogData)
                        const { content, image, title,summary,category,featured} = blogData
                        // alert("draft")
                      
                        const currentField = formikObject.values[currentLanguage]
                        console.log("draft error  344", currentField,{blogContent:content, image, title})
                            formikObject.setFieldValue(currentLanguage, {blogContent:content, image, title,summary,category,featured})   
                            setIsDraftRenderSucces(true)
                    }
                    
                    
                     
                }).catch((errorObject) => {
                
                    console.log("draft error",errorObject)
            })
            
        }

        

    }, [])
    




    //handle deleting edit article converting to draft from the article collection
    useEffect(() => {
         Router.events.on('routeChangeStart', unLoadHandler)
      return () => {
            Router.events.off('routeChangeStart',unLoadHandler);
}
    }, [])


   


  //get and populate article field to edit 
  useLayoutEffect(() => {
        const { edit, id, slug} = Router.query
        console.log("slug12234", Router.query)
        
        if (edit  ) {
            if(slug) setSlug(slug as string)
          
            stopFurtherDraftSave.current = false;
            api.get(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=${languageObject[currentLanguage]}`)
                .then((response) => { 
                   
                    
                    console.log("responseneeded", response?.data.data, `/api/articles/${id}/?locale=${languageObject[currentLanguage]}`)
                    if (response?.data.data.length === 0) return setIsDataAvailable(false);
                  
                    const blogData = response?.data?.data[0]?.attributes
                    setCurrentId(response?.data.data[0].id)
                  
                    const { content, image, title, summary, category, featured } = blogData
                    
                        const currentField = formikObject.values[currentLanguage]
                        formikObject.setFieldValue(currentLanguage, {blogContent:content, image, title,summary,category,featured})   
                     console.log("testingEdit",currentLanguage, {blogContent:content, image, title,summary,category,featured},currentField)
                   
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


    //get and populate all available category fields 
    useEffect(() => {
        const fetchAllCategories = makeGetRequest("/api/categories")

        fetchAllCategories().then(response => {
            const returnedData = returnGetResponseData<typeof response>(response)
            console.log("returnedData", returnedData)
            const categoryArray = generateDropDownOptionsForCategory(returnedData)
            setAllCategory(categoryArray)
            }).catch((e) => {
              console.log("category")
          })

    }, [])


    //reload the page 
    function handleRouteChangeComplete() {
        if (edit && convertEditToDraft === true && !publish.current && refDraftId.current) {
            
           Router.reload()
        }
       
   }
 
     //event handler handle for unLoad
    async function unLoadHandler(event: BeforeUnloadEvent) {
       const isEligibleForDraft =  madeUpdate.current === true || refDraftId.current ? true :false
       
         if (edit && convertEditToDraft === true && !publish.current && isEligibleForDraft && deleteDraftStatus) {
            console.log("refDraftId",refDraftId)
            stopFurtherDraftSave.current = true
             alert("saving article as draft")
             saveDraftCallCount.current = 0;
             draftArticleId.current = undefined;
             if(id) await deleteArticle(id!.toString())
           
             if (madeUpdate.current === true && !refDraftId.current) {
                 const currentValues: currentValue | undefined = draftData.current
                 
                 const data_for_upload = JSON.stringify({
                     data: {
                      title: currentValues?.title || "Untitled",
                    description: currentValues?.title,
                    content: currentValues?.blogContent, 
                    image: currentValues?.image,
                    featured: currentValues?.featured,
                    slug: articleslug,
                    category: currentValues?.category,
                    summary: currentValues?.summary,
                    authorImage: props?.profilePics,
                    thumbNail:currentValues?.thumbNail,
                    author: props?.name ,
                    publishedAt:new Date().toISOString() ,
                    locale: languageObject[currentLanguage] ,
                   
                }}
                )
               const  response = await api.post(`/api/drafts`, data_for_upload,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                
                 
              

                 
                
               
                

             } 
             else {
               
                 
             }
             
             

             console.log("refDraftId",madeUpdate.current,draftArticleId)
           
             
            
             
        }
        
       
        
    }
    

    

    //handle getRequest  
    function makeGetRequest(route: string) {
        
        return async () => {
            const requestResponse = await api.get(route)  
            
            return requestResponse; 
        }
    
    }

    //generate drop down options
    function generateDropDownOptionsForCategory<categoryObject>(categoryObj:categoryObject | any):any[] {
        const categoryArray = categoryObj.map((category:any) => {
                   const id = category.id
                   const categoryName = category?.attributes?.category
                return { id, label: categoryName }
        })


        return categoryArray
    } 

    //return response  data 
    function returnGetResponseData<responseObject>(responseObject: responseObject | any) {
     return responseObject!.data!.data

        
    }
     
    
    //handle category change
    function onCategoryChange(categoryObject: any) {
        const fieldValue = categoryObject?.value
        
        const fieldObject = {
            target: {
                name: "category",
                value: fieldValue

            }
        }
        updateFormikFields(fieldObject)
       
       
        
    
    }


    


    //update formik field
    const updateFormikFields = (e: any) => {
         
        madeUpdate.current = true;
        const fieldName = e.target.name;
        let enteredValue = e.target.value;

      console.log("hi steve",e.target.checked )

        if (fieldName === "featured") {
            if (!e.target.checked && e.target.checked === false  ) enteredValue = "No";
            else if (e.target.checked && e.target.checked === true) enteredValue = "Yes";
            
        }
          
       
        const currentValues = formikObject.values[currentLanguage]
        console.log("formikText",enteredValue )
        const fieldValue = {...currentValues, [fieldName]: enteredValue }
         
        

        console.log("checkForm",saveDraftCallCount.current,!draftArticleId.current)
    
        if (fieldName === "image" || "title" || "category" || "summary" || "blogContent" || "featured"  || "thumbNail") {
            if (saveDraftCallCount.current === 1 && !draftArticleId.current) return;
           
            console.log("values,")
            saveAsDraftHandler("",{...formikObject.values[currentLanguage], [fieldName]: enteredValue })()
            saveDraftCallCount.current = saveDraftCallCount.current + 1
            //draftData.current = {...formikObject.values[currentLanguage], [fieldName]: enteredValue }
            console.log("valuestestingedit33",{...formikObject.values[currentLanguage], [fieldName]: enteredValue })
            //setSaveDraftCallCount((prev)=> prev +1)
           
            
            
        }

        if (fieldName !== "image") currentFieldValue.current = fieldValue  as currentValue ; 
        if (fieldName === "image") {
            const isThumbNailIMageAdded = formikObject.values[currentLanguage]["thumbNail"]
            
            const fieldValue = { ...currentFieldValue.current, [fieldName]: enteredValue }
            draftData.current = fieldValue as currentValue;
            formikObject.setFieldValue(currentLanguage, fieldValue)

            return;
            
            
        }
        draftData.current = fieldValue  as currentValue ;
        formikObject.setFieldValue(currentLanguage, fieldValue)
      
        
        

    }

 
    
    //handle saving article as draft
    const saveAsDraftHandler = (value:any, currentValues:any)=>debounce(async () => {
        const { id, draft, edit } = Router.query
        try {

         
        if (endDraft === true) return
        if (edit && !currentId) return;
        if (draft && !draftArticleId.current) return;
        if (stopFurtherDraftSave.current === true  ) return;
        //alert("debouncing ")
            setSaveAsDraft(true)
            trackDraft.current = true

  
        
       
        const data_for_upload = JSON.stringify( {data:{
            title: currentValues?.title || "Untitled",
            description: currentValues?.title ,
            content: currentValues?.blogContent , 
            image: currentValues?.image,
            featured:currentValues?.featured,
            slug: slug(articleslug),
            category: currentValues?.category,
            summary:currentValues?.summary,
            authorImage: props?.profilePics ,
            author: props?.name ,
            publishedAt: new Date().toISOString(),
            thumbNail:currentValues?.thumbNail,
            locale: languageObject[currentLanguage] ,
           
        }}
    )
    
        let response: any; 
       
        
        
        if (draftArticleId.current) {
            

            const data_for_upload = JSON.stringify({
                data: {
                    title: currentValues?.title,
                    description: currentValues?.title,
                    content: currentValues?.blogContent,
                    image: currentValues?.image,
                    category: currentValues?.category,
                    summary:currentValues?.summary,
                    authorImage: props?.profilePics,
                    author: props?.name,
                    featured: currentValues?.featured,
                    thumbNail:currentValues?.thumbNail,
                    locale:languageObject[currentLanguage]
                   
                }
            })

            console.log("response123", data_for_upload,currentValues)
             response = await api.put(`/api/drafts/${draftArticleId.current}`, data_for_upload,{
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            setSaveAsDraft(false)
            trackDraft.current = false

            return;
        }

        else{
           response = await api.post(`/api/drafts`, data_for_upload,{
            headers: {
              'Content-Type': 'application/json'
            }
          })
           
        }

    if (response.status === 200) {
        const id = response?.data?.data?.id
    
       console.log("ided",id)
        setSaveAsDraft(false)
        trackDraft.current = false
        refDraftId.current = id
        draftArticleId.current=id
       
    

        return
        
    }
             
        } catch (e) {
            console.log("strap",e)
            alert("an error occured, refresh browser")
         }
       
    },1000)


    const removeUnwantedString = (value: string, unwantedString: string): string => {
        console.log("un2",value,unwantedString)
    
        let htmlString = value.replace(unwantedString,"")

        return  htmlString
          
        
    }

   

    //update blog content
    async function updateBlogContent(value: string) {
        const { id, draft } = Router.query
        const defaultTextEditorFieldValue = "<p><br></p>";
        const currentValues = formikObject.values[currentLanguage]
        const uploadingText = `Uploading....`
        console.log("my-upload",uploading.current)
        let newString = uploading.current === "SUCCESS" ? removeUnwantedString(value, uploadingText):value
        newString = newString ? newString : value;
      
        const fieldObject = {
            target: {
                name: "blogContent",
                value:value === defaultTextEditorFieldValue ? "":newString,
            }

           }
        if (convertEditToDraft === false) return;
        if (draft && !isDraftRenderSuccess) return;
        if (edit && !isEditRenderSucess) return;
        

        // alert("update blog content")
        console.log("proceeding",fieldObject)

        updateFormikFields(fieldObject)
        
         //@ts-ignore
         //updateBlogContent.calls = updateBlogContent.calls + 1;
        // if (saveDraftCallCount === 1 && !draftArticleId) return;


        // //alert("update")
      
        // saveAsDraftHandler(value, currentValues)()
        
        // setSaveDraftCallCount((prev)=> prev +1)
       

       
 
       
        
    }; 



    const deleteDraft = async (draftId:string,onPageCall?:boolean) => {
        try {
            if (onPageCall) {
                setDeleteDraftStatus(true)
                
            }

            const response = await api.delete(`/api/drafts/${draftId}`)
           
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

  //delete image from cloudinary
    const handleDeleteImage = async (imageUrl:string) => {
        const cloudName =process.env.NEXT_CLOUD_NAME;
        const timestamp = new Date().getTime();
        const apiKey = process.env.NEXT_API_KEY;
        const apiSecret = process.env.NEXT_API_SECRET
        const publicId = getPublicIdFromUrl(imageUrl)
        //@ts-ignore
        const signature = generateSHA1(generateSignature(publicId, apiSecret));
        const url = `https://api.cloudinary.com/v1_1/dy9d8uotq/image/destroy`
      
        try {
          const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key: apiKey,
            timestamp: timestamp,
          });
      
          console.error(response);
        
        } catch (error) {
            alert("error deleting cloudinary image")
          console.error(error);
        }
      };

    
   

    //handle formSubmit
    async function onSubmit(values: formTypes, actions: any) {
        setIsAddingBlog(true)
        setConvertEditToDraft(false)
        publish.current = true
        const currentValues = values[currentLanguage]
        console.log("testPayload",currentValues)
        
        try {
            const data_for_upload = JSON.stringify({
                data: {
                    title: currentValues?.title,
                    description: currentValues?.title,
                    content: currentValues?.blogContent,
                    image: currentValues?.image,
                    category: currentValues?.category,
                    summary:currentValues?.summary,
                    slug: slug(currentValues?.title),
                    authorImage: props?.profilePics,
                    author: props?.name,
                    thumbNail:currentValues?.thumbNail,
                    locale: languageObject[currentLanguage],
                    featured:currentValues?.featured
            }
            })
            
            const { edit, id,draft } = Router.query
            const current_language_formik_field = formikObject["values"][currentLanguage]
          
            
            let isLanguageVersionFieldValuesPresent;

                Object.entries(current_language_formik_field).forEach((eachField) => {
                    if(eachField[1])  isLanguageVersionFieldValuesPresent = true
                
            })

          
            let response 
            //update featured article 

            
            if (currentValues?.featured === "Yes" && props.featuredArticleId) {

                const data_for_upload = JSON.stringify({
                    data: {
                        
                        featured:"No",
                      
                       
                    }
                })
          
                
                try {

                   const response =  await api.put(`/api/articles/${props.featuredArticleId}`, data_for_upload)
                    
                }
                catch (e) {
                    
                }
                
                
            }

            if (isDataAvailable  === false && edit) {
                
                const data_for_upload = JSON.stringify( {
                        title: currentValues?.title,
                        description: currentValues?.title,
                        content: currentValues?.blogContent,
                        image: currentValues?.image,
                      category: currentValues?.category,
                      summary:currentValues?.summary,
                        slug:articleslug,
                        authorImage: props?.profilePics,
                    author: props?.name,
                    thumbNail:currentValues?.thumbNail,
                    featured:currentValues?.featured,
                    locale: languageObject[currentLanguage],
                    publishedAt:new Date().toISOString(),
                       
                    }
                )
                
                response = await api.post(`/api/articles/${id}/localizations`,data_for_upload)
            console.log("response123",response)

                if (response.status === 200) {
                    setIsAddingBlog(false)
                    if(draftArticleId.current)  await deleteDraft(draftArticleId.current as string)
                    //@ts-ignore
                    draftArticleId.current =null
                    refDraftId.current = null
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
                        category: currentValues?.category,
                        summary:currentValues?.summary,
                        authorImage: props?.profilePics,
                        author: props?.name,
                        thumbNail:currentValues?.thumbNail,
                        featured:currentValues?.featured,
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
                    if(id)deleteDraft(id.toString())
                    
                };
                response = await api.post("/api/articles", data_for_upload)
                // refDraftId.current = null
                // draftArticleId.current =null;
                // setSaveDraftCallCount(0)

                // saveAsDraftHandler.flush()
            }
           
            if (response?.status === 200) {
                setIsAddingBlog(false)
                if (!draft) {
                
                    //draftArticleId.current
                    console.log("do me", draftArticleId.current)
                    if(draftArticleId.current)deleteDraft(draftArticleId.current as string)
                    refDraftId.current = null
                draftArticleId.current =null;
                //setSaveDraftCallCount(0)
                    saveDraftCallCount.current = 0;
                }
               
                alert("blog added successfully")
             
                
                //Router.push("/admin")
                
                Router.push("/admin")
            
            }

            console.log("upload-response",response)
            
            
        } catch (e) {
            console.log("blog error",e)
            alert("error occurred , refresh your browser")
            setIsAddingBlog(false)
            
        }

        actions?.resetForm();

        
    }

    //open file to upload
    const changeImageHandlerBtn= (e: React.MouseEvent) => {
         const currentInputELement = ref.current;
        currentInputELement?.click();

        
    } 

     //open file to upload thumbbail
     const changeThumbHandlerBtn = (e: React.MouseEvent) => {
        const currentInputELement = thumbNailRef.current;
       currentInputELement?.click();

       
   } 

    //upload image to strapi backend
    const uploadImageToCloudinary = async (fileToUpload: File) => {
        
          const formData = new FormData()
        formData.append("file", fileToUpload)
        formData.append('upload_preset', "asteve_test");
           const image_upload_response = await api.post("https://api.cloudinary.com/v1_1/dy9d8uotq/image/upload",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           })
        
        console.log("testing",image_upload_response)
        
         return image_upload_response;
    
            
    }
    

//delete image 
    async function deleteImage<imgadataType>(imageData: imgadataType) {
         const timestamp = Math.floor(Date.now() / 1000);
        // const params = {
        //     api_key: apiKey,
        //     public_id: publicId,
        //     timestamp: timestamp,
        // }
        const delete_image_response = await api.post(`https://api.cloudinary.com/v1_1/dy9d8uotq/image/destroy`)
        return delete_image_response
} 

     //update image data
    const addImageData = (responseObject:any) => {
        const { data } = responseObject;
        console.log("data",data)
        const id = data.id;
        const ImagePath = data.url 
        const formObj = {
            target: {
                name: "image",
                value:`${ImagePath}`
            }
        }
        updateFormikFields(formObj)
       
       
        console.log("formed", formikObject.values[currentLanguage])
    
        imageId.current =  {...imageId.current,[currentLanguage]:id}
        //setImageId((prev)=> ({...prev,[currentLanguage]:imageId}))
        if (ref.current) {
            ref.current.value = ""
        }
    }


       //update thumNail data
       const addThumbNailData = (responseObject:any) => {
        const { data } = responseObject;
        console.log("data",data)
        const id = data.id;
        const ImagePath = data.url 
        const formObj = {
            target: {
                name: "thumbNail",
                value:`${ImagePath}`
            }
        }
        updateFormikFields(formObj);
        thumbNailId.current =  {...thumbNailId.current,[currentLanguage]:id}
       if (thumbNailRef.current) {
            thumbNailRef.current.value = ""
        }
    }



      //handle upload thumnNail image;
      const uploadSelectedThumbNail = async (e: React.ChangeEvent) => {
      
        const selectedImage = e.target   as HTMLInputElement;
        const fileList = selectedImage?.files as FileList;
        const ifFileSizeIsNotAllowed = !validDateFileSize(fileList[0]);

         
        if (ifFileSizeIsNotAllowed) return alert("file size is too large")
           
        setIsUploadingThumbNail(true)
        try {
          
            const uniqueImageId = thumbNailId?.current[currentLanguage];
            

            if (uniqueImageId) {
                console.log("current1245",imageId.current)
                //await deleteImage(uniqueImageId)
                const image_url = formikObject.values[currentLanguage]["thumbNail"]

                await handleDeleteImage(image_url)
                const upload_response = await uploadImageToCloudinary(fileList[0]);
                if (upload_response.status === 200) {
                    addThumbNailData(upload_response)
                    setIsUploadingThumbNail(false)
                    
                }
               
                
               
            }
            else {
                const upload_response = await uploadImageToCloudinary(fileList[0]);
                if (upload_response.status === 200) { 
                    addThumbNailData(upload_response)
                    setIsUploadingThumbNail(false)
                }
                
               
                
                
            }
          }
        catch (errorMessage) {
            setIsUploadingThumbNail(false)
            console.log("upload_failure", errorMessage)
            alert("upload  fail")
            
        }



       
       
    


    }


    //handle uploaded image;
    const uploadSelectedImage = async (e: React.ChangeEvent) => {
      
        const selectedImage = e.target   as HTMLInputElement;
        const fileList = selectedImage?.files as FileList;
        const ifFileSizeIsNotAllowed = !validDateFileSize(fileList[0]);

         
        if (ifFileSizeIsNotAllowed) return alert("file size is too large")
           
        setIsUploading(true)
        try {
          
            const uniqueImageId = imageId?.current[currentLanguage];
            

            if (uniqueImageId) {
                console.log("current1245",imageId.current)
                //await deleteImage(uniqueImageId)
                const image_url = formikObject.values[currentLanguage]["image"]

                await handleDeleteImage(image_url)
                const upload_response = await uploadImageToCloudinary(fileList[0]);
                if (upload_response.status === 200) {
                    addImageData(upload_response)
                    setIsUploading(false)
                    
                }
               
                
               
            }
            else {
                const upload_response = await uploadImageToCloudinary(fileList[0]);
                if (upload_response.status === 200) { 
                    addImageData(upload_response)
                    setIsUploading(false)
                }
                
               
                
                
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
                
                const upload_response = await uploadImageToCloudinary(image)
                const { data } = upload_response;
                const ImagePath = data.url 
                const image_url = `${ImagePath}`
               onSuccess(image_url)
                

            } catch (errorMessage) {
                onError("")
                
            }
        
        }
    //mouse enter and mouse leave animation
    const BannerImageMouseEnterAndExitHandler = (e: React.MouseEvent, type: string) => {
        const isEventMouseOver = type === "Over"
        const isEventMouseLeave = type === "leave"
        if (isEventMouseOver) return springApi.start({  opacity: 8  })
        else if(isEventMouseLeave)  return  springApi.start({  opacity: 0 })
        
}

      //mouse enter and mouse leave animation
      const ThumbNailImageMouseEnterAndExitHandler = (e: React.MouseEvent, type: string) => {
        const isEventMouseOver = type === "Over"
        const isEventMouseLeave = type === "leave"
        if (isEventMouseOver) return springThumbApi.start({  opacity: 8  })
        else if(isEventMouseLeave)  return  springThumbApi.start({  opacity: 0 })
        
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
        uploadImageToCloudinary,
        saveAsDraft,
        draftArticleId:draftArticleId.current,
        deleteDraftStatus,
        deleteDraft,
        BannerImageMouseEnterAndExitHandler,
        springs,
        category,
        onCategoryChange,
        uploading,
        springsThumb,
        ThumbNailImageMouseEnterAndExitHandler,
        changeThumbHandlerBtn,
        thumbNailRef,
        uploadSelectedThumbNail,
        isUploadingThumbNail
        
    }


    
}