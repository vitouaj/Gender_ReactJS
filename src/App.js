import axios from "axios";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import UpdateForm from "./UpdateForm";

function App() {
  const [id, setId] = useState("");
  const [genderName, setGenderName] = useState("");
  const [genderNote, setGenderNote] = useState("");

  const [data, setData] = useState([]);

  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [userToUpdate, setUserToUpdate] = useState({});

  const modalRef = useRef();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/gender")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function fetch(e) {
    e.preventDefault();
    axios
      .get(process.env.REACT_APP_SERVER + "/gender")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }

  function create(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER + "/gender", {
        genderName,
        genderNote,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  function remove(id) {
    axios
      .delete(process.env.REACT_APP_SERVER + "/gender/" + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  // update form
  function ClickToUpdate(gen) {
    console.log(gen);
    return <UpdateForm text="i love you" />;
  }

  return (
    <div className="container">
      <div className="navbar">
        <span className="app-title">Gender App</span>
        <ul className="menu">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Help</a>
          </li>
        </ul>
      </div>
      <div className="content-container">
        <div className="sidebar">
          <ul className="sidebar-menu-container">
            <li
              onClick={() => {
                setShowForm(!showForm);
                setShowTable(false);
                setShowUpdate(false);
              }}
            >
              <a>Create</a>
            </li>
            <li
              onClick={(e) => {
                fetch(e);
                setShowTable(true);
                setShowUpdate(false);
                setShowForm(false);
              }}
            >
              <a>Read</a>
            </li>
            <li
              onClick={() => {
                setShowUpdate(!showUpdate);
                setShowForm(false);
                setShowTable(false);
              }}
            >
              <a>Update</a>
            </li>
            <li>
              <a>Delete</a>
            </li>
          </ul>
        </div>
        <div className="content">
          {showTable && (
            <table className="table">
              <tr className="heading">
                <th>Id</th>
                <th>Gender Name</th>
                <th>Gender Note</th>
                <th>Actions</th>
              </tr>
              {data.map((gen) => {
                return (
                  <tr key={gen.id} className="">
                    <th>{gen.id}</th>
                    <th>{gen.genderName}</th>
                    <th>{gen.genderNote}</th>
                    <th>
                      <button onClick={(id) => remove(gen.id)}>Delete</button>
                      <button
                        onClick={() => {
                          setUserToUpdate(gen);
                          setShowUpdate(true);
                          setShowTable(false);
                        }}
                      >
                        Update
                      </button>
                    </th>
                  </tr>
                );
              })}
            </table>
          )}

          {showUpdate && (
            <UpdateForm
              userToUpdate={userToUpdate}
              setShowUpdate={setShowUpdate}
            />
          )}

          {showForm && (
            // modal background
            <div className="modal">
              {/* modal content */}
              <form className="form">
                <div onClick={() => setShowForm(false)} className="close">
                  X
                </div>
                <div className="form-content">
                  <input
                    type="text"
                    placeholder="gender name"
                    value={genderName}
                    onChange={(e) => setGenderName(e.target.value)}
                  />
                  <textarea
                    value={genderNote}
                    onChange={(e) => setGenderNote(e.target.value)}
                  >
                    Gender Note
                  </textarea>
                  <button
                    onClick={(e) => {
                      create(e);
                      window.location.reload();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <span>@Copy Rights 2023</span>
      </div>
    </div>
  );
}

export default App;
