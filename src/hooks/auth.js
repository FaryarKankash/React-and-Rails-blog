import config from "./../config.json";
import { signal } from "@preact/signals-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useAuth = () => {
  async function signUp(name, email, password) {
    const data = await fetch(`${config.serverAddress}/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  async function signIn(email, password) {
    try {
      const data = await fetch(`${config.serverAddress}/auth`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        return res.json();
      });

      return data;
    } catch (error) {
      return false;
    }
  }

  async function me() {
    const data = await fetch(`${config.serverAddress}/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt: localStorage.getItem("token"),
      }),
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  async function updateUser(name, password, email) {
    const data = await fetch(`${config.serverAddress}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  return {
    signUp,
    signIn,
    me,
    updateUser,
  };
};

export default useAuth;
