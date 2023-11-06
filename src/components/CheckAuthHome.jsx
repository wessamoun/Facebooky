import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function CheckAuthHome() {
  
      return (
        <div className="flex">
        <SideBar/>
        <Outlet/>
        </div>
      )
    
}

export default CheckAuthHome