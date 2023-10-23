import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingselectedView } from "../views/NothingselectedView"
import { NoteView } from "../views"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>JournalPageJournalPageJournalPageJournalPageJournalPageJournalPageJournalPage</Typography> */}
      {/* <NothingselectedView /> */}
      <NoteView />

      <IconButton
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
        <AddOutlined sx={{fontsize: 30}}/>
      </IconButton>
    </JournalLayout>
  )



  
}
