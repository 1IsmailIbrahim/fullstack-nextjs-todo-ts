"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";
import { ITodo } from "@/interfaces";
import EditDialog from "@/components/EditDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteTodoAction } from "@/actions/todo.actions";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ActionsModalProps {
  todo: ITodo;
}
const ActionsModal: React.FC<ActionsModalProps> = ({ todo }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<ITodo | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<ITodo | null>(null);

  const openDeleteDialog = (todo: ITodo) => {
    setTodoToDelete(todo);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setTodoToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setTodoToEdit(null);
    setIsEditDialogOpen(false);
  };

  const onDelete = async () => {
    if (todoToDelete) {
      await deleteTodoAction(todoToDelete.id);
      closeDeleteDialog();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => openEditDialog(todo)}
          >
            <Pen size={16} />
          </Button>
        </DialogTrigger>
        {isEditDialogOpen && (
          <EditDialog
            todo={todoToEdit}
            open={isEditDialogOpen}
            onClose={closeEditDialog}
          />
        )}
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => openDeleteDialog(todo)}
          >
            <Trash2 size={16} />
          </Button>
        </DialogTrigger>
        {isDeleteDialogOpen && (
          <DeleteDialog
            open={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
            onDelete={onDelete}
          />
        )}
      </Dialog>
    </div>
  );
};

export default ActionsModal;
