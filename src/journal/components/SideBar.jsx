import { TurnedIn, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SIdeBarItem";
import { useMemo } from "react";

export const SideBar = ({ draweWidth = 240 }) => {
    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
   
    return (
        <Box
            component={'nav'}
            sx={{ width: { sm: draweWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant="permanent"
                open={true}
                sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: draweWidth } }}
            >

                <Toolbar>
                    <Typography variant="h6" component={'div'}>{displayName}</Typography>

                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SideBarItem key={note.id} {...note}/>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
