import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useContext } from "react";
import Rating from "@mui/material/Rating";
import instance from "../axios";
import { Carousel, Descriptions, Tag, Space } from "antd";
import AuthContext from "../auth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ProductPage = () => {
  const params = useLocation();
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);
  const [buyerComment, setBuyerComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [value, setValue] = useState([]);
  const { auth, handleFavourite, Userfavourite } = useContext(AuthContext);
  const productId = params.state.productId;
  //   const productName = params.state.productName;
  //   const { profile, cart, wishlist, onClickWish, onClickCart } =
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getPid = async () => {
      let res = await instance.get("/product/getProductById/" + productId);
      console.log("product data", res.data.data);
      setData(res.data.data);
      setAuthor(res.data.data.author);
    };

    const getChatRec = async () => {
      let res = await instance.get("/comment/getCommentProduct/" + productId);
      console.log("all product comment", res.data.data);
      setBuyerComment(res.data.data);
    };
    getPid();
    getChatRec();
  }, [update]);
  console.log(auth);
  const onClickSendComment = async (product_id, postComment) => {
    if (!auth.userid) {
      console.log("please login");
    } else {
      let res = await instance.post("/comment/addComment", {
        user: auth.userid,
        product: product_id,
        comment: postComment,
      });
      console.log(res.data);
      setUpdate(!update);
      setNewComment("");
    }
  };
  const handleFavButton = (e) => {
    return Userfavourite.some((item) => item.product._id === e);
  };
  console.log(author);
  return (
    <div
      style={{
        marginBottom: "40px",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
      }}
    >
      <div style={{ display: " flex", marginLeft: "100px" }}>
        <div
          style={{
            display: " flex",
            width: "400px",
            height: "500px",
            margin: "100px",
            borderRadius: "5%",
            backgroundColor: "white",
            filter: "drop-shadow(0 0 0.75rem black)",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: "#A7BCD6",
              backgroundImage: `url(${data.art})`,
              backgroundPosition: "center ",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              marginTop: "50px",
            }}
          ></div>
        </div>
        <div>
          <div
            style={{
              width: "700px",
              height: "300px",
              marginTop: "200px",
              marginLeft: "100px",
            }}
          >
            <Descriptions title={data.name} bordered={true}>
              <Descriptions.Item label="Description" span={3}>
                {data.description}
              </Descriptions.Item>
              <Descriptions.Item label="Author" span={3}>
                {author.name}
              </Descriptions.Item>
            </Descriptions>
            <br></br>
          </div>
          {handleFavButton(data._id) ? (
            <Button
              style={{ marginLeft: "100px", width: "230px" }}
              onClick={() => handleFavourite(data._id)}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
              <div style={{ marginLeft: "20px" }}>UnFavourite</div>
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "100px", width: "230px" }}
              onClick={() => handleFavourite(data._id)}
              variant="contained"
            >
              <FavoriteBorderIcon />
              <div style={{ marginLeft: "10px" }}>Add To Favourite</div>
            </Button>
          )}
        </div>
      </div>

      <div
        style={{ marginLeft: "80px", marginTop: "100px", marginLeft: "150px" }}
      >
        <List
          sx={{ width: "100%", maxWidth: "360px", bgcolor: "background.paper" }}
        >
          {buyerComment?.map((itemComment, index) => {
            return (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={itemComment.user[0].username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {itemComment.comment}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>

        <TextField
          style={{ width: "350px", marginLeft: "65px" }}
          label="Comment"
          variant="standard"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                style={{
                  height: "30px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={(e) => onClickSendComment(data._id, newComment)}
              >
                Send
              </Button>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ProductPage;
