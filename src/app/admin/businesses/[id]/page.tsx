export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { updateBusiness } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Image as ImageIcon, Map, Megaphone } from "lucide-react";
import { Business } from "@/lib/types";

export default async function EditBusinessPage({ params }: { params: { id: string } }) {
  let business: Business | null = null;
  
  try {
    const { data } = await supabase.from('businesses').select('*').eq('id', params.id).single();
    if (data) business = data as Business;
  } catch {
    console.warn("Database not accessible during build");
  }

  if (!business) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/businesses" className="flex items-center text-gray-500 hover:text-brand-blue dark:hover:text-brand-gold transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Businesses
        </Link>
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-lg border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <div className="bg-gray-50 dark:bg-brand-blue flex items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="bg-brand-blue-light/10 p-3 rounded-full mr-4">
            <Edit3 className="w-6 h-6 text-brand-blue dark:text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{business.name}</h1>
            <p className="text-gray-500 text-sm">Update content pushed directly to Supabase.</p>
          </div>
        </div>

        <form action={updateBusiness} className="p-8 space-y-8">
          <input type="hidden" name="id" value={business.id} />
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input required type="text" name="name" defaultValue={business.name} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input required type="text" name="category" defaultValue={business.category} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Megaphone className="w-4 h-4 mr-2 text-brand-gold" /> Description
              </label>
              <textarea required name="description" rows={5} defaultValue={business.description} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold outline-none transition-all dark:text-white resize-y" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-brand-gold" /> Image URL
              </label>
              <input required type="text" name="image" defaultValue={business.image || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Map className="w-4 h-4 mr-2 text-brand-gold" /> Location
              </label>
              <input type="text" name="location" defaultValue={business.location || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold dark:text-white" />
            </div>
          </div>
          <div className="pt-8 flex justify-end">
            <button type="submit" className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 px-8 rounded-lg">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
