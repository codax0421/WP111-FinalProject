import React, { useState, useEffect, useContext } from "react";
import { notification } from "antd";
import instance from "../axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AuthContext from "../auth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Alert from "@mui/material/Alert";

const steps = ["Choose an art", "fill content", "Submit"];
const AddProductPage = () => {
  const { auth } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("0");
  const [status, setStatus] = useState(0);
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    console.log(title == "");
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, title, description]);

  const changeHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else {
      console.log(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
      setStep("1");
      setIsSelected(true);
    }
  };
  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("files", selectedFile);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("author", auth.userid);
    setStep("2");
    for (const value of formData.values()) {
      console.log(value);
    }

    if (title != "" && description != "" && isSelected === true) {
      const res = await instance.post("/product/addProduct", formData);
      setStep("3");
      console.log(res.data.data);
      setIsSelected(false);
      openNotification();
    } else {
      console.log("no title or description");
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };
  const openNotification = () => {
    notification.open({
      message: "Success",
      description: "successful uploaded",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
    setStep("0");
  };
  return (
    <div
      style={{
        display: "flex ",
        flexWrap: "wrap",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
      }}
    >
      <div style={{ width: "2000px", marginTop: "150px" }}>
        <Box sx={{ width: "100%", marginTop: "70px" }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          marginLeft: "350px",
          height: "400px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "500px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            component="span"
            sx={{ p: 2, border: "1px dashed grey" }}
            style={{
              width: "500px",
              height: "300px",
              textAlign: "center",
            }}
          >
            {isSelected ? (
              <div>
                {selectedFile && (
                  <img
                    style={{
                      width: "500px",
                      height: "300px",
                      backgroundColor: "#A7BCD6",
                      backgroundPosition: "center ",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                    src={preview}
                  />
                )}
              </div>
            ) : (
              <div style={{ marginTop: "100px" }}>
                <UploadFileIcon fontSize="large" />
                <p>Select a file to show details</p>
              </div>
            )}
          </Box>
          <div>
            <Button
              style={{ marginTop: "10px", width: "100px", marginLeft: "200px" }}
              variant="contained"
              component="label"
              onChange={changeHandler}
            >
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            marginLeft: "200px",
            width: "500px",
          }}
        >
          <TextField
            style={{ width: "500px", marginTop: "30px" }}
            required
            id="outlined-required"
            label="Art Title"
            onChange={(e) => handleTitle(e)}
          />
          <TextField
            style={{ width: "500px", marginTop: "30px" }}
            required
            id="outlined-required"
            label="Description"
            onChange={(e) => handleDescription(e)}
          />
          <Button
            style={{ marginTop: "30px" }}
            variant="contained"
            onClick={handleSubmission}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
