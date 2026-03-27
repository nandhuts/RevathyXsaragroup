export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Building2, Megaphone, CheckCircle2, MessageSquare } from "lucide-react";
import { Message } from "@prisma/client";

export default async function AdminDashboard() {
  let businessCount = 0, announcementCount = 0, achievementCount = 0, messageCount = 0;
  let recentMessages: Message[] = [];
  try {
    businessCount = await prisma.business.count();
    announcementCount = await prisma.announcement.count();
    achievementCount = await prisma.achievement.count();
    messageCount = await prisma.message.count();

    recentMessages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (e) {
    console.warn("Database not accessible during build");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-blue dark:text-white mb-8">System Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-brand-blue-light border border-gray-100 dark:border-brand-blue-light rounded-xl p-6 shadow-sm flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mr-5">
            <Building2 className="w-6 h-6 text-brand-blue dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide border-b border-transparent">Businesses</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{businessCount}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-brand-blue-light border border-gray-100 dark:border-brand-blue-light rounded-xl p-6 shadow-sm flex items-center">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mr-5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide border-b border-transparent">Achievements</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{achievementCount}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-brand-blue-light border border-gray-100 dark:border-brand-blue-light rounded-xl p-6 shadow-sm flex items-center">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mr-5">
            <Megaphone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide border-b border-transparent">Announcements</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{announcementCount}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-brand-blue-light border border-gray-100 dark:border-brand-blue-light rounded-xl p-6 shadow-sm flex items-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mr-5">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide border-b border-transparent">Messages</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{messageCount}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="text-2xl font-bold text-brand-blue dark:text-white mb-6">Recent Enquiries</h2>
      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No recent messages found. When customers use the Contact Form, they will appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentMessages.map((msg: Message) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 dark:hover:bg-brand-blue-dark/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white mr-3">{msg.name}</span>
                    <span className="text-sm text-gray-500">{msg.email}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {msg.createdAt.toISOString().split('T')[0]}
                  </span>
                </div>
                {msg.subject && <p className="text-sm font-medium text-brand-blue dark:text-gray-300 mb-1">Sub: {msg.subject}</p>}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
