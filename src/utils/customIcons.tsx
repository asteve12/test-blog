import { Icon } from "@chakra-ui/react"
import { IconType } from "react-icons/lib"



type ICustomIcons = {
    Icon: IconType,
    style?:React.CSSProperties
    

}
export const CustomIcons = (props:ICustomIcons) => {
    return(<Icon style={props.style} as={props.Icon}/>)

}