import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/slices/auth"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"


const formData = {
  email: "",
  displayName: "",
  password: ""
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener almenos 6 caracteres.'],
  displayName: [(value) => value.length > 1, 'El nombre es obligatorio'],


}
export const RegisterPage = () => {
  const dispatch = useDispatch()

  const [formSubmited, setFormSubmited] = useState(false)

  const { isFormValid, email, emailValid, displayName, displayNameValid, password,
    passwordValid, onInputChange, formState } = useForm(formData, formValidations);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true)
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Nombre completo"
            type="text"
            name="displayName"
            placeholder="Esau Rangel"
            value={displayName}
            onChange={onInputChange}
            fullWidth
            error={!!displayNameValid && formSubmited}
            helperText={displayNameValid}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Correo"
            type="email"
            value={email}
            name="email"
            placeholder="correo@google.com"
            onChange={onInputChange}
            error={!!emailValid && formSubmited}
            helperText={emailValid}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}
          item>
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            error={!!passwordValid && formSubmited}
            helperText={passwordValid}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>

        <Grid container spacing={2} >
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isCheckingAuthentication}
            >Crear cuenta
            </Button>
          </Grid>



          <Grid container direction='row' justifyContent={'end'}>
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link color={'inherit'} component={RouterLink} to={"/auth/login"}>Ingresar</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}
