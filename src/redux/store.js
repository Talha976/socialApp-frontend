import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice';
import socketReducer from './slices/socketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/setSocket'], 
        ignoredPaths: ['socket.socket'], 
      },
    }),
});

