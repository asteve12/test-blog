import { useBlogFormLogic } from "@/hooks/useBlogFormLogic"
import { useConditionallyRenderElement } from "@/hooks/useConditionallyRenderedElement"
import { FormControl, Heading, Image,Button, FormLabel, Input,Box,Flex} from "@chakra-ui/react"
import { TextEditor } from "./textEditor"
import { Bars } from "react-loader-spinner"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ThreeDots}  from "react-loader-spinner"

type IBlogForm = {
    profilePics: string,
    name:string
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
        isAddingBlog


    } = useBlogFormLogic(props)

    const uploadBlogBtn =<Button  data-formName="unfilled" type="submit" mt="10px" fontSize="16px" colorScheme="none" w="173px" border="solid 1px #EA445A" h="56px"  bg="#EA445A"  borderRadius="200px" >
        
       {isAddingBlog ? <ThreeDots color="white"></ThreeDots> :"Save Changes"}</Button>

    const imageElement  = <Image objectFit="cover"
    alt="upload image" w="796px" mt="20px" h="320px" borderRadius="8px" maxW="100%"
        src={formikObject?.values[`${currentLanguage}`]["image"]}/>
    
    const changeImageBtn = <Button name="image" onClick={changeImageHandlerBtn} mb="15px" colorScheme="none" fontSize="16px" pt="20px" pb="20px" pl="20px" pr="20px" borderRadius="30px" color="#EA445A" border="solid 1px #EA445A" variant='outline' mt="20px">{formikObject?.values[`${currentLanguage}`]["image"] ? "Change Image":"Upload Image"}</Button>
    const loader = <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
    const elmentToRender = useConditionallyRenderElement(changeImageBtn,!isImageUploading,loader,isImageUploading) as React.ReactNode
    const renderImageElemetConditionally = useConditionallyRenderElement(imageElement,formikObject?.values[`${currentLanguage}`]["image"]!== "") as React.ReactNode

    return <form
        ref={formContainer}
         onSubmit={formikObject.handleSubmit}>
        <Heading fontSize="27px"  mt="50px" fontWeight="700" fontFamily="satoshi bold" color="#2D2B4A">Banner Image</Heading>
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
        <Box  w="796px">

        <Input   ref={ref} onChange={uploadSelectedImage} type="file" visibility="hidden"></Input>
        <FormLabel>Title</FormLabel>
            <Input data-formName="title" onBlur={formikObject?.handleBlur}
                onChange={updateFormikFields} name="title" value={formikObject?.values[`${currentLanguage}`]["title"]} mb="15px" w="796px" placeholder="Nigeria Report"></Input>
        <FormLabel>Content</FormLabel>
        <div data-formName="blogContent">
        <TextEditor
        uploadImageHandler={uploadTextEditorImages}
        onChange={updateBlogContent}
            value={formikObject?.values[`${currentLanguage}`]["blogContent"]}
            
        ></TextEditor>
        </div>
        

        {uploadBlogBtn}            
      </Box>
    
       

        
    
    </form>
    

}