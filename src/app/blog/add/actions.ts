'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const addTodo = async (formData: FormData) => {
    const title = formData.get('title',);
    const description = formData.get('description');
    try {
        const allTodo = await prisma.post.create({
            data: {
                title: title?.toString()!,
                description: description?.toString()!
            },
        });
    } catch (error) {
        Error('Error');
    } finally {
        revalidatePath('/');
        redirect('/');
    }
}