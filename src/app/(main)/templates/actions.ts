"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createResume(templateId: string) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const resume = await prisma.resume.create({
        data: {
            userId,
            templateId,
            title: "Untitled resume",
        },
    });

    return resume;
} 