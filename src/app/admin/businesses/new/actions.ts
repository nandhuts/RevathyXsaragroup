import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createBusiness(formData: FormData) {
  "use server";
  
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  
  await supabase
    .from("businesses")
    .insert([{ name, description, image, category, location }]);

  revalidatePath("/");
  revalidatePath(`/admin/businesses`);
  
  redirect("/admin/businesses");
}
