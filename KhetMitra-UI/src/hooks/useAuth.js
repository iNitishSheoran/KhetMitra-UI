import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, []);

  const checkAuthAndUser = useCallback(async () => {
    setLoading(true); // ✅ keep loader until everything is ready
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`, { withCredentials: true });
      const auth = res.data?.authenticated === true;
      setIsAuthenticated(auth);

      if (auth) {
        await fetchUser(); // ✅ wait for user fetch
      } else {
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false); // ✅ only now hide loader
    }
  }, [fetchUser]);

  useEffect(() => {
    checkAuthAndUser();
  }, [checkAuthAndUser]);

  return { isAuthenticated, loading, user, refreshUser: fetchUser, refreshAuth: checkAuthAndUser };
}
