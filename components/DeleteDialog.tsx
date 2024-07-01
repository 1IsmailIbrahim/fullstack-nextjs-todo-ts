import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ITodo } from "@/interfaces";
interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            todo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
