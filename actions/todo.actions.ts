"use server";

import { TodoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return await prisma.todo.findMany();
};
export const createTodoAction = async (data: TodoFormValues) => {
  await prisma.todo.create({
    data,
  });
};
export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: { id },
  });
};
export const updateTodoAction = async (id: string, data: TodoFormValues) => {
  return await prisma.todo.update({
    where: { id },
    data,
  });
};
