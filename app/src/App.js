import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import useDebounce from "./hooks/useDebounce";

import Search from "./components/Search";
import DataTable from "./components/DataTable";

const tableColumns = [
  { id: "lastName", label: "Last Name", width: "20%" },
  { id: "firstName", label: "First Name", width: "20%" },
  { id: "address", label: "Address", width: "30%" },
  { id: "phone", label: "Phone Number", width: "30%" },
];

const transformData = (data) =>
  data.map((d) => {
    const { name, address, phone } = d;
    const [firstName, lastName] = name.split(" ");
    return { lastName, firstName, address, phone };
  });

const App = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 500);
  const [page, setPage] = useState({ page: 0 });
  const [count, setCount] = useState(100);
  const rowsPerPage = 100;

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `/api/users?name=${debouncedName}&page=${page.page}&limit=${rowsPerPage}`
      )
      .then((response) => {
        setUsers(response.data.users);
        setCount(response.data.count);
        setLoading(false);
      });
  }, [page, debouncedName]);

  useEffect(() => {
    getUsers();
  }, [page])

  useEffect(() => {
    setPage({ page: 0 })
  }, [debouncedName])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage({ page: newPage });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h3">User Directory</Typography>
      <Search value={name} label="Name" onValueChange={handleNameChange} />
      <DataTable
        rows={transformData(users)}
        columns={tableColumns}
        count={count}
        page={page.page}
        rowsPerPage={rowsPerPage}
        loading={loading}
        onChangePage={handleChangePage}
      />
    </Box>
  );
};

export default App;
