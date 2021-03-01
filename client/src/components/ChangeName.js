import React, { useState } from 'react';
import { useUser, useNameChange } from '../context/UserProvider';
import '../css/changeName.css';

function ChangeName() {
  const user = useUser();
  const changeName = useNameChange();
  const [nameChange, setNameChange] = useState(
    user !== undefined ? user['name'] : ''
  );

  const updateName = (e) => {
    setNameChange(e.target.value);
  };

  const submitNameChange = () => {
    changeName(nameChange);
  };

  return (
    <div>
      <input
        className="changeName-input"
        type="text"
        onChange={(e) => updateName(e)}
        value={nameChange}
        placeholder={user !== undefined ? user['name'] : 'abc'}
      />
      <button onClick={submitNameChange} className="changeName-button">
        Change Name
      </button>
    </div>
  );
}

export default ChangeName;
