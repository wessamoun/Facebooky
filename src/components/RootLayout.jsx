import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import TopBar from "./TopBar"
import BottomBar from "./BottomBar"

function RootLayout() {
  
      return (
        <div className="flex">
        <SideBar/>
        <TopBar/>
        <BottomBar/>
        <Outlet/>
        </div>
      )
    
}

export default RootLayout