import moment from "moment";

const userTableColumns = () => [
  {
    name: "Company",
    selector: (row) => row.company,
    sortable: true,
    center: "true",
  },

  {
    name: "Name",
    selector: (row) => row.fname + " " + row.lname,
    searchable: true,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    center: "true",
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
    center: "true",
  },
  {
    name: "Created At",
    selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
    sortable: true,
    center: "true",
  },
];

export default userTableColumns;
