import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
const DataTable = ({ columns, data, title, actions }) => {
  const deafultMaterialTheme = createTheme();
  return (
    <ThemeProvider theme={deafultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        actions={actions}
        title={title}
      />
    </ThemeProvider>
  );
};

export default DataTable;
