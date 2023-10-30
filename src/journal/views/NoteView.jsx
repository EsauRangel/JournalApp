import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo } from "react"
import { setActiveNote } from "../../store/slices/journal/journalSlice"
import { startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/slices/journal/thunks"
import Swal from "sweetalert2";
import { useRef } from "react"
import { current } from "@reduxjs/toolkit"

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputref = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState, dispatch]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);
  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  }

  const onDelete = () => {
    dispatch(startDeleteNote());
  }
  return (
    <Grid container className="animate__animated animate__fadeIn animate__faster" direction={"row"} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }}>
      <Typography fontSize={39} fontWeight={"light"}>{dateString}</Typography>

      <Grid item>

        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputref}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputref.current.click()}
        >

          <UploadOutlined />
        </IconButton>


        <Button
          color="primary"
          sx={{ padding: 2 }}
          disabled={isSaving}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container >

        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un  titulo"
          sx={{ border: 'none', mb: 1 }}
          value={title}
          name="title"
          onChange={onInputChange}

        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio el dia de hoy"
          minRows={5}
          value={body}
          name="body"
          onChange={onInputChange}

        />
      </Grid >

      <Grid
        container
        justifyContent={'end'}

      >
        <Button
          onClick={onDelete}
          color={"error"}
          sx={{ mt: 2 }}
        >
          Borrar
        </Button>

      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  )
}
