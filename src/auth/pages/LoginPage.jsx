import { Google } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/slices/auth"
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
}
export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const { email, password, onInputChange } = useForm(formData);


  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Contrasena"
            type="text"
            placeholder="contrasena"
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}

          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}
        >
          <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
            <Alert severity="error" >{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth  >Login</Button>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 2, mt: 1 }}>
            <Button disabled={isAuthenticating} variant="contained" fullWidth onClick={onGoogleSingIn}>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>


          <Grid container direction='row' justifyContent={'end'}>
            <Link color={'inherit'} component={RouterLink} to={"/auth/register"}>Crear cuenta</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}
