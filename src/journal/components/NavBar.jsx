import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/slices/auth"

export const NavBar = ({ draweWidth = 240 }) => {
    const dispatch = useDispatch()
    const onLogOut = () => {
        dispatch(startLogout());
    }
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${draweWidth}px)` },
                ml: { sm: `${draweWidth}px` }
            }}>
            <Toolbar>

                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}

                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="h6" noWrap component={'div'}>Journal app</Typography>
                    <IconButton
                        color="error"
                        onClick={onLogOut}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
