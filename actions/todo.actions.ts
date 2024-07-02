"use server";

import { TodoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getUserTodosAction = async (userId: string | null) => {
  try {
    return await prisma.todo.findMany({
      where: { user_id: userId as string },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Could not fetch todos");
  }
};

export const createTodoAction = async (
  data: TodoFormValues,
  userId: string | null
) => {
  try {
    await prisma.todo.create({
      data: { ...data, user_id: userId as string },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Could not create todo");
  }
};

export const deleteTodoAction = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Could not delete todo");
  }
};

export const updateTodoAction = async (id: string, data: TodoFormValues) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Could not update todo");
  }
};
