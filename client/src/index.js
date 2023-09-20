import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configuration for Redux-Persist to store data in localStorage
const persistConfig = { key: "root", storage, version: 1 };

// Create a persisted reducer by wrapping your authReducer with Redux-Persist
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store with middleware
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a React root and render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Provide the Redux store to your application */}
      {/* Use Redux-Persist's PersistGate to wait for rehydration of persisted state */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App /> {/* Render your main application component */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
