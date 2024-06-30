"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import { toast } from "./ui/use-toast";
import { createTodoAction } from "@/actions/todo.actions";
import { useState } from "react";

const defaultValues: Partial<TodoFormValues> = {
  title: "I own a computer.",
  body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, facere.",
};

export function CustomDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TodoFormValues) => {
    await createTodoAction(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} className="mr-1" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
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
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Completed
                  </label>
                  <p className="text-sm text-muted-foreground">
                    If you have completed your task, check the box
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Todo</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
