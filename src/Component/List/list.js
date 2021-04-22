import React, { useState, useEffect } from "react";
import db, { auth, firebaseApp } from "../../FirebaseConfig/firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  BorderColorTwoTone,
  DeleteOutlineTwoTone,
  AddCircle,
  GetApp,
  Update,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Menu, MenuItem, Select } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },

  dropdown: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

function List() {
  const [booklist, setBookList] = useState("");
  const [updateData, setUpdateData] = useState({
    isUpdate: false,
    updateId: 0,
  });

  const forceUpdate = React.useState()[1].bind(null, {});

  const [updateStatus, setUpdateStatus] = useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    db.collection("list").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBookList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      //   snapshot.docs.map((doc) => console.log(doc));
    });
  }, []);

  const handlerDelete = (id) => {
    if (id) {
      db.collection("list").doc(id).delete();
    }
  };

  const handlerEdit = (id) => {
    var temp = updateData;
    if (id) {
      temp.isUpdate = true;
      temp.updateId = id;
      setUpdateData(temp);

      forceUpdate();
    }
  };

  const changeHandler = (e) => {
    console.log(e.target.value);
    setUpdateStatus(e.target.value);
    // setUpdateStatus(e.event,target)
  };

  const handlerUpdate = (id) => {
    console.log(id, updateStatus);
    if (id && updateStatus) {
      db.collection("list")
        .doc(id)
        .update({
          status: updateStatus,
        })
        .then(() => {
          // var temp = { ...updateData };
          // temp.isUpdate = false;
          // setUpdateData(temp);
          console.log("Update Successfull");
          setUpdateData((oldState) => ({ ...oldState, isUpdate: false }));
          // forceUpdate();
        })
        .catch(() => {
          alert("Status Not Updated");
        });
    }
  };

  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  const clickHandlerDownload = (src) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };
  return (
    <div style={{ padding: "2% 10% 5% 10%" }}>
      <h1 style={{ paddingBottom: "5%", color: "#0063cc" }}>Book List</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {booklist.length != 0
              ? booklist.map((list, index) => (
                  <TableRow key={list.id}>
                    <TableCell scope="row">{list.id.toUpperCase()} </TableCell>
                    <TableCell scope="row">
                      <img
                        className="image_view"
                        src={list.data.imageUrl}
                        id="image_url"
                      />
                    </TableCell>
                    {updateData.isUpdate && updateData.updateId === list.id ? (
                      <>
                        <TableCell scope="row">
                          <Select
                            id="demo-simple-select"
                            name="status"
                            defaultValue={list.data.status}
                            className={classes.dropdown}
                            onChange={changeHandler}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="done">Done</MenuItem>
                            <MenuItem value="cancel">Cancel</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="right">
                          <Update
                            color="primary"
                            className="icon_click"
                            onClick={() => {
                              handlerUpdate(list.id);
                            }}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell scope="row">
                          {list.data.status.toUpperCase()}
                        </TableCell>

                        <TableCell align="right">
                          <BorderColorTwoTone
                            color="secondary"
                            className="icon_click"
                            onClick={() => {
                              handlerEdit(list.id);
                            }}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </>
                    )}

                    <TableCell>
                      <a href="#">
                        <GetApp
                          color="secondary"
                          onClick={() =>
                            clickHandlerDownload(list.data.imageUrl)
                          }
                        />
                      </a>
                    </TableCell>

                    <TableCell align="right">
                      <DeleteOutlineTwoTone
                        color="secondary"
                        className="icon_click"
                        onClick={() => {
                          handlerDelete(list.id);
                        }}
                      />
                    </TableCell>
                    <TableCell></TableCell>

                    {/* <DeleteOutlineTwoTone
                color="secondary"
                //   onClick={() => {
                //     handlerDelete(list.id);
                //   }}
              /> */}

                    {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCircle
        color="primary"
        onClick={() => {
          history.push("addlist");
        }}
        style={{
          width: "5%",
          height: "5%",
          float: "right",
          paddingTop: "5%",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default List;
