import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";
import { color } from "@mui/system";
import instance from "../axios";
import AuthContext from "../auth";

const ProductCard = ({ product }) => {
  const { auth, handleFavourite, Userfavourite } = useContext(AuthContext);
  const navigate = useNavigate();
  const onClickProduct = (pid) => {
    navigate("/product", {
      state: {
        productId: pid,
      },
    });
  };

  const handleColour = (e) => {
    return Userfavourite.some((item) => item.product._id === e);
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "150px",
        flexWrap: "wrap",
        width: "1350px",
        borderRadius: "3%",
        backgroundColor: "whitesmoke",
      }}
    >
      {product?.map((result, index) => {
        return (
          <Card
            key={index}
            sx={{
              width: "300px",
              marginLeft: "30px",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <CardMedia
              onClick={() => onClickProduct(result._id)}
              sx={{ height: 200 }}
              image={result.art}
            />
            <CardContent style={{ height: "20px" }}>
              <div style={{ display: "flex" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ width: "200px", overflow: "hidden" }}
                >
                  {result.name}
                </Typography>
                <FavoriteBorderIcon
                  style={{ marginLeft: "50px" }}
                  color={handleColour(result._id) ? "error" : "red"}
                  onClick={() => handleFavourite(result._id)}
                ></FavoriteBorderIcon>
              </div>
              {/* <Typography variant="body2" color="text.secondary">
                {result.description}
              </Typography> */}
            </CardContent>
            {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        );
      })}
    </div>
  );
};
export default ProductCard;
