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
import { parseContent } from '@/util/parser';
import { useLayoutEffect, useState } from 'react';
import { Featured } from './Featured';
import { PreviewContainer } from '@/component/admin/Preview/container';







type ArticleCard = {
  title: string;
  content: string;
  image: string;
  authorName: string;
  authorImage: string;
  estimateArticleReadTime: (article: string) => void;
  type?: string,
  deleteArticle?: (articleId: number,slug:string) => void,
  id?: number,
  isDeleting?: boolean,
  slug?: string,
  itemIdToDelete?: number,
  setItemsIdToDelete?: (itemId: number) => void,
  summary: string,
  category: string,
  featuredArticle?:string
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
  slug,
  itemIdToDelete,
  setItemsIdToDelete,
  summary,
  category,
  featuredArticle
}: ArticleCard) => {
  const [cardContent, setContent] = useState("")
  const [preview, setPreview] = useState(false)
  const [currentId,setCurrentId] = useState<number | undefined>()
  const Router = useRouter()
  
  useLayoutEffect(() => {
     setContent(content)

  })

  const closePreview = (value:any) => {
   setPreview((prev)=> value)
 }
  
const AdminBlogFooterElements = [
    {
    name: "Delete",
      icons: RiDeleteBinLine,
    onClick: () => {
      if (deleteArticle && id && setItemsIdToDelete) {
        setItemsIdToDelete(id)
        return deleteArticle(id, `${slug}`)
      }; 
    }
    },
    {
      name: "Edit",
      icons: BiEdit,
      onClick:()=> Router.push(`/admin/add-article?edit=true&id=${id}&slug=${slug}`)
    },
    {
      name: "Preview",
      icons: RxEyeOpen,
      onClick: () => {
        setPreview((prev) => true);
        setCurrentId(id)
 }
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
    <>
      {isAdmin && currentId === id && preview=== true && < PreviewContainer
        blogContent={content}
        BannerImg={`${image}`}
        blogHeader={title}
        summary={summary}
        category={category}
        closePreview={closePreview}
        type="admin"
      />}

    <Box position="relative" w={['100%', '100%','95%', '389px']} h={['auto', '542px']} mb={['30px', '0px']} >
      {featuredArticle === "Yes" && <Featured style={{left:"20px"}}></Featured>}
      {isDeleting && itemIdToDelete=== id && loaderCard}
      <Image
        w={'100%'}
        objectFit="cover"
        h={['280px',null,null, '323px']}
        //h='323px'
        borderRadius="5px"
        src={`${image}`}
      />
      <Flex justifyContent="space-between" display={['none', 'flex']} mt="10px" w="100%">
        <BlogTitle title={category}></BlogTitle>
        <TimerCard timetoRead={timeToRead} />
      </Flex>

      <Heading
        fontFamily="satoshi black"
         mt="10px"
        mb="10px"
        fontSize={['1.8rem',"1.9rem","2.1rem",'2.4rem']}
        fontWeight="900"
        w="100%"
        noOfLines={2}
      >
        {title}
      </Heading>
      <Box mb="12px" h="50px">
        <Text
          
          noOfLines={2}
          fontFamily="satoshi"
          mb="10px"
          fontSize="14px"
          color="#666481"
          //dangerouslySetInnerHTML={{ __html: cardContent }}
          
        >
           {summary}
        </Text>
      </Box>
      {blogCardFooterElem}
      {AdminBlogCardFooterEle}
     
      </Box>
      </>
  );
};
