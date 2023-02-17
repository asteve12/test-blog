export function injectErrorMessage(errorObj: any,errorMessage?:any) {
    const array_error_element = document.getElementsByClassName("errorElement")
    const doesErrorElementExist = array_error_element.length > 0;
    const array_of_formFields = Object.keys(errorObj);

  if (doesErrorElementExist) Array.from(array_error_element)?.forEach((errorElement) => {
        errorElement.remove();  
    })

    
    array_of_formFields.forEach((eachFormField) => {
        const selectedFormFields = document.querySelector(`[data-formName=${eachFormField}]`)
        if (selectedFormFields) {
            const errorElement = document.createElement("p")
            if (errorMessage) {
                errorElement.textContent = errorMessage
            }
            else {
                errorElement.textContent = "required"
            }
           
            errorElement.className = "errorElement"
            errorElement.style.color = "red";
            selectedFormFields.insertAdjacentElement("afterend",errorElement)      
        }
      

        
    })
    

    

}



//validate form input
export function validateForm<formType>(values: formType,
    currentLanguage: string, languageArray: string[],) {
    const errors:{[key:string]:string} = {}
    
    const arrayofFormFields = Object.entries(values)
    arrayofFormFields.forEach((eachFormField) => {
        const fieldName = eachFormField[0] ;
        const fieldValue = eachFormField[1] 
        const isFieldValueNotDefined = !fieldValue;
        if(isFieldValueNotDefined)  errors[fieldName] = "required"
    })
   

    const isAllFieldFilled = Object.keys(errors).length === 0
    if (isAllFieldFilled) {
        
    }

   
    injectErrorMessage(errors)

    return errors;
    
    
    
}