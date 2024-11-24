import { Link, useNavigate } from "react-router-dom"
import { GoogleAuth } from "./GoogleAuth/GoogleAuth"
import { Input } from "../components/Input"
import { EmailValidation, NameValidation, PasswordValidation } from "../utils/InputValidations";
import { Alerts, Loader, ToggleShowPassword } from "../components/Alerts";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { supabase } from "../utils/supabase";
import bcrypt from "bcryptjs";
import { UserData } from "../utils/LocaStorage";
import { DBUserData } from "../pages/Userdata/DBUserData";


function Login() {
  const methods = useForm();
  const navigate = useNavigate();
  const [is_hidden, setHidden] = useState(false);
  const [message, setAlertMessage] = useState('');
  const [bg, setAlertBG] = useState('');
  const [is_loader, setLoader] = useState(false);


  const onSubmit = methods.handleSubmit(async loginData => {
    setHidden(true);
    setLoader(true);
    const { data, error } = await supabase
      .from('users')
      .select('email,password,first_name,last_name,user_id')
      .eq('email', loginData.email);

    if (error) {
      setAlertMessage(`${error.message}`)
      setAlertBG('bg-red-500');
    } else {
      if (!data?.length) {
        setAlertMessage(`Email Not Found`)
        setAlertBG('bg-red-500');
        setLoader(false);
      } else {

        const isMatch = await bcrypt.compare(loginData.password, data[0].password);

        if (!isMatch) {
          setAlertMessage(`Incorrect Password`)
          setAlertBG('bg-red-500');
          setLoader(false);
        } else {
          // Successful Login
          setAlertMessage(`Login Successful`)
          setAlertBG('bg-green-500');
          setLoader(false);
          const fetchUserData = async () => {
            await DBUserData(data[0].user_id);
          };
          fetchUserData();
        }
      }

    }
  });



  return (
    <div className="login-card card flex flex-col justify-center gap-y-4 px-5  items-center mt-5 ">
      <div className="title-wrapper ">
        <h1 className="text-white text-3xl md:text-6xl  font-bold " style={{ fontFamily: 'Sixtyfour' }}>DEBEX</h1>
      </div>
      <div className="card border rounded-lg h-auto w-full md:w-2/5 px-6 py-6">
        <div className="card-title text-left text-white flex flex-col gap-y-1 mb-5 ">
          <h1 className="text-3xl font-roboto font-bold">Sign In</h1>
          <p className="text-sm font-roboto">Welcome back! Sign in to track your expenses and debt</p>
        </div>
        <div className={!is_hidden ? "hidden" : ""}>
          <Alerts message={message} bg={bg} />
        </div>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-y-4 relative">
            <Input label="Email Address" type="email" id="email" name="email" placeholder="Type your Email Address" validation={{ required: { value: true, message: 'required', } }} />
            <div className="password-container relative">
              <Input label="Password" type="password" id="password" name="password" placeholder="Type your Password" validation={{ required: { value: true, message: 'required', } }} />
              <ToggleShowPassword />
            </div>
            <div className="loader absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-90px" hidden={!is_loader}>
              <Loader />
            </div>
            <button type="button" hidden={is_loader} onClick={onSubmit} className="text-white bg-red-900 hover:bg-red-500 px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Submit</button>
            <div className="flex justify-center gap-x-2">
              <a href="#" className="text-orange-100 text-sm">Forgot Password?</a>
              <Link to={`../signup`} className="text-sm text-blue-400 underline underline-offset-4" >Sign up</Link>
              {/* <Link to={`../debt`} className="text-sm text-blue-400 underline underline-offset-4" >Dashboard</Link> */}
            </div>
            <GoogleAuth />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
