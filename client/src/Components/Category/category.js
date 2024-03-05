import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Layout from "../Layout/Layout";

const Category = () => {
  const defaultMaterialTheme = createTheme();
  return (
    <>
      <Layout>
        <div>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              columns={[
                {
                  title: "Name",
                  field: "name",
                  render: (rowData) => (
                    <>
                      {rowData.name}
                      <img src={"https://tse2.mm.bing.net/th?id=OIP.HGwGqH0hwUuKQqWn40hjOgHaHa&pid=Api&P=0&h=180"} style={{ width: 50, borderRadius: "50%" }} />
                    </>
                  ),
                },
                { title: "Surname", field: "surname" },
                { title: "Surname", field: "surname" },
                { title: "Surname", field: "surname" },
                { title: "Surname", field: "surname" },
                { title: "Surname", field: "surname" },
                { title: "Birth Year", field: "birthYear", type: "numeric" },
                { title: "Birth City", field: "birthCity", lookup: { 1: "Linz", 2: "Vöcklabruck", 3: "Salzburg" } },
              ]}
              data={[
                { name: "Max", surname: "Mustermann", birthYear: 1987, birthCity: 1 },
                { name: "Cindy", surname: "Musterfrau", birthYear: 1995, birthCity: 2 },
              ]}
              options={{
                showTitle: false,
                rowsPerPageOptions: [10, 25, 50],
              }}
            />
          </ThemeProvider>
        </div>
      </Layout>
    </>
  );
};

export default Category;
