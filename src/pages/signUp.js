/* eslint-disable no-debugger, no-console */

import {
  Card,
  Button,
  TextField,
  Text,
  CardHeader,
  CardBody,
  ActionChip,
} from "@sonnat/ui";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/auth";
import { useState } from "react";

const signUp = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { signUp } = useAuth();

  const nameHandler = (e) => {
    setName(e);
  };

  const emailHandler = (e) => {
    setEmail(e);
  };

  const passwordHandler = (e) => {
    setPassword(e);
  };

  const onClick = async () => {
    const res = await signUp(name, email, password);
    if (res.id) {
      history.push("/sign");
    }
  };

  const changeRoute = () => {
    history.push("/sign");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5 m-5 h-100">
      <Card className="mt-5 signCard">
        <CardHeader className="border-bottom">
          <Text variant="subtitle">SignUp</Text>
        </CardHeader>

        <CardBody className="p-2 d-flex flex-column w-100">
          <TextField
            onChange={nameHandler}
            type="text"
            placeholder="Enter name"
            className="m-2"
          ></TextField>
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
            className="m-2"
          ></TextField>
          <ActionChip
            label="already have an account? signIn"
            color="primary"
            variant="outlined"
            onClick={changeRoute}
            className="mb-2 mt-5"
          ></ActionChip>
          <Button
            onClick={onClick}
            label="Submit"
            className=" mx-1"
            color="secondary"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default signUp;
