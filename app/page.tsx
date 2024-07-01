import { getTodoListAction } from "@/actions/todo.actions";
import TodosList from "@/components/TodoList";

const Home = async () => {
  const todos = await getTodoListAction();

  return (
    <main className="container">
      <TodosList todos={todos} />
    </main>
  );
};

export default Home;
