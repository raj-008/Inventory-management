import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";

const useFetchData = (url, method = "Post", body = null, refreshKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);

        const isFormData = body instanceof FormData;

        const config = {
          method: method,
          url: url,
          data: body,
          headers: {
            "Content-type": isFormData ? "multipart/form-data" : "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(true);
        errorToaster(error.response.data.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, method, body, refreshKey]);

  return [data, error, loading];
};

export default useFetchData;
