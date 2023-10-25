import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingselectedView } from "../views/NothingselectedView"
import { NoteView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/slices/journal"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }
  return (
    <JournalLayout>
      {/* <Typography>JournalPageJournalPageJournalPageJournalPageJournalPageJournalPageJournalPage</Typography> */}
      {(!!active)
        ? <NoteView />
        : <NothingselectedView />}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size={'large'}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontsize: 30 }} />
      </IconButton>
    </JournalLayout>
  )


  
}
