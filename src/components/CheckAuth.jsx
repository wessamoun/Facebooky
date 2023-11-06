import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckAuth() {
  const navigate = useNavigate();
  const pathName = useLocation();
  const cookieFallback = localStorage.getItem("cookieFallback");
  useEffect(() => {
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/signin");
    } else if (pathName === "isgnin" || pathName === "signup") {
      navigate("/");
    }
  }, [cookieFallback]);
}

export default CheckAuth;
