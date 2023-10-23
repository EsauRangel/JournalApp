import { TurnedIn, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export const SideBar = ({ draweWidth = 240 }) => {
    const { displayName } = useSelector(state => state.auth);
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
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum"} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
