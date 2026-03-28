export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { Building2, Megaphone, CheckCircle2, MessageSquare } from "lucide-react";
import { MessageRecord } from "@/lib/types";

export default async function AdminDashboard() {
  let businessCount = 0, announcementCount = 0, messageCount = 0;
  let recentMessages: MessageRecord[] = [];
  try {
    const { count: bCount } = await supabase.from('businesses').select('*', { count: 'exact', head: true });
    const { count: aCount } = await supabase.from('announcements').select('*', { count: 'exact', head: true });
    const { count: mCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
    
    businessCount = bCount || 0;
    announcementCount = aCount || 0;
    messageCount = mCount || 0;

    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (messages) recentMessages = messages;
  } catch {
    console.warn("Database not accessible during build");
  }

  const stats = [
    { title: "Active Businesses", value: businessCount, icon: Building2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { title: "Announcements", value: announcementCount, icon: Megaphone, color: "text-brand-gold", bg: "bg-brand-gold/10" },
    { title: "New Enquiries", value: messageCount, icon: MessageSquare, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-4 py-2 rounded-full border border-green-200 dark:border-green-500/20">
          <CheckCircle2 className="w-4 h-4" /> System Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-brand-blue-light rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-brand-blue-light flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <div className="bg-gray-50 dark:bg-brand-blue-dark/50 p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-gold" />
            Recent Website Enquiries
          </h2>
        </div>
        
        {recentMessages.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No recent messages from the website.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 dark:hover:bg-brand-blue-dark/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-brand-blue dark:text-white flex items-center gap-2">
                    {msg.name}
                    <span className="text-sm text-gray-500">{msg.email}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.created_at).toISOString().split('T')[0]}
                  </span>
                </div>
                {msg.subject && <p className="text-sm font-medium text-brand-blue dark:text-gray-300 mb-1">Sub: {msg.subject}</p>}
                <p className="text-gray-600 dark:text-gray-400 text-sm">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
