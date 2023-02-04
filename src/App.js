import "./style/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Header from "./components/Header";
import Post from "./pages/Post";
import BlogPost from "./pages/BlogPost";
import User from "./pages/User";
import MenuCore from "./components/MenuCore";
import PostUpdate from "./pages/PostUpdate";
import useAuth from "./hooks/auth";

const App = () => {
  const { me } = useAuth();
  const [data, seData] = useState({});

  async function getEntity() {
    const data = await me();
    seData(data);
  }

  useEffect(() => {
    getEntity();
  }, []);

  return (
    <>
      <Switch>
        <Route path="/User">
          {data.id ? (
            <>
              <MenuCore />
              <Header />
              <User />
            </>
          ) : (
            <Redirect to="/sign" />
          )}
        </Route>
        <Route path="/sign">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/Post/:id">
          {data.id ? (
            <>
              <MenuCore />
              <Header />
              <BlogPost />
            </>
          ) : (
            <Redirect to="/sign" />
          )}
        </Route>
        <Route path="/Post">
          {data.id ? (
            <>
              <MenuCore />
              <Header />
              <Post />
            </>
          ) : (
            <Redirect to="/sign" />
          )}
        </Route>
        <Route path="/update/:id">
          {data.id ? (
            <>
              <MenuCore />
              <Header />
              <PostUpdate />
            </>
          ) : (
            <Redirect to="/sign" />
          )}
        </Route>
        <Route path="/">
          {data.id ? (
            <>
              <MenuCore />
              <Header />
              <Home />
            </>
          ) : (
            <Redirect to="/sign" />
          )}
        </Route>
      </Switch>
    </>
  );
};

export default App;
