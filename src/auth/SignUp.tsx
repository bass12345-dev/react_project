import { Link } from "react-router-dom"
import { Input } from "../components/Input"
import { FormProvider, useForm } from "react-hook-form";
import { EmailValidation, NameValidation, PasswordValidation } from "../utils/InputValidations";
import { supabase } from './../utils/supabase'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alerts, Loader, ToggleShowPassword } from "../components/Alerts";
import { use } from "framer-motion/client";
import bcrypt from "bcryptjs";
import { GoogleAuth } from "./GoogleAuth/GoogleAuth"
import emailjs from '@emailjs/browser'
function Signup() {

  const methods = useForm();

  const [message, setAlertMessage] = useState('');
  const [bg, setAlertBG] = useState('');
  const [hidden, setHidden] = useState(true);
  const [is_disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);




  const onSubmit = methods.handleSubmit(async data1 => {
    // Show Alert
    setHidden(false);
    setDisabled(true);
    
    if (data1.password != data1.confirm_password) {
      setAlertMessage('Password Don\'t Match');
      setAlertBG('bg-red-500');
      setDisabled(false);
    } else {

      const salt = await bcrypt.genSalt(10); // Resolve the promise
      const hashedPassword = await bcrypt.hash(data1.password, salt);

      // USER DATA
      const UserInfo = {
        first_name: data1.first_name,
        last_name: data1.last_name,
        email: data1.email,
        password: hashedPassword,
      }
        // Check if email already exists
        const { data,error } = await supabase
        .from('users')
        .select()
        .eq('email', UserInfo.email);
        
        if(!data?.length){
            const { error } = await supabase
            .from('users')
            .insert([UserInfo]);
              if (error) {
                setAlertMessage(`${error.message}`)
                setAlertBG('bg-red-500');
              } else {
                const EmailParams = { subject: 'Email Verification',message: ' <a href="https://yourverificationlink.com" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; font-size: 16px; border-radius: 4px;">Verify Email</a>',
                  to_name: UserInfo.first_name,
                };
                var email_message = '';
                emailjs.send('service_avqi5jg', 'template_fyn245d', EmailParams,'9hzUIqFTPTWKOWgq_').then(
                  (response) => {
                    if(response.status == 200) {
                      email_message = 'Email has sent to you please verify your email.';
                    }
                    console.log('SUCCESS!', response.status, response.text);
                  },
                  (error) => {
                    if(error){
                      email_message = '';
                    }
                    
                  },
                );

                setAlertMessage(`Account Created Successfully... ${email_message}`)
                setAlertBG('bg-green-500');
                methods.reset();
                
              }
        }else{
          setAlertMessage(`Email is used already`)
          setAlertBG('bg-red-500')
          
        }
        setDisabled(false);
    }



  })

  return (
    <div className="login-card card flex flex-col justify-center gap-y-4 px-5  items-center mt-10 ">
      <div className="title-wrapper ">
        <h1 className="text-white text-3xl md:text-6xl  font-bold " style={{ fontFamily: 'Sixtyfour' }}>DEBEX</h1>
      </div>
      <div className="card border rounded-lg h-auto w-full md:w-1/2  px-6 py-6">
        <div className="card-title text-left text-white flex flex-col gap-y-1 mb-5 ">
          <h1 className="text-3xl font-varela font-bold">Sign Up</h1>
          <p className="text-sm font-varela">Welcome back! Sign Up to track your expenses and debt</p>
        </div>
        <div className={hidden ? "hidden" : ""}>
          <Alerts message={message} bg={bg} />
        </div>

        <FormProvider {...methods}>
          <form className="flex flex-col gap-y-4" id="signup-form" onSubmit={e => e.preventDefault()}>
            <Input label="First Name" type="text" id="first_name" name="first_name" placeholder="Type your First Name" validation={{ ...NameValidation }} />
            <Input label="Last Name" type="text" id="last_name" name="last_name" placeholder="Type your Last Name" validation={{ ...NameValidation }} />
            <Input label="Email Address" type="email" id="email" name="email" placeholder="Type your Email Address" validation={{ ...EmailValidation }} />
            <div className="password-container relative">
              <Input label="Password" type="password" id="password" name="password" placeholder="Type your Password" validation={{ ...PasswordValidation }} />
              <ToggleShowPassword />
            </div>
            <Input label="Confirm your Password" type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" validation={{ ...PasswordValidation }} />
            <div className="loader" hidden={!is_disabled}>
                <Loader/>
            </div>
            <button type="button" hidden={is_disabled} onClick={onSubmit} className="text-white bg-red-900 hover:bg-red-500 px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Submit</button>
            <div className="flex justify-center gap-x-2">
              <Link to={`../login`} className="text-sm text-blue-400 underline underline-offset-4" >Back to Login</Link>
            </div>
            <GoogleAuth/>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
export default Signup
