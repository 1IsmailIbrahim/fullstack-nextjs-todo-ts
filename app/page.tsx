import { CustomDialog } from "@/components/CustomDialog";
import TodoList from "@/components/TodoList";

const Home = () => {
  return (
    <main className="container">
      <CustomDialog />
      <TodoList />
    </main>
  );
};

export default Home;
