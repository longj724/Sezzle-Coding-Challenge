import React, { useContext, createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

const UserContext = createContext();
const NameChangeContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useNameChange() {
  return useContext(NameChangeContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    let socket = undefined;

    // If in production
    if (process.env.NODE_ENV === 'production') {
      socket = io({
        withCredentials: true,
      });
    } else {
      socket = io(process.env.REACT_APP_SERVER_PORT, {
        withCredentials: true,
      });
    }

    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });

    setUser({ name: randomName, socket: socket });

    return () => socket.close();
  }, []);

  const changeName = (name) => {
    setUser({ ...user, name: name });
  };

  return (
    <UserContext.Provider value={user}>
      <NameChangeContext.Provider value={changeName}>
        {children}
      </NameChangeContext.Provider>
    </UserContext.Provider>
  );
}

export default UserProvider;
