import React, { createContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on('connect', () => {
      // console.log('Connected to socket server:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      // console.log('Disconnected from socket server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      // console.log('Emitting newUser event with currentUser._id:', currentUser._id);
      socket.emit("newUser", currentUser._id);
    }
  }, [currentUser, socket]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ socket }), [socket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
