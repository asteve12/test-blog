import { useBlogFormLogic } from "@/hooks/useBlogFormLogic"
import { FormControl, Heading, Image,Button, FormLabel, Input} from "@chakra-ui/react"
import { TextEditor } from "./textEditor"





export const BlogForm = () => {

    const { updateBlogContent,formikObject,
        ref, changeImageHandlerBtn,uploadSelectedImage } = useBlogFormLogic()

    return <FormControl  w="100%"  minH="500px"  p="40px" borderRadius="10px" bg="white">
        <Heading fontSize="27px" fontWeight="700">Banner Image</Heading>
        <Image
            
            objectFit="cover"
            fallbackSrc="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
            alt="upload image" w="796px" mt="20px" h="320px" borderRadius="8px" maxW="100%"
            src={formikObject?.values?.image}></Image>
       <Button  onClick={changeImageHandlerBtn} mb="15px" colorScheme="none" fontSize="16px" pt="20px" pb="20px" pl="20px" pr="20px"   borderRadius="30px" color="#EA445A" border="solid 1px #EA445A" variant='outline' mt="20px">
       Change Image
        </Button>
        <Input ref={ref} onChange={uploadSelectedImage} type="file" visibility="hidden"></Input>
        <FormLabel>Title</FormLabel>
        <Input onBlur={formikObject?.handleBlur} onChange={formikObject.handleChange} name="title" value={formikObject?.values?.title} mb="15px" w="796px" placeholder="Nigeria Report"></Input>
        <FormLabel>Content</FormLabel>
        <TextEditor
        onChange={updateBlogContent}
        value={formikObject?.values?.blogContent}
        ></TextEditor>


        <Button  mt="10px" fontSize="16px" colorScheme="none" w="173px" border="solid 1px #EA445A" h="56px"  bg="#EA445A"  borderRadius="200px" >Save Changes</Button>
        
    
    </FormControl>
    

}