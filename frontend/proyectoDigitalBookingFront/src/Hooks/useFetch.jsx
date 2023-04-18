import { useState, useEffect } from "react";

function useFetch(path, options = {}) {
  const url = "http://ec2-18-191-208-143.us-east-2.compute.amazonaws.com:8080";
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}${path}`, options);

      setResponseStatus(response.status);

      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else if (response.status === 201) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [path, JSON.stringify(options)]);

  return { data, isLoading, error, responseStatus };
}

export default useFetch;
/*
const { data, isLoading, error } = useFetch("data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
fetchData("POST", { username: "john", password: "secret" });
fetchData("PUT", { id: 1, name: "New Name" });
fetchData("DELETE");
*/
/*Versión previa del useFetch
try {
      const response = await fetch(`${url}${path}`, options);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    */
/*En un futuro cuando tenga la api puedo hacer lo siguiente
   const { data, isLoading, error, responseStatus } = useFetch("/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
  headers: {
    "Content-Type": "application/json"
  }
});

if (error) {
  // Muestra un mensaje de error genérico
}

if (responseStatus === 200) {
  // Guarda el token y establece la variable isLoggedIn en true
} else if (responseStatus !== 201) {
  // Muestra un mensaje de error específico para la respuesta no esperada
}
mode: 'cors',
method: 'GET',
headers: {
    'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
  },
   */
