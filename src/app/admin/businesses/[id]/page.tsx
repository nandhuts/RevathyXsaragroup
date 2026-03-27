import { prisma } from "@/lib/prisma";
import { updateBusiness } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Image as ImageIcon, Map, Megaphone } from "lucide-react";

export default async function EditBusinessPage({ params }: { params: { id: string } }) {
  const business = await prisma.business.findUnique({
    where: { id: params.id },
  });

  if (!business) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/businesses" className="flex items-center text-gray-500 hover:text-brand-blue dark:hover:text-brand-gold transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Businesses
        </Link>
        <span className="bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
          Editing Business
        </span>
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-lg border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <div className="bg-gray-50 dark:bg-brand-blue flex items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="bg-brand-blue-light/10 p-3 rounded-full mr-4">
            <Edit3 className="w-6 h-6 text-brand-blue dark:text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {business.name}
            </h1>
            <p className="text-gray-500 text-sm">Update company description, images, and contact information.</p>
          </div>
        </div>

        <form action={updateBusiness} className="p-8 space-y-8">
          <input type="hidden" name="id" value={business.id} />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                <input required type="text" name="name" defaultValue={business.name} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                <input required type="text" name="shortDescription" defaultValue={business.shortDescription} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Megaphone className="w-4 h-4 mr-2 text-brand-gold" />
                Full Page Description
              </label>
              <textarea required name="fullDescription" rows={5} defaultValue={business.fullDescription} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white resize-y" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-brand-gold" />
                Cover Image URL
              </label>
              <input required type="text" name="imageUrl" defaultValue={business.imageUrl} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
              <p className="mt-2 text-xs text-gray-500">Provide an Unsplash URL (e.g. from images.unsplash.com) or an absolute image path.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input type="text" name="phone" defaultValue={business.phone || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" name="email" defaultValue={business.email || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Map className="w-4 h-4 mr-2 text-brand-gold" />
                Physical Address
              </label>
              <input type="text" name="address" defaultValue={business.address || ""} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" />
            </div>
            
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <Link href="/admin/businesses" className="px-6 py-3 font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 border border-transparent mr-4">
              Cancel
            </Link>
            <button type="submit" className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
