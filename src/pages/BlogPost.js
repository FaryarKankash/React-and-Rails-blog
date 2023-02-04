import { Button, Card, Image } from "@sonnat/ui";
import { useParams } from "react-router-dom";
import usePost from "../hooks/post";
import { useState } from "react";
import { useEffect } from "react";
import ClipSpinner from "@sonnat/ui/Spinner/Clip";

const BlogPost = () => {
  const [post, setPost] = useState();
  const { readPost } = usePost();
  const { id } = useParams();

  async function getEntity() {
    const res = await readPost(id);
    setPost(res);
  }

  useEffect(() => {
    getEntity();
  }, []);

  return (
    <div className="flex-center my-3 p-3">
      {post ? (
        <Card className="p-4 col-12">
          <div className="flex-center col-12">
            <img
              src={post.image}
              width="1200"
              className="mb-3 col-5 blog-image"
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </Card>
      ) : (
        <div className="flex-center">
          <ClipSpinner />
        </div>
      )}
    </div>
  );
};

export default BlogPost;
