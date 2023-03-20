import { configureStore } from "@reduxjs/toolkit";

import agenteReducer from "./agente-slice";
import loginReducer from "./login-slice";
import datosReducer from "./datosfce-slice";


export const store = configureStore({
  reducer: {
    agente: agenteReducer,
    login: loginReducer,
    datosfce: datosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

