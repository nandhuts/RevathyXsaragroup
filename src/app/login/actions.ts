import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  "use server";
  
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "revathy" && password === "sooraj") {
    cookies().set("admin_auth", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      path: "/", 
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    
    redirect("/admin");
  } else {
    // If login fails, redirect back with error flag
    redirect("/login?error=true");
  }
}

export async function logoutAction() {
  "use server";
  cookies().delete("admin_auth");
  redirect("/login");
}
