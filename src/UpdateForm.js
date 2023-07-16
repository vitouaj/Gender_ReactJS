import { useState } from "react";
import axios from "axios";

export default function UpdateForm({ userToUpdate, setShowUpdate }) {
  const [genderIdUpdate, setGenderIdUpdate] = useState(userToUpdate.id);
  const [genderNameUpdate, setGenderNameUpdate] = useState(
    userToUpdate.genderName
  );
  const [genderNoteUpdate, setGenderNoteUpdate] = useState(
    userToUpdate.genderNote
  );

  function update(e) {
    e.preventDefault();
    axios
      .put(process.env.REACT_APP_SERVER + "/gender/" + genderIdUpdate, {
        id: genderIdUpdate,
        genderName: genderNameUpdate,
        genderNote: genderNoteUpdate,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
  }

  return (
    <div className="modal">
      <form className="form">
        <div onClick={() => setShowUpdate(false)} className="close">
          X
        </div>
        <div className="form-content">
          <input type="number" placeholder="id" value={genderIdUpdate} />
          <input
            type="text"
            placeholder="gender name"
            value={genderNameUpdate}
            onChange={(e) => setGenderNameUpdate(e.target.value)}
          />
          <textarea
            value={genderNoteUpdate}
            onChange={(e) => setGenderNoteUpdate(e.target.value)}
          >
            Gender Note
          </textarea>
          <button
            onClick={(e) => {
              update(e);
              //   window.location.reload();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
