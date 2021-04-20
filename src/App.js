import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

//styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "3rem 4rem",
    height: "100%",
    padding: "1rem ",
    maxHeight: "90vh",
    overflow: "scroll",
  },

  headRow: {
    backgroundColor: "#606c7b",
    color: "white",
  },

  cell: {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "800",
  },

  myimg: {
    height: "auto",
    width: "8.5rem",
    border: "2px solid black",
    boxShadow: "5px 10px 8px #888888",
  },

  rows: {
    backgroundColor: "#d0dcec",
    "&:nth-of-type(2n)": {
      backgroundColor: "#a0afc3",
    },
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}));

//component
function App() {
  const classes = useStyles();

  //states
  const [arr, setArr] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const count = 20;

  useEffect(() => {
    //giving a timer for delay of 2 secs
    const timer = setTimeout(() => {
      fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`)
        .then((res) => {
          console.log(res); //printing response
          return res.json(); //returning the json method inside response object which cant be directly view here
        })

        .then((data1) => {
          setArr((arr) => [...arr, ...data1]);
          setHasMore(true);
          console.log("New arr length : ", data1); //
        })
        .catch((err) => console.log(err)); // if promise is unsuccessful :- err in console
    }, 2000);

    return () => clearTimeout(timer);
  }, [count, page]); //in case either of count or page is updated ...call useState

  const fetchData = () => {
    setPage(page + 1);
    //changing the page so that the state gets modified and useEffect is called repetedly
    console.log("Page : ", page);
  };

  //return

  return (
    <div id="target" className={classes.root}>
      <InfiniteScroll
        dataLength={arr.length}
        scrollableTarget="target"
        next={fetchData}
        hasMore={hasMore} //if hasMore = true ...fetch more data
        loader={<h1>Please wait for 2 secs Loading...</h1>}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell className={classes.cell}>S no. </TableCell>
              <TableCell className={classes.cell}>ID </TableCell>
              <TableCell className={classes.cell}>Author </TableCell>
              <TableCell className={classes.cell}>Width</TableCell>
              <TableCell className={classes.cell}>Height</TableCell>
              <TableCell className={classes.cell}>Website Link</TableCell>
              <TableCell className={classes.cell}>Image</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* appending new data in arr */}

            {arr.map((row, i) => (
              <TableRow className={classes.rows} key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.width}</TableCell>
                <TableCell>{row.height}</TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>
                  <img
                    src={row.download_url}
                    alt={row.url}
                    className={classes.myimg}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
}

export default App;
