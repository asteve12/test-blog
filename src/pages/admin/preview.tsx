import { PreviewContainer } from "@/component/admin/Preview/container"
import { WithAuthenticate } from "@/HOC/authenticate"



const Preview = () => {
    


    return (
        
        <div>
            <PreviewContainer></PreviewContainer>
        </div>
    )
}


export default WithAuthenticate(Preview)