import React, { useEffect } from "react";
import "./App.css";

// import axios from "axios";

import Todo from "./Todo";

function App() {
  const [todos, setTodos] = React.useState<any>([
    { id: "1", name: "Todo 1", completed: false },
    { id: "2", name: "Todo 2", completed: false },
    { id: "3", name: "Todo 3", completed: true },
    // { id: "4", name: "Todo 4", completed: false },
    // { id: "5", name: "Todo 5", completed: true },
  ]);
  const [todoName, setTodoName] = React.useState("");

  const [todosFilterName, setTodosFilterName] = React.useState("all");

  function filterTodos(todos: Array<any>) {
    switch (todosFilterName) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo: { completed: boolean }) => !todo.completed);
      case "completed":
        return todos.filter((todo: { completed: boolean }) => todo.completed);
      default:
        return todos;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!todoName) return;

    const newTodoObj = {
      id: Math.random().toString(36),
      name: todoName,
      completed: false,
    };

    const newTodo = todos;

    // const newTodo = todos.slice();
    newTodo.unshift(newTodoObj);
    setTodos(newTodo);
    // setTodosFiltered(newTodo);
    // handleFilter("all");
    setTodoName("");
  };

  const handleFilter = (e: string) => {
    setTodosFilterName(e);
    switch (e) {
      case "all":
        const allTodo = todos;
        // setTodosFiltered(allTodo);
        break;
      case "active":
        const activeTodo = todos.filter(
          (todo: { completed: boolean }) => todo.completed == false
        );
        // setTodosFiltered(activeTodo);
        break;
      case "completed":
        const completedTodo = todos.filter(
          (todo: { completed: boolean }) => todo.completed == true
        );
        // setTodosFiltered(completedTodo);
        break;
      default:
        break;
    }
  };

  const toggleCompleted = (id: any) => {
    const newTodo = todos.slice();

    newTodo.map(
      (
        todo: {
          id: any;
        },
        index: string | number
      ) => {
        if (todo.id == id) {
          newTodo[index] = { ...todo, completed: !newTodo[index].completed };
        }
        return todo;
      }
    );

    setTodos(newTodo);
  };

  const deleteTodo = (id: any) => {
    const newTodo = todos.slice();

    // delete todo from array by id
    const index = newTodo.findIndex((todo: { id: any }) => todo.id == id);
    newTodo.splice(index, 1);

    setTodos(newTodo);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="text-center pt-5">React Todo App</h2>
          <p className="text-center text-secondary">
            {/* A simple MERN (Mongo, Express, ReactJS, NodeJS) Todo-List App */}
          </p>
          <form method="get" className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form form-control"
              placeholder="Add new..."
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Add
            </button>
          </form>
          <div className="btn-group mt-3">
            <a
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName === "all" && "active"
              }`}
              onClick={() => handleFilter("all")}
            >
              All
            </a>
            <a
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName === "active" && "active"
              }`}
              onClick={() => handleFilter("active")}
            >
              Active
            </a>
            <a
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName === "completed" && "active"
              }`}
              onClick={() => handleFilter("completed")}
            >
              Completed
            </a>
          </div>

          {filterTodos(todos).map((item: any, key: any) => {
            return (
              <Todo
                key={key}
                // id={todo._id}
                name={item.name}
                completed={item.completed}
                deleteTodo={() => deleteTodo(item.id)}
                toggleCompleted={() => toggleCompleted(item.id)}
                // deleteClick={handleDelete}
              />
            );
          })}

          {/* ); */}
          {/* })} */}

          {todos.length === 0 && (
            <div className="alert alert-primary mt-3" role="alert">
              No todos found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
