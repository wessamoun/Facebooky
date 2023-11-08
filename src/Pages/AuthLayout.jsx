import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import logImage from "/assets/images/lifestyle-content-creator-concept-1.webp";
import Loading from "../components/Loading";

function AuthLayout() {
  const isLoading = useSelector((state) => state.user.isLoading)
  

  
  return (
    <>
    {isLoading ? <Loading/> :
    <div className="flex h-screen items-center justify-center ">
      <div className="max-h-screen w-full lg:w-1/2 px-6">{<Outlet />}</div>
      <div className="image h-screen hidden lg:flex w-1/2 justify-center items-center">
        <img className="h-screen" src={logImage} alt="logImage" />
      </div>
    </div>}
    </>
  );
}

export default AuthLayout;
