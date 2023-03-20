import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    materias: [],
}

const datosSlice = createSlice({
    name: "datosfce",
    initialState,
    reducers: {
        listMaterias: (state, action) => {
            state.materias = action.payload

        },
    }
})

export const { listMaterias } = datosSlice.actions

export default datosSlice.reducer

