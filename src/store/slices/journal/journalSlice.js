import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name: "journalSlice",
    initialState: {
        isSaving: false,
        massagesaved: "",
        notes: [],
        active: null,
         

    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, notes) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },
        savingNewNote: (state) => {
            state.isSaving = true;
        }
    }
});

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions;

