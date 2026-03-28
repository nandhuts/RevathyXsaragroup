import { createBusiness } from "./actions";
import Link from "next/link";
import { ArrowLeft, Building, Image as ImageIcon, Map, Megaphone } from "lucide-react";

export default function NewBusinessPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/businesses" className="flex items-center text-gray-500 hover:text-brand-blue dark:hover:text-brand-gold transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Businesses
        </Link>
      </div>

      <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-lg border border-gray-100 dark:border-brand-blue-light overflow-hidden">
        <div className="bg-gray-50 dark:bg-brand-blue flex items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="bg-brand-gold/10 p-3 rounded-full mr-4">
            <Building className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Upcoming Business</h1>
            <p className="text-gray-500 text-sm">Create a new company portfolio entry.</p>
          </div>
        </div>

        <form action={createBusiness} className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                <input required type="text" name="name" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue-dark focus:ring-2 focus:ring-brand-gold dark:text-white" placeholder="E.g., Revathy Fuels" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input required type="text" name="category" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue-dark focus:ring-2 focus:ring-brand-gold dark:text-white" placeholder="E.g., Fuel & Gas" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Megaphone className="w-4 h-4 mr-2 text-brand-gold" /> Business Description
              </label>
              <textarea required name="description" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue-dark focus:ring-2 focus:ring-brand-gold outline-none transition-all dark:text-white resize-y" placeholder="Describe the business operations..." />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-brand-gold" /> Image URL
              </label>
              <input required type="text" name="image" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue-dark focus:ring-2 focus:ring-brand-gold dark:text-white" placeholder="https://images.unsplash.com/..." />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Map className="w-4 h-4 mr-2 text-brand-gold" /> Headquarter Location
              </label>
              <input type="text" name="location" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue-dark focus:ring-2 focus:ring-brand-gold dark:text-white" placeholder="E.g., North Avenue Hub, Kerala" />
            </div>
          </div>
          <div className="pt-8 flex justify-end">
            <button type="submit" className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-3 px-8 rounded-xl shadow-md">Create Business</button>
          </div>
        </form>
      </div>
    </div>
  );
}
