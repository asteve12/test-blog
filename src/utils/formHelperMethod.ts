export function injectErrorMessage(errorObj: any,errorMessage?:any) {
    const array_error_element = document.getElementsByClassName("errorElement")
    const ErrrorBox =  document.getElementById("errorElement") as HTMLElement
    const doesErrorElementExist = array_error_element.length > 0;
    const array_of_formFields = Object.keys(errorObj);

  if (doesErrorElementExist) Array.from(array_error_element)?.forEach((errorElement) => {
        errorElement.remove();  
    })

    
    array_of_formFields.forEach((eachFormField,index) => {
        const selectedFormFields = document.querySelector(`[data-formName=${eachFormField}]`)
        const atarray_of_formFieldsEnd = array_of_formFields.length-1 === index;
        if (selectedFormFields) {
            const errorElement = document.createElement("p")
            if (errorMessage) {
                errorElement.textContent = errorMessage
            }
            else {
                errorElement.textContent = "required"
            }

            if (atarray_of_formFieldsEnd &&  !errorMessage) {
                const selectedFormFields = document.querySelector(`[data-formName=error-indicator]`) 
                const errorElement = document.createElement("p")
                errorElement.textContent = "an error occurred above"
                errorElement.className = "errorElement"
                errorElement.style.color = "red";
                errorElement.style.marginTop = "10px";
                selectedFormFields!.insertAdjacentElement("beforebegin",errorElement)
                
            }
           
            errorElement.className = "errorElement"
            errorElement.style.color = "red";
            errorElement.style.marginTop = "0px";
            //@ts-ignore
            errorMessage ? ErrrorBox.innerHTML = errorElement: selectedFormFields.insertAdjacentElement("afterend",errorElement)      
        }
      

        
    })
    

    

}



//validate form input
export function validateForm<formType>(values: formType,currentLanguage?: string, languageArray?: string[],) {
    const errors:{[key:string]:string}|null = {}
    //@ts-ignore
    const arrayofFormFields = Object.entries(values)
    arrayofFormFields.forEach((eachFormField) => {
       const fieldName = eachFormField[0];
        const fieldValue = eachFormField[1] 
        if (fieldName === "featured") return;
       
        const isFieldValueNotDefined = !fieldValue;
        if(isFieldValueNotDefined)  errors[fieldName] = "required"
    })
   

    const isAllFieldFilled = Object.keys(errors).length === 0
    if (isAllFieldFilled) {
        
    }

   
    injectErrorMessage(errors)

    return errors;
    
    
    
}