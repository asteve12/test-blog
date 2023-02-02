import { useRouter } from "next/router"
import {useTranslation}  from  "next-i18next"
import { Option } from "react-dropdown"




export const useNavHeaderLogic = () => {
    const Router = useRouter()
    const { t } = useTranslation()
    const languageOption = [{ label: 'en', value: "en" },
    { label: 'fr', value: "fr-BJ" }]
     

//handle switching of language
    const changeLanguage = (newLang: Option) => {
     console.log("router",Router)
     Router.push(`/${Router.asPath}`, `/${Router.asPath}`, { locale: newLang.value })
    //   Router.reload()   
}
    


    return {
        changeLanguage,
        currentLanguage: Router?.locale,
        t,
        languageOption,
        

    }
}