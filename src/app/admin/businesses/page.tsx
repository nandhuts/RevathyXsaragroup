export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import Image from "next/image";
import { Business } from "@/lib/types";

export default async function AdminBusinesses() {
  let businesses: Business[] = [];
  try {
    const { data } = await supabase.from('businesses').select('*').order('id', { ascending: true });
    if (data) businesses = data;
  } catch {
    console.warn("Database not accessible during build");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white">Manage Businesses</h1>
        <Link 
          href="/admin/businesses/new" 
          className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-2 px-6 rounded-lg transition-all flex items-center shadow-sm"
        >
          + Add New Business
        </Link>
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-brand-blue-dark">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Name & Preview</th>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Location & Category</th>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {businesses.map((business: Business) => {
              const slug = business.name.toLowerCase().replace(/ /g, '-');
              return (
                <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-brand-blue-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={business.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"} alt={business.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-brand-blue dark:text-white mb-1">{business.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{business.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span className="font-semibold text-gray-500 mr-2">Category:</span>
                      {business.category || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-[200px] truncate">
                      <span className="font-semibold text-gray-500 mr-2">Loc:</span>
                      {business.location || 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/businesses/${slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-brand-blue dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-brand-blue-dark transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/businesses/${business.id}`}
                        className="p-2 text-brand-gold hover:text-white rounded-lg hover:bg-brand-gold transition-colors"
                        title="Edit Business"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
