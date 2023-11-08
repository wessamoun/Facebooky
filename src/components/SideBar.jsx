import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "./linksArray";
import { getUser, loggedOutAction } from "../redux/userSlice";
import { logOut } from "../appwrite/api";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";


function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  useEffect(() => {
    isAuthenticated && dispatch(getUser())
  }, []);
  const user = useSelector((state) => state.user.user)

  async function logout() {
    try {
      const loggedOut = await logOut();
      dispatch(loggedOutAction())
      if (!loggedOut) {
        toast({ title: "Logged Out" });
        navigate("/signin")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    
    <aside className='bg-bg text-white h-screen p-6 hidden md:block'>
      <Link to='/' className="text-white bg-cOne font-bold text-3xl p-3 mb-4 rounded-lg">
        Facebooky
      </Link>
      <Link to={`/profile/` + user.$id}>
      <div className="profile mt-8 flex justify-start items-center gap-3">
        <img src={user.imageUrl} alt="profileImage"  className="w-14 rounded-full"/>
        <div className="info">
          <div className="name font-semibold">{user.name}</div>
          <div className="username text-sm text-cOne">{"@" + user.username}</div>
        </div>
      </div>
      </Link>
      <ul className="flex flex-col gap-6 mt-9">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`group transition-all rounded-lg hover:bg-cOne ${
                  isActive && "!bg-cOne"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 ">
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
        <button onClick={logout} className="flex mt-16 gap-4 items-center p-4 transition-all rounded-lg hover:bg-cOne w-full group"><img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    className={`group-hover:invert group-hover:brightness-0 group-hover:transition-all`} 
                      
                    
                  />
                  Logout</button>
    </aside>
  )
}

export default SideBar