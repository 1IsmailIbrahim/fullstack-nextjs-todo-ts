import { getTodoListAction } from "@/actions/todo.actions";
import { CustomDialog } from "@/components/CustomDialog";
import TodosList from "@/components/TodoList";

const Home = async() => {
  const todos = await getTodoListAction();

  return (
    <main className="container">
      <CustomDialog />
      <TodosList todos={todos} />
    </main>
  );
};

export default Home;
