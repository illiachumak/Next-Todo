export default function useValidateInput(inputValue: string, email: string, password: string){
    if(inputValue.length === 0){
        return "You need to fill all fields!!!"
    } 
    if(email){
        if(!inputValue.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            return "Please enter valid email!"
          } else return ''
    }
    if(password){
        if(!inputValue.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
          )){
            return "Your password must have more than 6 charachters, at least one number & one special character"
          } else return ''
    }
    else return ''
}