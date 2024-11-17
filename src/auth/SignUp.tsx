import { Link } from "react-router-dom"
import { Input } from "../components/Input"
import { FormProvider, useForm } from "react-hook-form";
import { EmailValidation, NameValidation, PasswordValidation } from "../utils/InputValidations";
import { supabase } from './../utils/supabase'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alerts } from "../components/Alerts";

function Signup() {

  const methods = useForm();
  const name_validation = NameValidation;
  const email_validation = EmailValidation;
  const password_validation = PasswordValidation;

  const [message, setAlertMessage] = useState('');
  const [bg, setAlertBG] = useState('');
  const [hidden, setHidden] = useState(true);

  const onSubmit = methods.handleSubmit(async data => {
    setHidden(false)
    if (data.password != data.confirm_password){
      setAlertMessage('Password Do Not Match');
      setAlertBG('bg-red-500');
      
    }else{

      const UserInfo = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      }

      const { error } = await supabase
        .from('users')
        .insert([UserInfo]);
      if (error) {
        alert(`Error: ${error.message}`);
        setAlertMessage(`${error.message}`)
        setAlertBG('bg-red-500')
      } else {
        setAlertMessage(`User Created Successfully`)
        setAlertBG('bg-green-500')
      }

    }



  })

  return (
    <div className="login-card card flex flex-col justify-center gap-y-4 px-5  items-center mt-5 ">
      <div className="title-wrapper ">
        <h1 className="text-white text-3xl md:text-6xl  font-bold " style={{ fontFamily: 'Sixtyfour' }}>DEBEX</h1>
      </div>
      <div className="card border rounded-lg h-auto w-full md:w-1/2  px-6 py-6">
        <div className="card-title text-left text-white flex flex-col gap-y-1 mb-5 ">
          <h1 className="text-3xl font-varela font-bold">Sign Up</h1>
          <p className="text-sm font-varela">Welcome back! Sign in to track your expenses and debt</p>
        </div>
      <div className={hidden? "hidden" : ""}>
        <Alerts message={message} />
      </div>
        
        <FormProvider {...methods}>
          <form className="flex flex-col gap-y-4" onSubmit={e => e.preventDefault()}>
            <Input label="First Name" type="text" id="first_name" name="first_name" placeholder="Type your First Name" validation={{ ...name_validation }} />
            <Input label="Last Name" type="text" id="last_name" name="last_name" placeholder="Type your Last Name" validation={{ ...name_validation }} />
            <Input label="Email Address" type="email" id="email" name="email" placeholder="Type your Email Address" validation={{ ...email_validation }} />
            <Input label="Password" type="password" id="password" name="password" placeholder="Type your Password" validation={{ password_validation }} />
            <Input label="Confirm your Password" type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" validation={{ ...password_validation }} />

            <button type="button" onClick={onSubmit} className="text-white bg-red-900 hover:bg-red-500 px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Submit</button>
            <div className="flex justify-center gap-x-2">
              <Link to={`../login`} className="text-sm text-blue-400 underline underline-offset-4" >Back to Login</Link>
            </div>
            <button type="button" className="text-white  hover:bg-yellow-200 border hover:text-black px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Continue With Google</button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
export default Signup
