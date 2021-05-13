import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { selectUserError, setError } from "./userSlice";

const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const setLoginError = () => {
    dispatch(setError(null));
  };

  return (
    <Snackbar
      open={error}
      autoHideDuration={7000}
      onClose={() => setLoginError(null)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
