import { useEffect, useState } from "react";
import Button from "../components/Button";
import NewToDo from "../components/NewToDo";
import Posts from "../components/Posts";
import ToDo from "../components/ToDo";
import auth from "../services/authService";
import { getUsers } from "../services/userService";
import UserDetails from "../components/UserDetails";

const Home = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  const [showToDo, setShowToDo] = useState(true);
  const [addToDo, setAddToDo] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handlePostClick() {
    setShowPosts(true);
    setShowToDo(false);
    setAddToDo(false);
    setShowUser(false);
  }

  function handleToDoClick() {
    setShowToDo(true);
    setShowPosts(false);
    setAddToDo(false);
    setShowUser(false);
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user);
    setShowUser(true);
    setShowPosts(false);
    setShowToDo(false);
    setAddToDo(false);
  };

  function handleShowPosts() {
    setShowPosts(true);
    setShowToDo(false);
    setAddToDo(false);
    setShowUser(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.getCurrentUser();
      const { data } = await getUsers();
      setCurrentUser(user);
      setAllUsers(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-1/4 pl-8 pt-8 bg-slate-200 h-screen gap-2 flex flex-col">
        <form action="">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search"
            className="p-2 rounded w-2/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        {allUsers
          .filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((user) => (
            <div
              onClick={() => handleUserClick(user)}
              className="border-slate-100 border-b-2 cursor-pointer hover:bg-slate-300 active:bg-slate-400 "
            >
              {user.name}
            </div>
          ))}
      </div>
      <div className="flex w-3/4">
        <div>
          {showPosts && (
            <Posts onPostAdded={handleShowPosts} user={currentUser} />
          )}

          {addToDo && <NewToDo user={currentUser} />}
          {showToDo && <ToDo user={currentUser} />}
          {showUser && <UserDetails user={selectedUser} />}
        </div>
        <div className="flex gap-4 h-[4rem] py-4 px-6 justify-end w-3/4">
          <Button onClick={handlePostClick} label="Posts" />
          <Button onClick={handleToDoClick} label="To Do" />
          {currentUser ? (
            <div>{currentUser.name}</div>
          ) : (
            <a href="sign-up">
              <Button label="Sign Up" />
            </a>
          )}

          {currentUser ? (
            <a href="/logout">
              <Button label="Log Out" />
            </a>
          ) : (
            <a href="sign-in">
              <Button label="Log In" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
