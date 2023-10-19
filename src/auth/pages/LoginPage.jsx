import { Google } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkinAuthentication, startGoogleSingIn } from "../../store/slices/auth"
import { useMemo } from "react"
export const LoginPage = () => {
  const dispatch = useDispatch();
  const {status} = useSelector(state => state.auth);
  const { email, password, onInputChange } = useForm({
    email: "esau@google.com",
    password: "123456",
  });

  
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkinAuthentication());
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
