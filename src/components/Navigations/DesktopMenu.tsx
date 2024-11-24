import { Link } from "react-router-dom"
import { menu } from "../../utils/Menus"



export const DesktopMenu = ({location_path}:{location_path:any}) => {
    


    return (
        <div className="desktop-menu hidden md:block">
            <div className="flex  flex-row   justify-between items-center  ">
                <div className="menu-items flex flex-row gap-x-7">

                    {
                        menu.map((menu, index) => (
                            // className={menu.classname}
                            <Link key={index} to={menu.path}  className={menu.classname+`nav-link ${location_path.pathname === menu.path ? "text-red-500  underline underline-offset-8" : "text-white"}`} >{menu.name}</Link>
                        ))
                    }
                </div>
            </div>
        </div>

    )

}
