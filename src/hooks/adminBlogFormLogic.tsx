import { validateForm } from "@/utils/formHelperMethod"
import { AlertTitle } from "@chakra-ui/react"
import { useFormik } from "formik"
import { getProviders, getSession, signIn } from "next-auth/react"

type formType = {
    email: string,
    password:string
}


export const useAdminBlogFormLogic = () => {
    
    

   const  formikObject =  useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validate:(value)=> validateForm<typeof value>(value),
        onSubmit: handleAdminAuth
   })
    //handle form suibmit
    function handleAdminAuth  (values: formType) {
        alert("admin signup successfully");
        signIn("credentials", {
            email: values.email, password: values.password,
        })
        
    }

  
    
    
    

    return {
        onSubmit: formikObject.handleSubmit,
        onChangeHandler: formikObject.handleChange,
        onBlur: formikObject.handleBlur,
       formikObject,
    }

}