import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
console.log(user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/users/data/user",
          { withCredentials: true }
        );
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, loading, user };
};

export default useAuth;
