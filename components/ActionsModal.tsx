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
const ActionsModal = ({ todo }: ActionsModalProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<ITodo | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<ITodo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      if (todoToDelete) {
        await deleteTodoAction(todoToDelete.id as string);
        closeDeleteDialog();
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
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
            isLoading={isLoading}
          />
        )}
      </Dialog>
    </div>
  );
};

export default ActionsModal;
