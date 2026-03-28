export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { Business } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BusinessDetails({ params }: { params: { slug: string } }) {
  let business: Business | null = null;
  try {
    // We compute slug on front end as lowercase name so we match it here.
    // However, Supabase doesn't easily support dynamic string matching derived via slug without a slug column.
    // Instead we query all and find by slug. It's efficient enough for 5 items.
    const { data } = await supabase.from('businesses').select('*');
    if (data) {
      business = data.find((b: Business) => b.name.toLowerCase().replace(/ /g, '-') === params.slug) || null;
    }
  } catch {
    console.warn("Database not accessible during build");
  }

  if (!business) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50 dark:bg-brand-blue-dark">
      <main className="flex-grow">
        <section className="relative h-[60vh] flex items-end pb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src={business.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"}
              alt={`${business.name} Cover`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full block">
            <div className="mb-6 inline-block">
              <Link href="/#businesses" className="inline-flex items-center text-brand-gold hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Businesses
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">
                  {business.category || 'Group Enterprise'}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {business.name}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl font-light">
                  {business.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-brand-blue-light rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
                  <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-6">About {business.name}</h2>
                  <div className="prose dark:prose-invert max-w-none text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                    <p>{business.description}</p>
                    <p>As a key enterprise under the Revathy Xsara Group, we maintain the highest standards of quality, customer satisfaction, and reliable delivery in all our ventures.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-white dark:bg-brand-blue-light rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Contact Information</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-brand-gold/10 p-3 rounded-xl mr-4">
                        <Phone className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Phone</p>
                        <p className="text-brand-blue dark:text-white font-medium">+91 98765 43210</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-brand-gold/10 p-3 rounded-xl mr-4">
                        <Mail className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Email</p>
                        <p className="text-brand-blue dark:text-white font-medium">contact@{business.name.replace(/ /g, '').toLowerCase()}.com</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-brand-gold/10 p-3 rounded-xl mr-4">
                        <MapPin className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Address</p>
                        <p className="text-brand-blue dark:text-white font-medium leading-relaxed">{business.location || 'HQ, Kerala, India'}</p>
                      </div>
                    </li>
                  </ul>
                  <button className="w-full mt-8 bg-brand-blue hover:bg-brand-blue-dark dark:bg-brand-gold dark:hover:bg-brand-gold-dark text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center">
                    Get Directions <ExternalLink className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
