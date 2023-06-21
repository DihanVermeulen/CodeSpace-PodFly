import { StyledContainer, StyledPaper, StyledForm } from "./AuthPage.styled";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from "react";
import { Space } from "../../styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

type AuthPage = {
  page: "SIGNIN" | "SIGNUP";
};

export const AuthPage = (props: AuthPage) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    confirmPassword: "",
  });
  const { page } = props;
  const { signIn, signUp, getSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  /* Checks if there is a session then navigates the user to the
   * home page. getSession is in the dependencies array to run the
   * hook if there is a change in the session object.
   */
  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate("/");
    }
  }, [getSession]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * Creates form actions
   * @returns form actions
   */
  const createFormActions = () => {
    /**
     * handles the form submit
     * @param {FormEvent<HTMLFormElement>} event
     */
    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (page === "SIGNIN") {
        const { password, email } = formData;
        signIn(email, password);
      } else if (page === "SIGNUP") {
        const { confirmPassword, email, password } = formData;
        if (confirmPassword === password) {
          signUp(email, password);
          navigate("/signup?checkmail=true");
        }
      }
    };

    /**
     * handles the input changes of the form
     * @param {ChangeEvent<HTMLInputElement>} event
     */
    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((previousData) => ({
        ...previousData,
        [event.target.name]: event.target.value,
      }));
    };

    return {
      handleSubmitForm,
      handleFormChange,
    };
  };
  const formActions = createFormActions();
  const handleSubmitForm = formActions.handleSubmitForm;
  const handleFormChange = formActions.handleFormChange;

  // Checks which page should be displayed then displays that page
  if (page === "SIGNIN") {
    return (
      <StyledContainer>
        <StyledPaper>
          <Box width={"100%"}>
            <Typography variant="h3" component="h1">
              PodFly
            </Typography>
            <Typography variant="h5" component="h2">
              Sign in
            </Typography>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </Box>
          <Space height="1rem" />
          <StyledForm onSubmit={handleSubmitForm}>
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              fullWidth
              required
            >
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                sx={{ width: "100%" }}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              fullWidth
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleFormChange}
                value={formData.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" fullWidth type="submit">
              Sign in
            </Button>
          </StyledForm>
        </StyledPaper>
      </StyledContainer>
    );
  } else if (page === "SIGNUP") {
    return (
      <StyledContainer>
        <StyledPaper>
          {queryParams.get("checkmail") ? (
            <>
              <Box width={"100%"}>
                <Typography variant="h3" component="h1">
                  PodFly
                </Typography>
                <Typography variant="h5" component="h2">
                  Check your email
                </Typography>
                <p>
                  An email has been sent to your address. Please follow the
                  instructions provided in the email to complete your signup
                  process.
                </p>
              </Box>
              <p>
                Already have an account? <Link to="/signin">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <Box width={"100%"}>
                <Typography variant="h3" component="h1">
                  PodFly
                </Typography>
                <Typography variant="h5" component="h2">
                  Sign up
                </Typography>
                <p>
                  Already have an account? <Link to="/signin">Sign in</Link>
                </p>
              </Box>
              <Space height="1rem" />
              <StyledForm onSubmit={handleSubmitForm}>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    sx={{ width: "100%" }}
                  />
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleFormChange}
                    value={formData.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-confirmPassword">
                    Confirm password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    onChange={handleFormChange}
                    value={formData.confirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button variant="contained" fullWidth type="submit">
                  Sign up
                </Button>
              </StyledForm>
            </>
          )}
        </StyledPaper>
      </StyledContainer>
    );
  }
};

export default AuthPage;
