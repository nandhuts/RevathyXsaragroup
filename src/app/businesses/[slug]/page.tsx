export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BusinessDetails({ params }: { params: { slug: string } }) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) {
    notFound();
  }

  const parseServices = (servicesStr: string) => {
    try {
      return JSON.parse(servicesStr) as string[];
    } catch {
      return [] as string[];
    }
  };

  const services = parseServices(business.services);

  return (
    <div className="flex flex-col">
      <main className="flex-grow bg-gray-50 dark:bg-brand-blue-dark">
        {/* HERO SECTION */}
        <section className="relative h-[60vh] flex items-end pb-12">
          <div className="absolute inset-0 bg-brand-blue-dark/60 z-10" />
          <Image
            src={business.imageUrl}
            alt={business.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/50 to-transparent z-10" />
          
          <div className="relative z-20 px-4 max-w-7xl mx-auto w-full">
            <Link href="/#businesses" className="inline-flex items-center text-gray-300 hover:text-brand-gold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Businesses
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {business.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl font-light">
              {business.shortDescription}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-brand-blue dark:text-white mb-6">About {business.name}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {business.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-6">Key Services & Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service, i) => (
                      <div key={i} className="flex items-center p-4 bg-white dark:bg-brand-blue-light/50 rounded-xl border border-gray-100 dark:border-brand-blue-light shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" />
                        <span className="font-medium text-brand-blue dark:text-gray-200">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* Extra imagery / gallery for this business can be added here */}
                 <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl mt-12">
                     <Image
                      src={business.imageUrl}
                      alt={business.name + " facility"}
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>

              {/* Sidebar Contact & Map */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-8">
                  <div className="bg-white dark:bg-brand-blue-light/50 rounded-2xl p-8 border border-gray-100 dark:border-brand-blue-light shadow-lg">
                    <h3 className="text-2xl font-bold text-brand-blue dark:text-white mb-6">Contact Details</h3>
                    <ul className="space-y-6">
                      {business.address && (
                        <li className="flex items-start">
                          <MapPin className="w-6 h-6 text-brand-gold mr-4 flex-shrink-0 mt-1" />
                          <span className="text-gray-600 dark:text-gray-300">{business.address}</span>
                        </li>
                      )}
                      {business.phone && (
                        <li className="flex items-center">
                          <Phone className="w-6 h-6 text-brand-gold mr-4 flex-shrink-0" />
                          <a href={`tel:${business.phone}`} className="text-brand-blue dark:text-brand-gold font-medium hover:underline">{business.phone}</a>
                        </li>
                      )}
                      {business.email && (
                        <li className="flex items-center">
                          <Mail className="w-6 h-6 text-brand-gold mr-4 flex-shrink-0" />
                          <a href={`mailto:${business.email}`} className="text-brand-blue dark:text-brand-gold font-medium hover:underline">{business.email}</a>
                        </li>
                      )}
                    </ul>
                  </div>

                  {business.locationMap && (
                    <div className="h-[300px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                      <iframe 
                        src={business.locationMap}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}

                  <a 
                    href="#contact" 
                    className="block w-full text-center bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
                  >
                    Send an Enquiry
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
