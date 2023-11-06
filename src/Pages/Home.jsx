import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Feed from "../components/Feed";
import TopCreators from "../components/TopCreators";


function Home() {
 
  const dispatch = useDispatch()
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  console.log(isAuthenticated);
  useEffect(() => {
    isAuthenticated && dispatch(getUser())
  }, []);
  const user = useSelector((state) => state.user.user)
  const isLoading = useSelector((state) => state.user.isLoading)

  console.log(user);
  
  return (
    <>
  {isLoading ? <Loading/> :
  <main className="flex">
    
    <Feed/>
    <TopCreators/>
  </main>}
    </>
  );
}

export default Home;
