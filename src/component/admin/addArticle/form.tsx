import { useBlogFormLogic } from "@/hooks/useBlogFormLogic"
import { useConditionallyRenderElement } from "@/hooks/useConditionallyRenderedElement"
import { FormControl, Heading, Image,Button, FormLabel, Input,Box,Flex, ChakraProps} from "@chakra-ui/react"
import { TextEditor } from "./textEditor"
import { Bars } from "react-loader-spinner"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ThreeDots } from "react-loader-spinner"
import { PreviewContainer } from "../Preview/container"
import { AiOutlineCloseCircle } from "react-icons/ai"
import {ThreeCircles} from "react-loader-spinner"







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
        
    }
    
}




export const BlogForm = (props: IBlogForm) => {
  
    const { formContainer, isImageUploading, uploadTextEditorImages,
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
        uploadImageToStrapiBackedn,
        saveAsDraft,
        draftArticleId,
        deleteDraftStatus,
        deleteDraft,
        
} = useBlogFormLogic(props)


    console.log("parsedBlogContentValue",parsedBlogContentValue)
    const uploadBlogBtn = <Flex alignItems="center">
        <Button  data-formName="unfilled" type="submit" mt="10px" fontSize="16px" colorScheme="none" w="173px" border="solid 1px #EA445A" h="56px"  bg="#EA445A"  borderRadius="200px" >
            {isAddingBlog  && !saveAsDraft && <ThreeDots color="white"></ThreeDots> }
            {saveAsDraft && !isAddingBlog &&   <Flex color="white" alignItems="center">...saving as draft  </Flex>}
            {!isAddingBlog && !saveAsDraft && "Publish"}
        </Button>
        <Button fontSize="16px" mt="10px" colorScheme="none" w="173px"  h="56px" color="#EA445A"   onClick={()=> setPreview(true)}>
            preview
        </Button>
        {draftArticleId &&  <Button   fontSize="16px" mt="10px" colorScheme="none" w="173px"  h="56px" color="#EA445A"  onClick={()=> deleteDraft(draftArticleId.toString(),true)} >{deleteDraftStatus ? "deleting....":"delete draft"}</Button>}
      
    </Flex>


    const imageElement  = <Image objectFit="cover"
    alt="upload image" w="796px" mt="20px" h="320px" borderRadius="8px" maxW="100%"
        src={formikObject?.values[`${currentLanguage}`]["image"]}/>
    
    const changeImageBtn = <Button name="image" onClick={changeImageHandlerBtn} mb="15px" colorScheme="none" fontSize="16px" pt="20px" pb="20px" pl="20px" pr="20px" borderRadius="30px" color="#EA445A" border="solid 1px #EA445A" variant='outline' mt="20px">{formikObject?.values[`${currentLanguage}`]["image"] ? "Change Image":"Upload Image"}</Button>
    const loader = <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
    const elmentToRender = useConditionallyRenderElement(changeImageBtn,!isImageUploading,loader,isImageUploading) as React.ReactNode
    const renderImageElemetConditionally = useConditionallyRenderElement(imageElement,formikObject?.values[`${currentLanguage}`]["image"]!== "") as React.ReactNode
    const renderPreviewComponentWithCondition = useConditionallyRenderElement(<Box {...styles.previewstyle as ChakraProps} ><PreviewContainer blogContent={parsedBlogContentValue} BannerImg={formikObject?.values[`${currentLanguage}`]["image"]} blogHeader={formikObject?.values[`${currentLanguage}`]["title"]} closePreview={setPreview}></PreviewContainer></Box>, preview ) as React.ReactNode
    const renderHeaderTextWithCondition = useConditionallyRenderElement(<Heading  {...styles.headerTextStyle}>Banner Image</Heading>,!preview) as React.ReactNode
    
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
            {elmentToRender}  
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
                onChange={updateFormikFields} name="title" value={formikObject?.values[`${currentLanguage}`]["title"]} mb="15px" placeholder="enter blog title"></Input>
        <FormLabel>Content</FormLabel>
        <div  data-formName="blogContent">
        <TextEditor
        uploadImageHandler={uploadImageToStrapiBackedn}
        onChange={updateBlogContent}
            value={formikObject?.values[`${currentLanguage}`]["blogContent"]}
            
        ></TextEditor>
        </div>
        

        {uploadBlogBtn}            
      </Box>
    
       

        
    
    </form>
    

}