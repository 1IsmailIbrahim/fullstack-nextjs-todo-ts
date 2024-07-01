"use server";

import { TodoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
};
export const createTodoAction = async (
  data: TodoFormValues,
  userId: string | null
) => {
  await prisma.todo.create({
    data: { ...data, user_id: userId },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
};
export const updateTodoAction = async (id: string, data: TodoFormValues) => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  return updatedTodo;
};
