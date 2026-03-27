export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Business, Achievement, Announcement } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, ShieldCheck, TrendingUp, Users, Medal, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/home/ContactForm";

export default async function Home() {
  let businesses: Business[] = [];
  let achievements: Achievement[] = [];
  let announcements: Announcement[] = [];

  try {
    businesses = await prisma.business.findMany({
      orderBy: { order: "asc" },
    });
    achievements = await prisma.achievement.findMany({
      orderBy: { order: "asc" },
    });
    announcements = await prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    console.warn("Database not accessible during build");
  }

  const icons = [<Users key={1} className="w-10 h-10 text-brand-gold" />, <Medal key={2} className="w-10 h-10 text-brand-gold" />, <TrendingUp key={3} className="w-10 h-10 text-brand-gold" />, <ShieldCheck key={4} className="w-10 h-10 text-brand-gold" />];

  return (
    <div className="flex flex-col pt-20">
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue-dark/60 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Revathy Xsara Group Corporate"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
              CORPORATE GROUP
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Revathy <span className="text-brand-gold">Xsara</span> Group
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light">
              A growing local business brand with a strong community presence, managing multiple successful enterprises under one trusted name.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#businesses"
                className="bg-brand-gold hover:bg-white hover:text-brand-blue-dark text-brand-blue-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                Explore Our Businesses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-blue-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* LATEST ANNOUNCEMENTS BANNER */}
        {announcements.length > 0 && (
          <section className="bg-brand-gold text-brand-blue-dark py-4 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-3 md:mb-0">
                  <span className="font-bold uppercase tracking-wider text-sm flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
                    Latest Updates
                  </span>
                </div>
                <div className="flex-1 md:px-8 overflow-hidden">
                  <div className="flex flex-col space-y-2">
                    {announcements.map((announcement: Announcement) => (
                      <div key={announcement.id} className="text-sm font-medium flex items-center">
                        <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0 opacity-50" />
                        <span className="mr-2 font-bold">{announcement.title}:</span>
                        <span className="truncate">{announcement.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-brand-blue-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1632&auto=format&fit=crop"
                  alt="About Revathy Xsara Group"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-3xl font-bold text-brand-gold mb-2">25+ Years</p>
                  <p className="text-lg">Of trusted community service and business excellence</p>
                </div>
              </div>
              <div>
                <h2 className="text-brand-gold font-semibold tracking-wider uppercase mb-3">About The Group</h2>
                <h3 className="text-4xl font-bold text-brand-blue dark:text-white mb-6">
                  Driving Local Economy & Community Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Revathy Xsara Private Limited manages a diverse portfolio of businesses, aiming to be the most trusted local brand. From premium cinema experiences to everyday retail and essential vehicle services, we touch lives daily with our commitment to quality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div className="bg-white dark:bg-brand-blue-light p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-3">Our Mission</h4>
                    <p className="text-gray-600 dark:text-gray-400">To provide premium, reliable, and innovative services across multiple sectors, enhancing the standard of living for our community.</p>
                  </div>
                  <div className="bg-white dark:bg-brand-blue-light p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-3">Our Vision</h4>
                    <p className="text-gray-600 dark:text-gray-400">To be the most recognized and trusted business house in the region, fostering sustainable growth and customer delight.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR BUSINESSES SECTION */}
        <section id="businesses" className="py-24 bg-white dark:bg-brand-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-semibold tracking-wider uppercase mb-3">Our Portfolio</h2>
              <h3 className="text-4xl font-bold text-brand-blue dark:text-white">Businesses Under The Group</h3>
              <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businesses.map((business: Business) => (
                <div key={business.id} className="group bg-white dark:bg-brand-blue-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={business.imageUrl}
                      alt={business.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <h4 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white z-10">
                      {business.name}
                    </h4>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                      {business.shortDescription}
                    </p>
                    <Link
                      href={`/businesses/${business.slug}`}
                      className="inline-flex items-center text-brand-blue dark:text-brand-gold font-semibold group-hover:underline"
                    >
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="py-20 bg-brand-blue-dark text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop')] opacity-10 bg-cover bg-fixed bg-center" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {achievements.map((achievement: Achievement, i: number) => (
                <div key={achievement.id} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex justify-center mb-4">
                    {icons[i % icons.length]}
                  </div>
                  <p className="text-5xl font-bold text-brand-gold mb-2">{achievement.value}</p>
                  <h4 className="text-xl font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="py-24 bg-gray-50 dark:bg-brand-blue-dark overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-semibold tracking-wider uppercase mb-3">Gallery</h2>
              <h3 className="text-4xl font-bold text-brand-blue dark:text-white">Life at Revathy Xsara</h3>
              <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 relative h-[400px] md:h-auto rounded-2xl overflow-hidden group">
                <Image src={businesses[0]?.imageUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop"} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={businesses[1]?.imageUrl || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop"} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={businesses[2]?.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop"} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={businesses[3]?.imageUrl || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop"} alt="Gallery 4" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={businesses[4]?.imageUrl || "https://images.unsplash.com/photo-1545083036-79df3b68018e?q=80&w=1470&auto=format&fit=crop"} alt="Gallery 5" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-white dark:bg-brand-blue relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-semibold tracking-wider uppercase mb-3">Get in Touch</h2>
              <h3 className="text-4xl font-bold text-brand-blue dark:text-white">Contact Our Team</h3>
              <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Maps & Info */}
              <div>
                <div className="bg-brand-blue-light/5 rounded-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                  <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-6">Head Quarters</h4>
                  <ul className="space-y-6">
                    <li className="flex">
                      <div className="bg-brand-gold/20 p-3 rounded-full mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-blue dark:text-white">Location</p>
                        <p className="text-gray-600 dark:text-gray-400">Revathy Xsara Group, Main Hub, Kerala, India</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-brand-gold/20 p-3 rounded-full mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-blue dark:text-white">Phone</p>
                        <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Map Embed */}
                <div className="h-[300px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1!2d76!3d10!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2s!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Form Component */}
              <ContactForm />

            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M9 15a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /><path d="M14 15a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /></svg>
      </a>
    </div>
  );
}
