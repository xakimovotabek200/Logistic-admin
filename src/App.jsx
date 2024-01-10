import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./layouts/dashboard";
import { SignIn } from "./pages/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (
      storedToken &&
      location.pathname !== "/client-home" &&
      !location.pathname.startsWith("/dashboard")
    ) {
      navigate("/dashboard/home/");
    }

    if (!storedToken && location.pathname !== "/client-home") {
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
