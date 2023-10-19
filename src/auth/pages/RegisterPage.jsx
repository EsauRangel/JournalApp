import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <form>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Nombre completo"
            type="email"
            placeholder="Esau Rangel"
            fullWidth
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Contrasena"
            type="text"
            placeholder="contrasena"
            fullWidth
          />
        </Grid>

        <Grid container spacing={2} >
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <Button variant="contained" fullWidth>Crear cuenta</Button>
          </Grid>
          


          <Grid container direction='row' justifyContent={'end'}>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
            <Link color={'inherit'} component={RouterLink} to={"/auth/login"}>Ingresar</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}
