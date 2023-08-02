import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Loader from "../Loader/Loader";
import { MenuItem, TextField } from "@material-ui/core";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "State", minWidth: 100 },
  {
    id: "population",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Phone",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Question Answer",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("Italy", "IT", 60483973, 301340)
// ];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [loading, setloading] = useState(false);
  const [state, setState] = useState("Karnataka");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  console.log(rows);
  useEffect(() => {
    setloading(true);
    apiCall();
  }, [page, rowsPerPage, state]);

  const apiCall = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "state": `${state}`
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
   const resp= await fetch(`https://bjp-quiz-backend-lzy3caj3ca-el.a.run.app/admin/users?page=${page}&limit=${rowsPerPage}`, requestOptions)
    const data = await resp.json();

    console.log(data);
    const tempArray = [];
    data.users.map((el) => {
      tempArray.push(createData(el?.name, el?.state, el?.email, el?.phone));
    });
    setRows(tempArray);
    setCount(data.totalPages * rowsPerPage);
    setloading(false);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {" "}
      <TextField
        label="State"
        style={{
          position: "absolute",
          top: "0%",
          left: "10px",
          width: "10%",
          border: "2px solid",
          backgroundColor: "white",
        }}
        onChange={(e) => setState(e.target.value)}
        variant="filled"
        margin="normal"
        select
        required
      >
        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
        <MenuItem value="Andaman and Nicobar Islands">
          Andaman and Nicobar Islands
        </MenuItem>
        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
        <MenuItem value="Assam">Assam</MenuItem>
        <MenuItem value="Bihar">Bihar</MenuItem>
        <MenuItem value="Chandigarh">Chandigarh</MenuItem>
        <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
        <MenuItem value="Dadar and Nagar Haveli">
          Dadar and Nagar Haveli
        </MenuItem>
        <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
        <MenuItem value="Delhi">Delhi</MenuItem>
        <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
        <MenuItem value="Puducherry">Puducherry</MenuItem>
        <MenuItem value="Goa">Goa</MenuItem>
        <MenuItem value="Gujarat">Gujarat</MenuItem>
        <MenuItem value="Haryana">Haryana</MenuItem>
        <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
        <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
        <MenuItem value="Karnataka">Karnataka</MenuItem>
        <MenuItem value="Kerala">Kerala</MenuItem>
        <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
        <MenuItem value="Mumbai">Mumbai</MenuItem>
        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
        <MenuItem value="Manipur">Manipur</MenuItem>
        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
        <MenuItem value="Mizoram">Mizoram</MenuItem>
        <MenuItem value="Nagaland">Nagaland</MenuItem>
        <MenuItem value="Odisha">Odisha</MenuItem>
        <MenuItem value="Punjab">Punjab</MenuItem>
        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
        <MenuItem value="Sikkim">Sikkim</MenuItem>
        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
        <MenuItem value="Telangana">Telangana</MenuItem>
        <MenuItem value="Tripura">Tripura</MenuItem>
        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
        <MenuItem value="West Bengal">West Bengal</MenuItem>
      </TextField>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                rows
                  //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, ind) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.index * 2.02}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "350%",
                  }}
                >
                  <Loader />
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
