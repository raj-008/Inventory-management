import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const useFetchData = (url, refreshKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  },[refreshKey]);

  return [data, error, loading];
};

export default useFetchData;
