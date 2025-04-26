import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postValue, setPostValue] = useState("");
  const [sort, setSort] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  let data = users.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
      item.email.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
      item.age.toString().includes(inputValue.trim().toString())
  );

  let data3 = [];
  if (sort == true) {
    data3 = data.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    data3 = data.sort((a, b) => b.name.localeCompare(a.name));
  }
  const currentData = data3.slice(firstPostIndex, lastPostIndex);
  // console.log("Data3", data3);

  const handleDelete = (id) => {
    axios
      .delete("https://todoapp-server2-f2r8.onrender.com/" + id)
      .then(() => window.location.reload());
  };
  useEffect(() => {
    axios
      .get("https://todoapp-server2-f2r8.onrender.com/")
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-start">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <button className="btn btn-info ms-2" onClick={() => setSort(!sort)}>
          {sort == false ? "A-Z" : "Z-A"}
        </button>
        <br />
        <br />
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={postValue}
          onChange={(e) => (
            setPostValue(e.target.value),
            setPostPerPage(e.target.value <= 0 ? "10" : e.target.value)
          )}
        />
        <hr />
        <Pagination
          totalPost={data3.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-success ms-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
