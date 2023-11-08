import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, loggedOutAction } from "../redux/userSlice";
import { logOut } from "../appwrite/api";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    isAuthenticated && dispatch(getUser());
  }, []);
  const user = useSelector((state) => state.user.user);

  async function logout() {
    try {
      const loggedOut = await logOut();
      dispatch(loggedOutAction());
      if (!loggedOut) {
        toast({ title: "Logged Out" });
        navigate("/signin");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-bg flex justify-between items-center w-full h-16 text-white px-6 py-3 fixed top-0 md:hidden">
      <Link
        to="/"
        className="text-white bg-cOne font-bold text-xl p-2 rounded-lg"
      >
        Facebooky
      </Link>
      <div className="flex items-center gap-4">
        <Link to={`/profile/` + user.$id}>
          <div className="profile flex justify-start items-center gap-3">
            <img
              src={user.imageUrl}
              alt="profileImage"
              className="w-9 rounded-full"
            />
          </div>
        </Link>

        <button
          onClick={logout}
          className="flex gap-4 items-center transition-all rounded-lg hover:bg-cOne group"
        >
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            className={`group-hover:invert group-hover:brightness-0 group-hover:transition-all`}
          />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
