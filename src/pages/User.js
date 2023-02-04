import {
  Button,
  Card,
  Table,
  TableHeader,
  TableCell,
  TextField,
  Tag,
  TableBody,
  Snackbar,
  TableRow,
} from "@sonnat/ui";
import useAuth from "../hooks/auth";
import { useState } from "react";
import ClipSpinner from "@sonnat/ui/Spinner/Clip";
import usePost from "../hooks/post";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const User = () => {
  const { me, updateUser } = useAuth();
  const [user, setUser] = useState();
  const [posts, setPost] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { readUserPost, deletePost } = usePost();
  const routeHistory = useHistory();

  function go(path) {
    routeHistory.push(path);
  }

  async function passwordHandler(e) {
    setPassword(e);
  }

  async function nameHandler(e) {
    setName(e);
  }

  async function emailHandler(e) {
    setEmail(e);
  }

  async function deleteHandler(id) {
    const data = await deletePost(id);
    await getEntity();
  }

  async function updateHandler() {
    console.log(name, password, email);
    const data = await updateUser(name, password, email);
    console.log(data);
    await getEntity();
  }

  async function getEntity() {
    const data = await me();
    console.log(data);
    setUser(data);
    setEmail(data.email);
    setName(data.name);
    const dataPost = await readUserPost();
    setPost(dataPost);
  }

  useEffect(async () => {
    await getEntity();
  }, []);

  return (
    <div className="flex-center my-3 p-3">
      {user && posts ? (
        <>
          <Card className="p-4 col-12">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h2>Posts: </h2>
              <img src={"post.png"} className="mb-4" />
            </div>
            <Table caption="Posts">
              <TableHeader>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => {
                  return (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.description.slice(0, 100)}...</TableCell>
                      <TableCell>
                        <Button
                          label="Delete"
                          color="primary"
                          variant="outlined"
                          className="mx-1 mt-1"
                          onClick={() => {
                            deleteHandler(post.id);
                          }}
                        />
                        <Button
                          label="Edit"
                          color="secondary"
                          variant="outlined"
                          className="mx-1 mt-1"
                          onClick={() => {
                            go(`/update/${post.id}`);
                          }}
                        />
                        <Button
                          label="Read"
                          onClick={() => {
                            go(`/post/${post.id}`);
                          }}
                          variant="outlined"
                          className="mx-1 mt-1"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
          <Card className="p-4 col-12 mt-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h2 className="mt-5">Update information: </h2>
              <img src={"update.png"} className="mb-4" />
            </div>
            <form className="d-flex flex-column">
              <label className="mt-2">name: </label>
              <TextField onChange={nameHandler} value={name} />
              <label className="mt-2">email: </label>
              <TextField onChange={emailHandler} value={email} />
              <label className="mt-2">password: </label>
              <TextField onChange={passwordHandler} />
              <div className="mt-3 flex-center">
                <Button
                  onClick={updateHandler}
                  label="Submit"
                  color="secondary"
                />
              </div>
            </form>
          </Card>
        </>
      ) : (
        <h1>No post!</h1>
      )}
    </div>
  );
};

export default User;
