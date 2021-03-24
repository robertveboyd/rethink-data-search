import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import hash from 'object-hash';

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1280,
  },
  container: {
    height: 440,
  },
  singleTableRow: {
    height: 384,
  },
  evenRow: {
    background: "white",
  },
  oddRow: {
    background: "#efefef",
  },
});

const DataTable = ({
  rows,
  columns,
  count,
  page,
  rowsPerPage,
  loading,
  onChangePage,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <colgroup>
            {columns.map((column) => (
              <col
                style={{ width: column.width }}
                key={column.id}
                align={column.align}
              />
            ))}
          </colgroup>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tablebody}>
            {loading ? (
              <TableRow className={classes.singleTableRow}>
                <TableCell colSpan={columns.length}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.length !== 0 ? (
              rows.map((row, index) => (
                <TableRow
                  className={index % 2 ? classes.evenRow : classes.oddRow}
                  key={hash(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={classes.singleTableRow}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100]}
        page={page}
        onChangePage={onChangePage}
        backIconButtonProps={{ disabled: loading || page === 0 }}
        nextIconButtonProps={{
          disabled: loading || (page + 1) * rowsPerPage >= count,
        }}
      />
    </Paper>
  );
};

export default DataTable;
