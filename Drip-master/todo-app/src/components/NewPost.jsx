import Button from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePost } from "../services/postService";
import { toast } from "react-toastify";

const NewPost = ({ user, onPostAdded }) => {
  const [newPost, setNewPost] = useState({});
  // const history = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...newPost };
    data[input.name] = input.value;
    setNewPost(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { ...newPost };
      postData.userId = user._id;
      await savePost(postData);
      toast.success("Post added successfully");
      onPostAdded();
    } catch (err) {}
  };

  return (
    <div className="flex gap-4 flex-col p-8 items-start">
      <h1 className="font-bold text-lg">New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            className="border-2 rounded p-2"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <textarea
            className="border-2 rounded p-2"
            id=""
            cols="30"
            rows="3"
            placeholder="Post someting..."
            name="content"
            onChange={handleChange}
          />
          <Button label="Post" />
        </div>
      </form>
    </div>
  );
};

export default NewPost;
