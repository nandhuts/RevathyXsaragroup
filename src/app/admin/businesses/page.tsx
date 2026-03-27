export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import Image from "next/image";

export default async function AdminBusinesses() {
  const businesses = await prisma.business.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white">Manage Businesses</h1>
        {/* Placeholder for Add button if we implemented add functionality. As per design, businesses are core. */}
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-brand-blue-dark">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Name & Preview</th>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Contact Details</th>
              <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {businesses.map((business: any) => (
              <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-brand-blue-dark/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={business.imageUrl} alt={business.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-brand-blue dark:text-white mb-1">{business.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{business.shortDescription}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-semibold text-gray-500 mr-2">Phone:</span>
                    {business.phone || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-500 mr-2">Email:</span>
                    {business.email || 'N/A'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/businesses/${business.slug}`}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
