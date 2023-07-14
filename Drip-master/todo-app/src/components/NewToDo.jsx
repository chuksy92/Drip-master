import Button from "./Button";
import { useEffect, useState } from "react";
import { saveTodo } from "../services/todoService";
import { toast } from "react-toastify";

const NewToDo = ({ user, todo, label, onAddedToDo }) => {
  const [newTodo, setNewToDo] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...newTodo };
    data[input.name] = input.value;
    setNewToDo(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoData = { ...newTodo };
      todoData.userId = user._id;
      await saveTodo(todoData);
      toast.success("To Do added successfully");
      onAddedToDo();
      setNewToDo({});
    } catch (err) {}
  };

  useEffect(() => {
    if (todo) {
      setNewToDo({
        title: todo.title,
        description: todo.description,
      });
    }
  }, []);

  return (
    <div className="flex gap-4 flex-col p-8 items-start">
      <h1 className="font-bold text-lg">{label}</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            className="border-2 rounded p-2"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={newTodo.title || ""}
          />
          <textarea
            className="border-2 rounded p-2"
            id=""
            cols="30"
            rows="3"
            placeholder="Add To Do..."
            name="description"
            onChange={handleChange}
            value={newTodo.description || ""}
          />
          <Button label="Add" />
        </div>
      </form>
    </div>
  );
};

export default NewToDo;
