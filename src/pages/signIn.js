import {
  Card,
  Button,
  TextField,
  Text,
  CardHeader,
  CardBody,
  ActionChip,
  Snackbar,
} from "@sonnat/ui";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/auth";

const sign = () => {
  const { signIn } = useAuth();
  const [showSnack, setShowSnack] = useState(false);
  const [errSnack, setErrSnack] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const emailHandler = (e) => {
    setEmail(e);
  };

  const passwordHandler = (e) => {
    setPassword(e);
  };

  const clickHandler = async () => {
    const res = await signIn(email, password);
    console.log(res.token);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setShowSnack(true);
      history.push("/");
    } else {
      setErrSnack(true);
      setErrSnack(false);
    }
  };

  const changeRoute = () => {
    history.push("/signUp");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5 h-50">
      <Card className="mt-5 signCard">
        <CardHeader className="border-bottom">
          <Text variant="subtitle">SignIn</Text>
        </CardHeader>

        <CardBody className="p-2 d-flex flex-column h-100 w-100">
          <TextField
            onChange={emailHandler}
            type="email"
            hasError={false}
            placeholder="Enter email"
            className="m-2"
          ></TextField>
          <TextField
            onChange={passwordHandler}
            type="password"
            placeholder="Enter password"
            className="m-2 pb-2"
          ></TextField>
          <img src={"signin.png"} className="mb-4" />
          <ActionChip
            label="don't have account? make one!"
            color="primary"
            variant="outlined"
            onClick={changeRoute}
            className="mb-2"
          ></ActionChip>
          <Button
            onClick={clickHandler}
            label="Submit"
            className="mx-1"
            color="secondary"
          />
        </CardBody>
      </Card>
      <Snackbar
        color="success"
        text="signIn success!"
        autoHide={3000}
        open={showSnack}
      />
      <Snackbar
        color="error"
        text="Email or password is wrong!"
        autoHide={3000}
        open={errSnack}
      />
    </div>
  );
};

export default sign;
