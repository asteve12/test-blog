import { Box, Text, VStack } from "@chakra-ui/react"
import { CustomIcons } from "../../util/customIcon"
//icons
import { GrFacebookOption } from "react-icons/gr"
import { GrTwitter } from "react-icons/gr"
import { AiFillLinkedin } from "react-icons/ai"
import { RiWhatsappFill } from "react-icons/ri"



export const Socials = () => {
    const socials = [{
        name: "facebook",
        icons:GrFacebookOption
    },
    {
        name: "twitter",
        icons:GrTwitter
        },
        {
            name: "linkedIn",
            icons:AiFillLinkedin
        },
        {
            name: "whatsapp",
            icons:RiWhatsappFill
        }


        
    ]


    return (
        <VStack pl="5%" pt="30px"  gap="10px">
        <Text color="#666481" fontWeight="700"  fontSize="20px">
            Share
            </Text>
            {
                socials.map((eachIcons) => <CustomIcons
                    style={{
                        color: "#666481",
                        fontSize:"25px"
                    }}
                    Icon={eachIcons.icons} ></CustomIcons>)
            }
    </VStack>
    )
}