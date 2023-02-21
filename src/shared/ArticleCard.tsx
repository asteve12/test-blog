import { useConditionallyRenderElement } from '@/hooks/useConditionallyRenderedElement';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { BlogAuthCard } from './blogAuthorCard';
import { BlogTitle } from './blogTitlteCard';
import { TimerCard } from './TimeCard';
import { RiDeleteBinLine } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
import { RxEyeOpen } from "react-icons/rx"
import { useRouter } from 'next-translate-routes';
import { ThreeDots } from 'react-loader-spinner';




type ArticleCard = {
  title: string;
  content: string;
  image: string;
  authorName: string;
  authorImage: string;
  estimateArticleReadTime: (article: string) => void;
  type?: string,
  deleteArticle?: (articleId: number) => void,
  id?: number,
  isDeleting?: boolean,
  slug?:string
};

export const ArticleCard = ({
  title,
  content,
  image,
  authorName,
  authorImage,
  estimateArticleReadTime,
  type,
  deleteArticle,
  id,
  isDeleting,
  slug
}: ArticleCard) => {

  const Router = useRouter()
const AdminBlogFooterElements = [
    {
    name: "Delete",
      icons: RiDeleteBinLine,
       onClick:() => {if(deleteArticle && id ) return  deleteArticle(id)}
    },
    {
      name: "Edit",
      icons: BiEdit,
      onClick:()=> Router.push(`/admin/add-article?edit=true&id=${id}&slug=${slug}`)
    },
    {
      name: "Preview",
      icons: RxEyeOpen,
      onClick:()=> alert("preview clicked")
    }
  ]
const timeToRead = estimateArticleReadTime(content);
  
  const blogFooter = <BlogAuthCard authorName={authorName} authorImage={authorImage}></BlogAuthCard>;

  const AdminBlogFooter = <Flex w="80%" justifyContent="space-between">
    
    {AdminBlogFooterElements.map((footerItems) => <Button  onClick={footerItems.onClick} bg="transparent  !important" color="#666481" fontWeight="normal"  fontFamily="satoshi" fontSize="14px" display="flex" alignItems="center">
      <footerItems.icons></footerItems.icons>&nbsp;
      {footerItems.name}
    </Button>)}
 
  </Flex>
  const isAdmin = type === "admin";
  const blogCardFooterElem =  useConditionallyRenderElement(blogFooter,!isAdmin) as React.ReactNode
  const AdminBlogCardFooterEle = useConditionallyRenderElement(AdminBlogFooter,isAdmin) as React.ReactNode
const loaderCard = <Flex  alignItems="center" justifyContent="center" position="absolute" bg="rgba(0,0,0,0.3)" w="100%" h="100%">
<ThreeDots color='white'></ThreeDots>
</Flex>
  return (
    <Box position="relative" w={['100%', '95%','95%', '389px']} h={['auto', '542px']} mb={['30px', '0px']} ml="auto" mr="auto">
      
      {isDeleting && loaderCard}
      <Image
        w={'100%'}
        objectFit="cover"
        h={['35%', '323px']}
        borderRadius="5px"
        src={`${image}`}
      />
      <Flex justifyContent="space-between" display={['none', 'flex']} mt="10px" w="100%">
        <BlogTitle title={title}></BlogTitle>
        <TimerCard timetoRead={timeToRead} />
      </Flex>

      <Heading
        fontFamily="satoshi black"
         mt="10px"
        mb="10px"
        fontSize={['18px', '24px']}
        fontWeight="900"
        w="100%"
      >
        {title}
      </Heading>
      <Box mb="12px" h="50px">
        <Text
          noOfLines={2}
          fontFamily="satoshi  "
          mb="10px"
          fontSize="14px"
          color="#666481"
        >
          {content}
        </Text>
      </Box>
      {blogCardFooterElem}
      {AdminBlogCardFooterEle}
     
    </Box>
  );
};
