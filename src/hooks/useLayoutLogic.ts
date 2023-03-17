import { injectErrorMessage } from "@/utils/formHelperMethod"
import axios, { Axios } from "axios"
import React, { HTMLInputTypeAttribute, useState } from "react"




export const userLayoutLogic = () => {
    const [subscribeValue, setSUbScribeValue] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState<"SUBMITTING" | "SUCCESS" | "FAILURE">()
    const [errorMsg,setErrorMsg] = useState<string | undefined>()
    const [showSubscribeModal,setShowSubscribeModal] = useState<true | false >(false)
    const [isFormFilled,setisFormFilled] = useState<true | false>()  



    function handleSubscribeBxChange(e: React.ChangeEvent) {
        const inputElemnent = e.target as HTMLInputElement
        setSUbScribeValue(inputElemnent.value)
        setisFormFilled(true)
}
    
    
    function handleSubsribeRequest(e: React.MouseEvent) {
        setIsSubmitting("SUBMITTING")
        const inputField = e.target as HTMLInputElement
        

                axios.post(`${process.env.NEXT_PUBLIC_SUBCRIBE_URL}`, {
            email:subscribeValue
        })
            .then(response => {
                setIsSubmitting("SUCCESS")
                setTimeout(() => {
                    setIsSubmitting(undefined)
                }, 3000);
                setShowSubscribeModal(true)
            
            }).catch((e) => {

                console.log("errorMsg",e.response.data.message)
                //setShowSubscribeModal(true)
                setIsSubmitting("FAILURE")
                setTimeout(() => {
                    setErrorMsg(undefined)
                  }, 3000);
                setErrorMsg(e.response.data.message)
                //injectErrorMessage({"subscribe":""},e.response.data.message)
                
            })
        

    }


    const closeSubscribeModal = () =>  setShowSubscribeModal(false)


    return {
        handleSubscribeBxChange,
        handleSubsribeRequest,
        subscribeValue,
        isSubmitting,
        errorMsg,
        showSubscribeModal,
        closeSubscribeModal,
        isFormFilled
    
}




}