
import { api } from "@/axios"
import { Main } from "@/component/admin/addArticle/main"
import { WithAuthenticate } from "@/HOC/authenticate"
import { Layout } from "@/layout"
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"







const AddArticle = (props: any) => {
    const Router = useRouter()
    const loginUser  = props?.user?.singleUserData
     let profilePics = loginUser?.authorImage?.url as string
     profilePics = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${profilePics}`
    const name = loginUser?.username as string
    const FeaturedId = props.featuredArticleId



    



    return (
        <Layout  draft={[]} showSideBar={true} showHeader={false} showLoginHeader={true}  >
            <Box w="100%" bg="#fbfbfd">
                <Main  featuredArticleId={FeaturedId} profilePics={profilePics} username={name}/> 
            </Box>
           
        </Layout>
    )
 }


export default WithAuthenticate(AddArticle)
 

export const getServerSideProps = async ({ locale }: any) => {
    // const paginationStart = 0;
    // const paginationLimit = 3;
    const featuredArticle = await api.get(`/api/articles?locale=${locale}&populate=*&filters[featured][$eq]=Yes`)
    const featuredArticleId = featuredArticle.data.data[0]?.id;
    // const [articles, draft, allArticles] = await Promise.all([
    //   api.get(`/api/articles?locale=${locale}&populate=*&pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&locale=${locale}`),
    //   api.get(`api/drafts`),
    //   api.get(`/api/articles?locale=${locale}&populate=*`)
    // ]);
  
    return {
      props: {
        //draft:draft.data,
        //allArticles: allArticles.data,
        featuredArticleId:featuredArticleId ? featuredArticleId:"",
        //homeSEO: homeSEO?.data,
       // ...(await serverSideTranslations(locale, ['common']))
      },
      //revalidate: 1
    };
  };