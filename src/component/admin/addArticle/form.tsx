import { useBlogFormLogic } from "@/hooks/useBlogFormLogic"
import { useConditionallyRenderElement } from "@/hooks/useConditionallyRenderedElement"
import {  Textarea,Heading, Image,Button,Box, FormLabel, Input,Flex, ChakraProps,Text, TextProps, ImageProps} from "@chakra-ui/react"
import { TextEditor } from "./textEditor"
import { Bars } from "react-loader-spinner"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ThreeDots } from "react-loader-spinner"
import { PreviewContainer } from "../Preview/container"
import { AiOutlineCloseCircle } from "react-icons/ai"
import {ThreeCircles} from "react-loader-spinner"
import React, { ReactNode } from "react"
import { ImageUploadOverlay } from "./imageUploadOverlay"









type IBlogForm = {
    profilePics: string,
    name:string
}


const styles = {
    previewstyle: {
        position: "absolute",
        w: "100%",
        h: "100%",
        zIndex: "100",
        top: "0px",
        
    },
    headerTextStyle: {
        fontSize:"27px", 
        mt: "50px",
        fontWeight: "700",
        fontFamily: "satoshi bold",
        color: "#2D2B4A",
        zIndex:"-100"
    
        
    },
    formContainerStyle:{
        position: "relative",
        width: "100%",
        
    },
    placeHolderCardImageStyle: {
        w: "500px",
        h: "300px",
        bg: "#E5E5E5",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "10px",
        mb: "10px",
        borderRadius:"10px"
        
    },
    addImageIconStyle: {
        color:"#969696",
        size:"50"
        
    },
    addImageTextStyle: {
        color: "white",
        fontSize: "20px",
        textAlign:"center"
    },
    BannerContStyle: {
        w:"796px", 
        mt:"20px", 
        h:"320px",
        maxW:"100%",
        position: "relative",
        cursor:"pointer"
        
    },
    BannerImageStyle: {
        w:"100%",
        h:"100%",
        borderRadius:"8px",
        objectFit:"cover"
    },
    CategoryStyle: {
        fontSize: "15px",
        mb:"15px"
    },
    SummaryStyle: {
        fontSize: "15px",
        mb:"15px"
    }
    
    
    
}




