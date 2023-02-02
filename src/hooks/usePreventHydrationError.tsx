import { useEffect, useState } from "react"




export const usePreventHydrationError = () => {
    const [initialise, setInitilise] = useState(false)
    useEffect(() => {
        setInitilise(true)

    }, [])
   
    return {
        initialise
}
    


}