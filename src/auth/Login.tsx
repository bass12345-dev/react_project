import { Link } from "react-router-dom"

function Login() {

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
        <form className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="text-white text-md text-left" style={{ fontFamily: 'Varela Round' }} >Email</label>
            <input type="email" id="email" placeholder="Enter your Email" className="bg-gray-50 mx-0 border  border-gray-300 text-gray-900 text-sm   rounded-lg w-full p-2" style={{ fontFamily: 'Varela Round' }} required/>
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="text-white text-md text-left" style={{ fontFamily: 'Varela Round' }} >Password</label>
            <input type="email" id="email" placeholder="Enter your Email" className="bg-gray-50 mx-0 border  border-gray-300 text-gray-900 text-sm   rounded-lg w-full p-2" style={{ fontFamily: 'Varela Round' }} required/>
          </div>
          <button type="submit" className="text-white bg-red-900 hover:bg-red-500 px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">LOGIN</button>
          <div className="flex justify-center gap-x-2">
                    <a href="#" className="text-orange-100 text-sm">Forgot Password?</a>
                    <Link to={`../signup`} className="text-sm text-blue-400 underline underline-offset-4" >Sign up</Link>
                    <Link to={`../`} className="text-sm text-blue-400 underline underline-offset-4" >Dashboard</Link>
          </div>
          <button type="submit" className="text-white  hover:bg-yellow-200 border hover:text-black px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Continue With Google</button>
        </form>
      </div>
    </div>
  )
}

export default Login
