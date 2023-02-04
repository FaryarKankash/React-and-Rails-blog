import {
  Button,
  Card,
  TextField,
  Text,
  Code,
  TextArea,
  ClipSpinner,
} from "@sonnat/ui";
import { useEffect, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import usePost from "../hooks/post";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostUpdate = () => {
  const [data, setData] = useState();
  const [postId, setPostId] = useState();
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [description, setDescription] = useState();
  const history = useHistory();
  const { id } = useParams();
  const { createPost, readPost, updatePost } = usePost();

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
      await updatePost(postId, title, description, img, data);
      history.push("/User");
    }
  };

  const getEntity = async () => {
    const data = await readPost(id);
    setPostId(data.id);
    setData(data.content);
    setTitle(data.title);
    setImg(data.image);
    setDescription(data.description);
  };

  useEffect(() => {
    getEntity();
  }, []);

  return (
    <div className="flex-center my-3 p-3">
      <Card className="flex-center p-4 col-12">
        {data && title && img && description ? (
          <>
            <div className="col-12 d-flex flex-row justify-content-between align-items-center">
              <h2>Add post:</h2>
            </div>
            <div className="col-12 flex-center p-4">
              <TextField
                value={title}
                onChange={titleHandler}
                placeholder="Title"
                className="col-11"
              ></TextField>
              <TextField
                value={img}
                onChange={imgHandler}
                placeholder="Image url"
                className="col-11 mt-3"
              ></TextField>
              <TextArea
                value={description}
                onChange={descriptionHandler}
                placeholder="Add description"
                className="col-11 mt-3"
              ></TextArea>
            </div>
            <CKEditor
              editor={Editor}
              data={data}
              onChange={(event, editor) => {
                const data = editor.getData();
                editorHandler(data);
              }}
            />
            <div>
              <Button
                onClick={uploadHandler}
                label="Update"
                color="primary"
                className="mt-3"
              />
            </div>
          </>
        ) : (
          <ClipSpinner />
        )}
      </Card>
    </div>
  );
};

export default PostUpdate;
