import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ITodo } from "@/interfaces";
import ActionsModal from "./ActionsModal";
import { AddDialog } from "@/components/AddDialog";
import { auth } from "@clerk/nextjs/server";

interface IProps {
  todos: ITodo[];
}

const TodosList = ({ todos }: IProps) => {
  const { userId }: { userId: string | null } = auth();

  let i = 1;
  return (
    <div className="space-y-4 mt-8 w-full lg:w-3/4 mx-auto">
      <div className="flex justify-end">
        <AddDialog userId={userId} />
      </div>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo?.id}>
              <TableCell>{i++}</TableCell>
              <TableCell>{todo?.title}</TableCell>
              <TableCell>{todo?.body}</TableCell>
              <TableCell className="w-[150px]">
                {todo?.completed ? (
                  <Badge className="line-through">completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>In progress</Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center space-x-2 justify-end">
                <ActionsModal todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {todos?.length ? todos?.length : "YOU DON'T HAVE ANY TODO YET!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TodosList;
