import { useContext, useState, useEffect } from "react";
import ProductCard from "../component/card";
import AuthContext from "../auth";
import instance from "../axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const HomePage = () => {
  const { auth, setValue, value, token } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const allProduct = async () => {
    const res = await instance.get("/product/getAllProduct");
    console.log(res.data.data);
    setProduct(res.data.data);
  };
  useEffect(() => {
    allProduct();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
        justifyContent: "center",
      }}
    >
      <ProductCard product={product} />
    </div>
  );
};
export default HomePage;
