import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ITodo } from "@/interfaces";
import ActionsModal from "./ActionsModal";

interface IProps {
  todos: ITodo[];
}

const TodosList: React.FC<IProps> = ({ todos }) => {
  let i = 1;
  return (
    <div>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{i++}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.body}</TableCell>
              <TableCell className="w-[150px]">
                {todo.completed ? (
                  <Badge className="line-through">completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>In progress</Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center space-x-2">
                <ActionsModal todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosList;
