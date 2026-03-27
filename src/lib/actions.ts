"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateBusiness(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  
  await prisma.business.update({
    where: { id },
    data: {
      name,
      shortDescription,
      fullDescription,
      imageUrl,
      phone,
      email,
      address,
    },
  });

  revalidatePath("/");
  revalidatePath(`/businesses/[slug]`, 'page');
  revalidatePath(`/admin/businesses`);
  
  redirect("/admin/businesses");
}

export async function createMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  await prisma.message.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });

  revalidatePath("/admin");
}

export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.announcement.create({
    data: {
      title,
      content,
      isPublished: true,
    },
  });

  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.announcement.delete({
    where: { id },
  });
  revalidatePath("/admin/announcements");
}
