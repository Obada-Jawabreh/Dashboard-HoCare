import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5002/api/users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return { handleLogout };
};
