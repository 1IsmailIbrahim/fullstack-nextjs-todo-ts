"use server";

import { TodoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  return await prisma.todo.findMany();
};
export const createTodoAction = async (data:TodoFormValues) => {
  await prisma.todo.create({
    data,
  });
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
