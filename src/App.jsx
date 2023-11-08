import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./Pages/Home";
import AuthLayout from "./Pages/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "./components/CheckAuth";
import People from "./Pages/People";
import SavedPosts from "./Pages/SavedPosts";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import RootLayout from "./components/RootLayout";

function App() {
  return (
    <>
      {<CheckAuth />}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/editProfile/:userId" element={<EditProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
