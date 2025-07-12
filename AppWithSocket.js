import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { WEB_SOCKET_URL } from './src/config/WebService';
import MainNavigation from './src/routes';
import { saveScoket } from './src/redux/actions/appAction';


const AppWithSocket = () => {
  const token = useSelector(state => state.authReducer?.userToken); // or wherever your token is
console.log('tokentoken',token)
  useEffect(() => {
    const socket = io(WEB_SOCKET_URL, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
    });

    socket.on('connect', () => {
      if (socket.connected) {
        console.log('✅ Socket connected:', socket);
        saveScoket(socket);
      }
    });

    return () => {
      socket?.disconnect();
    };
  }, [token]);

  return <MainNavigation />;
};

export default AppWithSocket;
