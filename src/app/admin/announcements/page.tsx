export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { supabase } from "@/lib/supabase";
import { createAnnouncement, deleteAnnouncement } from "@/lib/actions";
import { Trash2, Megaphone } from "lucide-react";
import { Announcement } from "@/lib/types";

export default async function AdminAnnouncements() {
  let announcements: Announcement[] = [];
  try {
    const { data } = await supabase.from('announcements').select('*').order('date', { ascending: false });
    if (data) announcements = data;
  } catch {
    console.warn("Database not accessible during build");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white">Announcements</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden sticky top-28">
            <div className="bg-gray-50 dark:bg-brand-blue p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <Megaphone className="w-5 h-5 text-brand-gold" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Post</h2>
            </div>
            <form action={createAnnouncement} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input required type="text" name="title" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:border-brand-gold outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message Content</label>
                <textarea required name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:border-brand-gold outline-none dark:text-white resize-y" />
              </div>
              <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 px-8 rounded-lg mt-4">
                Publish
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden">
            {announcements.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No announcements.</div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {announcements.map((announcement: Announcement) => (
                  <li key={announcement.id} className="p-6 hover:bg-gray-50 dark:hover:bg-brand-blue-dark/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="pr-8">
                        <h3 className="text-xl font-semibold text-brand-blue dark:text-white mb-2">{announcement.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{announcement.message}</p>
                        <p className="text-xs text-gray-400">
                          {announcement.date.split('T')[0]}
                        </p>
                      </div>
                      <form action={deleteAnnouncement}>
                        <input type="hidden" name="id" value={announcement.id} />
                        <button type="submit" className="p-2 text-red-400 hover:text-red-600 rounded-lg group">
                          <Trash2 className="w-5 h-5 group-hover:scale-110" />
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
