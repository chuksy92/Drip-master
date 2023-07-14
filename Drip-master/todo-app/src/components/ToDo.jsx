import Button from "./Button";
import ButtonGreen from "./ButtonGreen";
import ButtonRed from "./ButtonRed";
import { useState, useEffect } from "react";
import { getTodos, deleteTodo, updateTodo } from "../services/todoService";
import { toast } from "react-toastify";
import NewToDo from "./NewToDo";

const ToDo = ({ user }) => {
  const [todo, setTodo] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);
  const [active, setActive] = useState(false);
  const [addToDo, setAddToDo] = useState(false);

  const handleClick = (todo) => {
    setActiveTodo(todo);
    setActive(true);
  };

  const handleDelete = async (item) => {
    const originalTodo = todo;
    const updatedToDo = originalTodo.filter((i) => i._id !== item._id);
    setTodo(updatedToDo);
    try {
      await deleteTodo(item._id);
      toast.error("To Do deleted");
    } catch (err) {}
  };

  const handleComplete = async (item) => {
    try {
      const updatedTodo = todo.map((i) =>
        i._id === item._id ? { ...i, completed: !i.completed } : i
      );
      setTodo(updatedTodo);
      await updateTodo(item._id, !item.completed);
      toast.success("To Do updated successfully");
    } catch (err) {}
  };

  const handleAddToDo = () => {
    setAddToDo(true);
  };

  const handleAddedToDo = async () => {
    // setAddPost(false);
    // setActivePost(null);
    const { data } = await getTodos();
    setTodo(data);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await getTodos();
      setTodo(data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex gap-8 items start">
      <div className="flex gap-4 flex-col p-8 items-start">
        {active ? (
          <NewToDo user={user} todo={activeTodo} label="Edit To Do" />
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">To Do List</h1>
              <Button onClick={handleAddToDo} label="Add To Do" />
            </div>

            {todo.map((item) => (
              <div>
                <div>Title: {item.title}</div>
                <div>Description: {item.description}</div>
                <div className="flex gap-4">
                  <Button label="Edit" onClick={() => handleClick(item)} />
                  <ButtonRed
                    onClick={() => handleDelete(item)}
                    label="Delete"
                  />
                  {item.completed ? (
                    <ButtonGreen
                      onClick={() => handleComplete(item)}
                      label="Mark as Incomplete"
                    />
                  ) : (
                    <ButtonGreen
                      onClick={() => handleComplete(item)}
                      label="Mark as Complete"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {addToDo && (
        <NewToDo user={user} label="New To Do" onAddedToDo={handleAddedToDo} />
      )}
    </div>
  );
};

export default ToDo;
