import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import CustomTable from "../../Custom/CustomTable";
import userTableColumns from "../../Admin/Users/UserTableColumns";
import useFetchData from "../../../hooks/useFetchData";

const User = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData("/api/v1/admin/user", refreshKey);
  const users = data.data || [];
  const tableColumns = userTableColumns();
  return (
    <>
      <Layout>
        <CustomTable tableData={users} tableColumns={tableColumns} defultSortingColumn="7" />
      </Layout>
    </>
  );
};

export default User;
