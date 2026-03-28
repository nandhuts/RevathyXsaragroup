"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateBusiness(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  
  await supabase
    .from("businesses")
    .update({ name, description, image, category, location })
    .eq("id", id);

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

  await supabase
    .from("messages")
    .insert([{ name, email, subject, message }]);

  revalidatePath("/admin");
}

export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const date = new Date().toISOString();

  await supabase
    .from("announcements")
    .insert([{ title, message, date }]);

  revalidatePath("/");
  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const id = formData.get("id") as string;
  
  await supabase
    .from("announcements")
    .delete()
    .eq("id", id);
    
  revalidatePath("/");
  revalidatePath("/admin/announcements");
}

export async function createGalleryImage(formData: FormData) {
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const created_at = new Date().toISOString();

  await supabase
    .from("gallery")
    .insert([{ image, category, created_at }]);

  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  const id = formData.get("id") as string;
  
  await supabase
    .from("gallery")
    .delete()
    .eq("id", id);
    
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
