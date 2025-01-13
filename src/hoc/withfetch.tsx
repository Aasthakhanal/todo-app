import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const withFetch = (WrappedComponent: any, URL: string) => {
  return (props: any) => {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const handleAPICall = async () => {
      try {
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setData(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <WrappedComponent {...props} data={data} handleTodoFetch={handleAPICall} />
    )
  }
}

export {withFetch};