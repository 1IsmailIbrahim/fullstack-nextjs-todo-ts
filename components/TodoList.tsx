import React from "react";
import { getTodoListAction } from "@/actions/todo.actions";

const TodoList = async () => {
  const todos = await getTodoListAction();

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="border border-gray-500 rounded-md p-2 my-2"
        >
          <h3>{todo.title}</h3>
          <p className="text-gray-400">{todo.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
