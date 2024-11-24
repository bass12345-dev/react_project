import { Link } from "react-router-dom"
import { menu } from "../../utils/Menus"
import { LogoutButton } from "../Layout/LogoutButton"

//<!----- Mobile Menu-------!>
export const MobileMenu = ({ toggleNav, isNavOpen, logOut, location_path }: { toggleNav: any, isNavOpen: any, logOut: any, location_path: any }) => {



  return (
    <div className={!isNavOpen ? "hidden" : "block"}>
      <div className="mobile-menu absolute top-0 bottom-0 right-0 z-20 md:hidden w-1/2 h-full bg-gray-700 flex flex-column justify-center  items-start  ">
        <button onClick={toggleNav} >
          <svg className="w-8 h-8 text-red-800 dark:text-white absolute right-4 top-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </button>
        <ul className="flex flex-col gap-4 mt-10 flex-wrap items-center justify-center dark:text-white">
          {
            menu.map((menu, index) => (
              <li key={index}><Link to={menu.path} className={menu.classname + `nav-link ${location_path.pathname === menu.path ? "text-red-500  underline underline-offset-8" : "text-white"}`} >{menu.name}</Link></li>
            ))
          }
          <li className="mt-6">
            <button onClick={logOut}
              className="inline-flex items-center text-white   bg-red-800 hover:bg-red-500 px-9 py-1  rounded-full">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )

}

//<!----- Open Mobile Menu-------!>
export const ToggleIcon = ({ toggleNav }: { toggleNav: any }) => {

  return (
    <div className="flex flex-row justify-between items-center md:hidden ">
      <div className="menu-items flex flex-row gap-x-7">
        <button data-collapse-toggle="navbar-cta" onClick={toggleNav} type="button"
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
  )

}