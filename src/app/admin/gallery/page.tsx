export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { supabase } from "@/lib/supabase";
import { createGalleryImage, deleteGalleryImage } from "@/lib/actions";
import { Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Gallery } from "@/lib/types";

export default async function AdminGallery() {
  let images: Gallery[] = [];
  try {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (data) images = data;
  } catch {
    console.warn("Database not accessible during build");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-blue dark:text-white">Gallery Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload New Image Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light overflow-hidden sticky top-28">
            <div className="bg-gray-50 dark:bg-brand-blue p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-brand-gold" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Photo</h2>
            </div>
            <form action={createGalleryImage} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input required type="text" name="image" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="https://images.unsplash.com/..." />
                <p className="mt-2 text-xs text-gray-500">Provide an Unsplash URL (e.g. from images.unsplash.com).</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category (Optional)</label>
                <input type="text" name="category" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="E.g., Event" defaultValue="General" />
              </div>
              <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-3 px-8 rounded-lg transition-all shadow-md mt-4">
                Upload Photo
              </button>
            </form>
          </div>
        </div>

        {/* List of Gallery Photos */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-brand-blue-light rounded-2xl shadow-sm border border-gray-100 dark:border-brand-blue-light p-6">
            {images.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No photos in gallery yet. Add some on the left!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((item: Gallery) => (
                  <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square border border-gray-200 dark:border-gray-700">
                    <Image src={item.image} alt={item.category} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <form action={deleteGalleryImage}>
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="p-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors" title="Delete Image">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="bg-brand-blue-dark/80 px-2 py-1 rounded truncate">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
