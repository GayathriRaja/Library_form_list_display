import React, { useState, useEffect } from "react";
import {
  FormLabel,
  FormControl,
  TextField,
  FormGroup,
  Menu,
  MenuItem,
  Select,
  Button,
  InputLabel,
} from "@material-ui/core";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import db, { auth, firebaseApp, storage } from "../../FirebaseConfig/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "./inputFormList.css";

function InputFormList() {
  const [issueDate, setIssueDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();

  const [listValue, setListValue] = useState({
    title: "",
    status: "",
  });

  const handleIssueDate = (date) => {
    setIssueDate(date);
  };

  const handleReturnDate = (date) => {
    // if (issueDate > date) {
    setReturnDate(date);
    // }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setListValue({ ...listValue, [name]: value });
  };

  const clickhandler = (e) => {
    // e.preventDefault();
    // alert(listValue.title);
    // alert(listValue.status);
    // if (issueDate < returnDate) {

    if (listValue.title && image && issueDate < returnDate) {
      db.collection("list")
        .doc(listValue.title)
        .set({
          title: listValue.title,
          status: listValue.status,
          issueDate: issueDate,
          returnDate: returnDate,
          imageUrl: imageUrl,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          alert("Form Submitted Successfully");
          history.push("/");
        })
        .catch(() => {
          alert("form not submitted");
        });
    }

    // } else {
    // }
  };

  const imageHandler = (e) => {
    // let reader = new FileReader();
    // reader.onload = function (e) {
    //   setImage(e.target.result);
    //   console.log(e.target.result);
    // };
    // reader.readAsDataURL(e.target.files[0]);

    const imageFile1 = e.target.files[0];

    setImage((imageFile) => imageFile1);
  };

  useEffect(() => {
    // console.log("Upload Image1", image);

    if (image && listValue.title) {
      // console.log("Upload Image2");
      storage
        .ref(`${listValue.title}/ ${image.name}`)
        .put(image)
        .then((snapshot) => {
          console.log(snapshot);
          snapshot.ref.getDownloadURL().then((url) => {
            if (url) {
              console.log(url);
              setImageUrl(url);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image]);

  return (
    <div className="container_form">
      <h1 style={{ paddingBottom: "2%", color: "#009688" }}>Library-Form</h1>
      {/* <form onSub={submitHandler}> */}
      <FormControl>
        <FormControl>
          <TextField
            type="text"
            name="title"
            label="Title"
            onChange={changeHandler}
          />
        </FormControl>

        <br />
        <br />

        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="IssueDate"
              name="issueDate"
              value={issueDate}
              onChange={handleIssueDate}
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <br />
        <br />

        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="ReturnDate"
              name="returnDate"
              value={returnDate}
              onChange={handleReturnDate}
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <input
            // accept="image/*"
            // className={classes.input}
            id="contained-button-file"
            // multiple
            type="file"
            style={{ display: "none" }}
            onChange={imageHandler}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ width: "100%" }}
            >
              Upload Image
            </Button>
          </label>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select" // id="demo-customized-select"
            // value={listValue.status}

            // onChange={changeHandler}
            name="status"
            // placeholder="Status"
            value={listValue.status}
            onChange={changeHandler} // input={<BootstrapInput />}
            label="Select Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="cancel">Cancel</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />

        <Button variant="contained" color="secondary" onClick={clickhandler}>
          Submit
        </Button>
      </FormControl>
      {/* </form> */}
    </div>
  );
}

export default InputFormList;
