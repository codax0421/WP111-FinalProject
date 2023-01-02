import { React, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import instance from "../axios";
import AuthContext from "../auth";
import BasicTabs from "../component/tab";

const UserPage = () => {
  const { auth, Userfavourite } = useContext(AuthContext);
  const [art, setArt] = useState([]);
  const [valueTab, setValueTab] = useState(0);
  const [update, setUpdate] = useState(false);
  const getUserArt = async () => {
    let res = await instance.get(
      "http://localhost:80/api/product/getProductByUser/" + auth.userid
    );
    setArt(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    getUserArt();
  }, [update]);

  return (
    <div
      style={{
        display: "flex ",
        flexWrap: "wrap",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
      }}
    >
      <div
        style={{
          filter: "drop-shadow(0 0 0.75rem black)",
          display: "flex",
          flexWrap: "wrap",
          width: "1400px",
          marginLeft: "250px",
          background: "white",
          height: "100vh",
        }}
      >
        <div
          style={{
            marginTop: "50px",

            width: "1000px",
          }}
        >
          <div style={{ fontSize: "120px", marginLeft: "200px" }}>
            {auth.username}
          </div>
          <div style={{ fontSize: "30px", marginLeft: "200px" }}>
            {auth.userMail}
          </div>
        </div>
        <div style={{ marginLeft: "200px" }}>
          <BasicTabs art={art} favourite={Userfavourite} />
        </div>
      </div>
    </div>
  );
};
export default UserPage;
