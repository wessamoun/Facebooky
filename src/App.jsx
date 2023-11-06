import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./Pages/Home";
import AuthLayout from "./Pages/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "./components/CheckAuth";
import CheckAuthHome from "./components/CheckAuthHome";
import People from "./Pages/People";
import SavedPosts from "./Pages/SavedPosts";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      {<CheckAuth />}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<CheckAuthHome />}>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile">
            <Route path=":userId" element={<Profile/>}/>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
