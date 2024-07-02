import { getUserTodosAction } from "@/actions/todo.actions";
import TodosList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { userId }: { userId: string | null } = auth();

  const todos = await getUserTodosAction(userId);

  return (
    <main className="container">
      <TodosList todos={todos} />
    </main>
  );
};

export default Home;
