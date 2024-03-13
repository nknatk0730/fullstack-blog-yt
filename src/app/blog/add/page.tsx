'use client'

import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addTodo } from "./actions";

const prisma = new PrismaClient();

const postBlog =async (title:string | undefined, description: string | undefined) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
    });

    return res.json();
}

export default function PostBlog() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    // const titleRef = useRef<HTMLFormElement>(null);
    // const descriptionRef = useRef<HTMLFormElement>(null);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     toast.loading('loading...', {id: '1'});
    //     await postBlog(titleRef.current?.value, descriptionRef.current?.value);
    //     toast.success('Success', {id: '1'});

    //     router.push('/');
    //     router.refresh();
    // };

    // server action


    return (
        <>
        <Toaster />
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
                <form 
                    // onSubmit={handleSubmit}
                    action={async (formData) => {
                        await addTodo(formData);
                        formRef.current?.reset();
                    }}
                    ref={formRef}
                >
                    <input
                        name="title"
                        // ref={titleRef}
                        placeholder="タイトルを入力"
                        type="text"
                        className="rounded-md px-4 w-full py-2 my-2"
                    />
                    <textarea
                        name="description"
                        // ref={descriptionRef}
                        placeholder="記事詳細を入力"
                        className="rounded-md px-4 py-2 w-full my-2"
                    ></textarea>
                    <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                        投稿
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};