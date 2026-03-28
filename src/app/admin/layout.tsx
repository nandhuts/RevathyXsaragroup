import Link from "next/link";
import { LayoutDashboard, Building2, Megaphone, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/app/login/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-blue flex">
      {/* Sidebar sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-brand-blue-dark border-r border-gray-200 dark:border-brand-blue-light flex flex-col pt-20">
        <div className="flex-grow flex flex-col px-4 space-y-2 mt-8">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-brand-blue-light/10 hover:text-brand-blue dark:hover:text-white group transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-brand-gold" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/businesses" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-brand-blue-light/10 hover:text-brand-blue dark:hover:text-white group transition-colors">
            <Building2 className="w-5 h-5 text-gray-400 group-hover:text-brand-gold" />
            <span className="font-medium">Businesses</span>
          </Link>
          <Link href="/admin/announcements" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-brand-blue-light/10 hover:text-brand-blue dark:hover:text-white group transition-colors">
            <Megaphone className="w-5 h-5 text-gray-400 group-hover:text-brand-gold" />
            <span className="font-medium">Announcements</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-brand-blue-light/10 hover:text-brand-blue dark:hover:text-white group transition-colors">
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-brand-gold" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-brand-blue-light flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-blue-light/10 group transition-colors">
            <LogOut className="w-5 h-5 rotate-180" />
            <span className="font-medium">View Site</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 pt-20 relative">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
