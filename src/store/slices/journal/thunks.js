import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../../helpers";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        dispatch(savingNewNote());
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        }

        try {
            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            await setDoc(newDoc, newNote);

            newNote.id = newDoc.id;
            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (error) {
            throw new Error(error.message);
        }

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!uid) throw new Error("El UID del usuario no existe.");

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPrimises = [];

        for (const file of files) {
            fileUploadPrimises.push(fileUpload(file));
        }

        const photoUrl = await Promise.all(fileUploadPrimises);
        dispatch(setPhotosToActiveNote(photoUrl));
    }
}

export const startDeleteNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docref = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docref);

        dispatch(deleteNoteById(note.id));
    }
}