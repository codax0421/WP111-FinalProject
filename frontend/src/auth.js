import { createContext, useEffect, useState } from "react";
import instance from "./axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("non");
  const [auth, setAuth] = useState({});
  const [Userfavourite, setUserFavourite] = useState([]);
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(0);
  const getFavourite = async () => {
    const res = await instance.get("/favourite/userFavourite/" + auth.userid);
    console.log(res.data.data);
    setUserFavourite(res.data.data);
  };

  const handleFavourite = async (e) => {
    try {
      let binary = await Userfavourite.some((item) => item.product._id === e);
      console.log("binary", binary);
      if (binary) {
        let res = await instance.post("/favourite/userDeleteFav", {
          user: auth.userid,
          product: e,
        });
      } else {
        let res = await instance.post("/favourite/addFavourite", {
          user: auth.userid,
          product: e,
        });
      }
      setValue(value + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token === "non") {
      setAuth({});
      setUserFavourite([]);
    } else {
      getFavourite();
    }
  }, [value, token]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        Userfavourite,
        setUserFavourite,
        value,
        setValue,
        token,
        setToken,
        handleFavourite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
