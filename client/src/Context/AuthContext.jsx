import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("_authToken") || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const loginAction = async (input) => {
    try {
      const data = await axios.post(`${window.SERVER_URL}/api/v1/login`, input);

      const result = data.data;
      if (result.statusCode === 200) {
        setToken(result.data.token);
        setUser(result.data.user);
        localStorage.setItem("_authToken", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        if (result.data.user.role == "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
        return;
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.data.errors) {
        toast.error(error.response.data.errors[0].msg, {
          position: "top-center",
          closeButton: false,
        });
      }

      toast.error(error.response.data.message, {
        position: "top-center",
        closeButton: false,
      });
    }
  };

  const logOut = async () => {
    localStorage.removeItem("_authToken");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);    
    navigate("/", { replace: true });
  };
  return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
