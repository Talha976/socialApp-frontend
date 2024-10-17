import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {
  socket: null,
  connectedUsers: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setConnectedUsers: (state, action) => {
      state.connectedUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.socket = null;
      state.connectedUsers = [];
    },
  },
});

export const { setSocket, setConnectedUsers, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

export const initSocket = (userId) => (dispatch) => {
  const socket = io('http://localhost:3001', {
    query: { userId }, 
    transports: ['websocket'],
    withCredentials: true,
  });

  dispatch(setSocket(socket));

  socket.on('getConnectedUsers', (users) => {
    dispatch(setConnectedUsers(users));
  });

  socket.on('disconnect', () => {
    dispatch(disconnectSocket());
  });

  return socket;
};
