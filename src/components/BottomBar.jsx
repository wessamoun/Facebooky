import { useDispatch, useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "./linksArray";
import { getUser } from "../redux/userSlice";
import { useEffect } from "react";


function BottomBar() {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  useEffect(() => {
    isAuthenticated && dispatch(getUser())
  }, []);

  
  return (
    
    <div className="bg-bg flex justify-between items-center w-full h-16 text-white px-4 py-3 fixed bottom-0 md:hidden">
      
      <ul className="flex justify-between gap-0 w-full">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`group transition-all rounded-lg hover:bg-cOne ${
                  isActive && "!bg-cOne scale-125"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex justify-between gap-1 flex-col items-center p-1 ">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert group-hover:brightness-0 group-hover:transition-all ${
                      isActive && "invert brightness-0 transition-all"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        
    </div>
  )
}

export default BottomBar