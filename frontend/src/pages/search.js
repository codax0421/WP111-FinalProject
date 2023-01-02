import { useLocation } from "react-router-dom";
import ProductCard from "../component/card";
import instance from "../axios";
import AuthContext from "../auth";
import { useEffect, useState, useContext } from "react";
const SearchPage = () => {
  const { setValue, value } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();
  const getSearch = async () => {
    let res = await instance.get(
      "http://localhost:80/api/product/search?search=" + location.state.search
    );
    console.log(res.data.data);
    setData(res.data.data);
  };
  useEffect(() => {
    getSearch();
  }, [value]);
  console.log(location.state);
  return (
    <div
      style={{
        display: "flex ",
        flexWrap: "wrap",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
      }}
    >
      <ProductCard product={data} />
    </div>
  );
};

export default SearchPage;
