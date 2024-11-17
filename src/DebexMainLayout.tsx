import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
function DebexMainLayout() {

  const navigate = useNavigate()
  const gotToNewPage = () => {
    navigate("/login");
  }

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="sm:px-28 px-5">
        {/* Navigation Bar */}
        <nav className="py-2 mt-3 flex items-center justify-between border-b border-white-500" >
          <a href="#" className="text-white text-2xl md:text-4xl  font-bold" style={{ fontFamily: 'Sixtyfour' }} >DEBEX</a>
          {/* Desktop Menu */}
          <div className="desktop-menu hidden md:block">
            <div className="flex  flex-row   justify-between items-center  ">
              <div className="menu-items flex flex-row gap-x-7">
                <Link to="/debt" className=" font-bold text-red-500 text-lg  underline underline-offset-8 " >Debt</Link>
                <Link to="/expenses" className="font-varela font-bold text-white hover:text-red-700 text-lg" >Expenses</Link>

                <a href="./purchase.html" className="font-varela font-bold text-white hover:text-red-700 text-lg ">To
                  Purchase</a>
                <a href="./pay_to.html" className="font-varela font-bold text-white hover:text-red-700 text-lg ">Pay to Records</a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={!isNavOpen ? "hidden" : "block"}>
          <div className="mobile-menu absolute top-0 bottom-0 right-0 z-20 md:hidden w-1/2 h-full bg-red-200 flex flex-column justify-center  items-start  ">
              <ul className="flex flex-col gap-y-2 mt-10">
                  <li>
                  <button onClick={() => setIsNavOpen(false)}
                      className="inline-flex items-center text-white   bg-red-800 hover:bg-red-500 px-9 py-1  rounded-full">Close</button>
                  </li>
                  <li>
                  <button onClick={() => gotToNewPage()}
                      className="inline-flex items-center text-white   bg-red-800 hover:bg-red-500 px-9 py-1  rounded-full">Logout</button>
                  </li>
              </ul>
          </div>
        </div>


          <button onClick={() => gotToNewPage()}
            className="md:block hidden inline-flex items-center text-white   bg-red-800 hover:bg-red-500 px-9 py-1  rounded-full">Logout</button>

       
          <div className="flex flex-row justify-between items-center md:hidden ">
            <div className="menu-items flex flex-row gap-x-7">
              <button data-collapse-toggle="navbar-cta"  onClick={() => setIsNavOpen(true)}  type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg  hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:text-white dark:hover:bg-red-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          </div>
        
        </nav>
        {/* User Welcome */}
        <div className="flex gap-x-3 justify-center align-center sm:flex-row flex-wrap mt-5">
          <div className="block w-full  px-4 py-2 text-right">
            <p className="font-normal text-1xl text-white dark:text-gray-300">Welcome! Basil John</p>
          </div>
        </div>
        <Outlet />
      </div>

    </>
  )
}

export default DebexMainLayout
