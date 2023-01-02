import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ art, favourite }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const onClickProduct = (pid) => {
    console.log("hihi");
    navigate("/product", {
      state: {
        productId: pid,
      },
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          style={{ marginLeft: "400px" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Published" {...a11yProps(0)} />
          <Tab label="Favourite" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImageList sx={{ width: 950, height: 450 }} cols={5} rowHeight={164}>
          {art.map((item, index) => (
            <ImageListItem key={index}>
              <img
                onClick={() => onClickProduct(item._id)}
                src={`${item.art}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.art}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item._id}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageList sx={{ width: 950, height: 450 }} cols={5} rowHeight={164}>
          {favourite.map((item, index) => (
            <ImageListItem key={index}>
              <img
                onClick={() => onClickProduct(item.product._id)}
                src={`${item.product.art}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.product.art}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item._id}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </TabPanel>
    </Box>
  );
};
export default BasicTabs;
