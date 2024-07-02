import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TodoFormValues } from "@/schema";
import { todoFormSchema } from "@/schema";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { ITodo } from "@/interfaces";
import { updateTodoAction } from "@/actions/todo.actions";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  todo: ITodo | null;
}

const EditDialog = ({ open, onClose, todo }: EditDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const defaultValues: Partial<TodoFormValues> = {
    title: todo?.title || "",
    body: todo?.body || "",
    completed: todo?.completed || false,
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TodoFormValues) => {
    setIsLoading(true);
    try {
      await updateTodoAction(todo?.id || "", data);
      onClose();
      toast({
        title: "Success",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <div className="text-white">
              Your todo was updated successfully:
            </div>
            <pre className="text-white overflow-hidden">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex gap-2 text-white">
                  <span className="font-bold">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </pre>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error submitting form", error);
      toast({
        title: "Error",
        description: "There was an error submitting the form.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Todo title" {...field} />
                    </FormControl>
                    <FormDescription>Tell us todo title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid items-center gap-4 py-2">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about task"
                          className="resize-none w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tell us a little bit about your task
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="items-top flex space-x-2 py-2">
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Completed</FormLabel>
                      </div>
                      <FormDescription>
                        If you have completed your task, check the box
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" isLoading={isLoading}>
                  Update Todo
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
