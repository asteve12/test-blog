import { injectErrorMessage } from "@/utils/formHelperMethod"
import axios, { Axios } from "axios"
import React, { HTMLInputTypeAttribute, useState } from "react"




export const userLayoutLogic = () => {
    const [subscribeValue, setSUbScribeValue] = useState<string>()
    const [isSubmitting, setIsSubmitting] = useState<"SUBMITTING" | "SUCCESS" | "FAILURE">()
    const [errorMsg,setErrorMsg] = useState<string | undefined>()

      
function handleSubscribeBxChange(e: React.ChangeEvent) {
        const inputElemnent = e.target as HTMLInputElement
        setSUbScribeValue(inputElemnent.value )
        
      
}
    
    
    function handleSubsribeRequest(e: React.MouseEvent) {
        setIsSubmitting("SUBMITTING")
        axios.post(`${process.env.NEXT_PUBLIC_SUBCRIBE_URL}`)
            .then(response => {
                setIsSubmitting("SUCCESS")
                setTimeout(() => {
                    setIsSubmitting(undefined)
                  }, 3000);
            
            }).catch((e) => {

                console.log("errorMsg",e.response.data.message)

                setIsSubmitting("FAILURE")
                setTimeout(() => {
                    setErrorMsg(undefined)
                  }, 3000);
                setErrorMsg(e.response.data.message)
                //injectErrorMessage({"subscribe":""},e.response.data.message)
                
            })
        

    }


    return {
        handleSubscribeBxChange,
        handleSubsribeRequest,
        subscribeValue,
        isSubmitting,
        errorMsg
    
}




}