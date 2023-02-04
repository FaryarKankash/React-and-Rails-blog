import config from "./../config.json";

const usePost = () => {
  async function readAllPosts() {
    const data = await fetch(`${config.serverAddress}/post`).then((res) => {
      return res.json();
    });
    return data;
  }

  async function readPost(id) {
    const data = await fetch(`${config.serverAddress}/post/${id}`).then(
      (res) => {
        return res.json();
      }
    );
    return data;
  }

  async function readUserPost() {
    const data = await fetch(`${config.serverAddress}/post/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      return res.json();
    });
    return data;
  }

  async function createPost(content, title, image, description) {
    const data = await fetch(`${config.serverAddress}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        content: content,
        image: image,
        description: description,
      }),
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  async function deletePost(id) {
    const data = await fetch(`${config.serverAddress}/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  async function updatePost(id, title, description, image, content) {
    const data = await fetch(`${config.serverAddress}/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        image: image,
        content: content,
      }),
    }).then((res) => {
      return res.json();
    });

    return data;
  }

  return {
    readAllPosts,
    readPost,
    createPost,
    readUserPost,
    deletePost,
    updatePost,
  };
};

export default usePost;
