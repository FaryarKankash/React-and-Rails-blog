import { Button, Card, TextField, Text, Code, TextArea } from "@sonnat/ui";
import { useState } from "react";
//first pnpm add file:./ckeditor then:
import Editor from "ckeditor5-custom-build/build/ckeditor.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import usePost from "../hooks/post";
import { useHistory } from "react-router-dom";

const Post = () => {
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [description, setDescription] = useState();
  const history = useHistory();

  const { createPost } = usePost();

  const editorHandler = (e) => {
    setData(e);
  };

  const titleHandler = (e) => {
    setTitle(e);
  };

  const imgHandler = (e) => {
    setImg(e);
  };

  const descriptionHandler = (e) => {
    setDescription(e);
  };

  const uploadHandler = async () => {
    if (data && title) {
      await createPost(data, title, img, description);
      history.push("/home");
    }
  };

  return (
    <div className="flex-center my-3 p-3">
      <Card className="flex-center p-4 col-12">
        <div className="col-12 d-flex flex-row justify-content-between align-items-center">
          <h2>Add post:</h2>
          <img src={"post.png"} className="mb-4" />
        </div>
        <div className="col-12 flex-center p-4">
          <TextField
            onChange={titleHandler}
            placeholder="Title"
            className="col-11"
          ></TextField>
          <TextField
            onChange={imgHandler}
            placeholder="Image url"
            className="col-11 mt-3"
          ></TextField>
          <TextArea
            onChange={descriptionHandler}
            placeholder="Add description"
            className="col-11 mt-3"
          ></TextArea>
        </div>
        <CKEditor
          editor={Editor}
          data="<strong>Your story!</strong>"
          onChange={(event, editor) => {
            const data = editor.getData();
            editorHandler(data);
          }}
        />
        <div>
          <Button
            onClick={uploadHandler}
            label="Post"
            color="secondary"
            className="mt-3"
          />
        </div>
      </Card>
    </div>
  );
};

export default Post;
