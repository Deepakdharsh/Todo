import React, { useEffect, useState } from "react";
import List from "../components/List";
import api from "../api/axiosInstance";

function Home() {
  const [todo, setTodo] = useState("");
  const [value, setValue] = useState({
    todo: "",
    dueDate: "",
  });

  async function fetchData() {
    const res = await api.get("/todo/read");
    console.log(res);
    setTodo(res.data.todos);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    value[e.target.id] = e.target.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post("/todo/create", value);
    console.log(res);
    fetchData();

    setValue({})
  }

  return (
    <div className="bg-cyan-100 h-screen w-full flex justify-center items-center">
      <div className="bg-grey w-[500px] h-[400px] flex flex-col items-center p-4 gap-2.5">
        <div className="flex">
          <input
          value={value.todo}
            type="text"
            id="todo"
            onChange={handleChange}
            className="bg-white rounded mr-3"
            placeholder="add todos"
          />
          <input
          value={value.dueDate}
            type="text"
            id="dueDate"
            onChange={handleChange}
            className="bg-white rounded mr-3"
            placeholder="dueDate"
          />
          <button onClick={handleSubmit} className="bg-green-100 px-4 rounded ">
            +
          </button>
        </div>
        <div>
          <ul>
            {todo && todo.map((cur,i) => <List todo={cur.todo} key={i+1} id={cur._id} fnc={fetchData}/>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