export const BlogForm = (props: IBlogForm) => {
    const { formContainer,
        isImageUploading,
        uploadTextEditorImages,
        
        updateBlogContent,
        formikObject, ref,
        changeImageHandlerBtn,
        uploadSelectedImage,
        languageOPtions,
        setCurrentLanguage,
        currentLanguage,
        updateFormikFields,
        isAddingBlog,
        preview,
        setPreview,
        parsedBlogContentValue,
        uploadImageToCloudinary,
        saveAsDraft,
        draftArticleId,
        deleteDraftStatus,
        deleteDraft,
        BannerImageMouseEnterAndExitHandler,
        springs,
        category,
        onCategoryChange,
        //selectedCategory
        
    } = useBlogFormLogic(props)

     const allAvailableCategory = <Dropdown value={formikObject?.values[`${currentLanguage}`]["category"]  ? formikObject?.values[`${currentLanguage}`]["category"]  :""} options={category}  onChange={onCategoryChange} />
    

const isImageAvailable = formikObject?.values[`${currentLanguage}`]["image"]!== ""


const uploadBlogBtn = <Flex alignItems="center"  data-formName="error-indicator" >
    <Button
        isDisabled={isAddingBlog && !saveAsDraft || saveAsDraft && !isAddingBlog ? true : false}
        data-formName="unfilled" type="submit" mt="10px" fontSize="16px" colorScheme="none" w="173px" border="solid 1px #EA445A" h="56px" bg="#EA445A" borderRadius="200px" >
            {isAddingBlog  && !saveAsDraft && <ThreeDots color="white"></ThreeDots> }
            {saveAsDraft && !isAddingBlog &&   <Flex color="white" alignItems="center">...saving as draft  </Flex>}
            {!isAddingBlog && !saveAsDraft && "Publish"}
        </Button>
        <Button fontSize="16px" mt="10px" colorScheme="none" w="173px"  h="56px" color="#EA445A"   onClick={()=> setPreview(true)}>
            preview
        </Button>
        {draftArticleId &&  <Button  isDisabled={deleteDraftStatus  && true} fontSize="16px" mt="10px" colorScheme="none" w="173px"  h="56px" color="#EA445A"  onClick={()=> deleteDraft(draftArticleId.toString(),true)} >{deleteDraftStatus ? "deleting....":"delete draft"}</Button>}
      
</Flex>
    



    const imageElement = <Box
        onMouseLeave={(e)=> BannerImageMouseEnterAndExitHandler(e,"leave")}
        onMouseOver={(e)=> BannerImageMouseEnterAndExitHandler(e,"Over")}
        {...styles.BannerContStyle as ChakraProps}>
        <ImageUploadOverlay   uploadStatus={isImageUploading}  changeImageHandlerBtn={changeImageHandlerBtn} spring={springs}/>
        <Image {...styles.BannerImageStyle as ImageProps} alt="upload image" src={formikObject?.values[`${currentLanguage}`]["image"]} />
    </Box> 
    
    const changeImageBtn = <Button name="image" onClick={changeImageHandlerBtn} mb="15px" colorScheme="none" fontSize="16px" pt="20px" pb="20px" pl="20px" pr="20px" borderRadius="30px" color="#EA445A" border="solid 1px #EA445A" variant='outline' mt="20px">{formikObject?.values[`${currentLanguage}`]["image"] ? "Change Image":"Upload Image"}</Button>
    const loader = <ThreeDots color="#EA445A"></ThreeDots>

    const elmentToRender = useConditionallyRenderElement(changeImageBtn,!isImageUploading,loader,isImageUploading && !isImageAvailable) as React.ReactNode
    
    const renderImageElemetConditionally = useConditionallyRenderElement(imageElement, formikObject?.values[`${currentLanguage}`]["image"] !== "") as React.ReactNode
    
    const renderPreviewComponentWithCondition = useConditionallyRenderElement(<Box {...styles.previewstyle as ChakraProps} ><PreviewContainer blogContent={parsedBlogContentValue} BannerImg={formikObject?.values[`${currentLanguage}`]["image"]} blogHeader={formikObject?.values[`${currentLanguage}`]["title"]}
  summary={formikObject?.values[`${currentLanguage}`]["summary"]}
        category={formikObject?.values[`${currentLanguage}`]["category"]}
        closePreview={setPreview}></PreviewContainer></Box>, preview) as React.ReactNode
    
    const renderHeaderTextWithCondition = useConditionallyRenderElement(<Heading  {...styles.headerTextStyle}>Banner Image</Heading>, !preview) as React.ReactNode
   
    
    
    return <form
        ref={formContainer}
        onSubmit={formikObject.handleSubmit}
        style={styles.formContainerStyle  as React.CSSProperties}
    >
        {renderPreviewComponentWithCondition}
        {renderHeaderTextWithCondition}
       
        
        <div data-formName="image">

        {renderImageElemetConditionally}
    
        </div>
      
        <div>
            {!isImageAvailable  || isImageUploading ? elmentToRender:""}  

          
        </div>

        <Flex  alignItems="center" fontSize="12px" mt="10px" mb="10px">
            Language : <Dropdown
                options={languageOPtions}
                onChange={(e) => {
                   setCurrentLanguage(e?.value)
                }} value={currentLanguage} />
        </Flex>
        <Box  w={["100%","100%","796px"]}>

        <Input fontSize="15px"  w="100%"  ref={ref} onChange={uploadSelectedImage} type="file" visibility="hidden"></Input>
        <FormLabel fontSize="15px">Title</FormLabel>
            <Input  h="40px" fontSize="15px" w="100%" data-formName="title" onBlur={formikObject?.handleBlur}
                onChange={updateFormikFields} name="title" value={formikObject?.values[`${currentLanguage}`]["title"]} mb="15px" placeholder="Enter blog title"></Input>
        
            <FormLabel fontSize="15px">Category</FormLabel>
            <Box   data-formName="category" {...styles.CategoryStyle}>
                    {allAvailableCategory}
            </Box>

            <FormLabel fontSize="15px">Summary</FormLabel>
            <Textarea
                name="summary"
                onChange={updateFormikFields}
                data-formName="summary"
                {...styles.SummaryStyle}
                placeholder="Enter summary here"
                value={formikObject?.values[`${currentLanguage}`]["summary"]}
            />
                
          
            
            
        
            <FormLabel fontSize="15px">Content</FormLabel>
        <div  data-formName="blogContent">
        <TextEditor
        uploadImageHandler={uploadImageToCloudinary}
        onChange={updateBlogContent}
            value={formikObject?.values[`${currentLanguage}`]["blogContent"]}
            
        ></TextEditor>
        </div>
        

        {uploadBlogBtn}            
      </Box>
    
       

        
    
    </form>
    

}