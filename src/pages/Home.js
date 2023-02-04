import { Button, Card, TextField, Text, Code } from "@sonnat/ui";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import usePost from "../hooks/post";
import { useEffect } from "react";

const Home = () => {
  const { readAllPosts } = usePost();

  const [list, setList] = useState([]);

  const getEntity = async () => {
    const res = await readAllPosts();
    setList(res);
  };

  useEffect(() => {
    getEntity();
  }, []);

  return (
    <div className="flex-row justify-content-start align-items-center col-12">
      {list.map((item) => {
        return (
          <BlogCard
            key={item.id}
            name={item.title}
            description={item.description}
            img={item.image}
            id={item.id}
          />
        );
      })}
    </div>
  );
};

export default Home;
