export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { supabase } from "@/lib/supabase";
import { Business, Announcement } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, ShieldCheck, TrendingUp, Users, Medal, MapPin, Phone, Building2, Globe, HeartHandshake } from "lucide-react";
import ContactForm from "@/components/home/ContactForm";

export default async function Home() {
  let businesses: Business[] = [];
  let announcements: Announcement[] = [];
  let galleryItems: { id: string, image: string, category: string }[] = [];

  try {
    const { data: bData } = await supabase.from('businesses').select('*').order('id', { ascending: true });
    if (bData && bData.length > 0) {
      businesses = bData;
    }
    const { data: aData } = await supabase.from('announcements').select('*').order('date', { ascending: false }).limit(3);
    if (aData) announcements = aData;

    const { data: gData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(5);
    if (gData) galleryItems = gData;
  } catch {
    console.warn("Supabase not accessible during build");
  }

  // Fallback businesses to ensure UI renders with correct entities if DB is empty / offline
  if (businesses.length === 0) {
    businesses = [
      { id: '1', name: 'Revathy Cinemax', description: 'Premium cinematic experience with RGB real laser projection.', image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop', status: 'active', contact_email: '', contact_phone: '', type: 'Entertainment' },
      { id: '2', name: 'Revathy Xsara Conventional Center', description: 'State-of-the-art venue for weddings, conferences, and mega events.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop', status: 'active', contact_email: '', contact_phone: '', type: 'Events' },
      { id: '3', name: 'Revathy Xsara Hypermarket', description: 'Your one-stop destination for daily groceries and premium goods.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop', status: 'active', contact_email: '', contact_phone: '', type: 'Retail' },
      { id: '4', name: 'Revathy Tyres and Services', description: 'Professional vehicle maintenance and top-tier tire solutions.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop', status: 'active', contact_email: '', contact_phone: '', type: 'Auto' },
      { id: '5', name: 'Revathy Fuels', description: 'High-quality fuels and quick servicing for all commuters on the go.', image: 'https://images.unsplash.com/photo-1545083036-79df3b68018e?q=80&w=1470&auto=format&fit=crop', status: 'active', contact_email: '', contact_phone: '', type: 'Auto' },
    ];
  }

  const icons = [<Building2 key={1} className="w-10 h-10 text-brand-gold" />, <Medal key={2} className="w-10 h-10 text-brand-gold" />, <Users key={3} className="w-10 h-10 text-brand-gold" />];

  const statistics = [
    { id: 1, title: 'Businesses', value: '5', description: 'Across key sectors' },
    { id: 2, title: 'Years of Operation', value: '25+', description: 'Of excellence' },
    { id: 3, title: 'Customer Reach', value: '100k+', description: 'Served monthly' },
  ];

  return (
    <div className="flex flex-col pt-16">
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue-dark/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Revathy Xsara Group Corporate"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col justify-center items-center h-full animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-bold tracking-[0.2em] mb-6 backdrop-blur-md">
              CORPORATE GROUP
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
              Revathy <span className="text-brand-gold">Xsara</span> Group
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto font-medium drop-shadow-lg">
              Trusted Local Business Network
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
              <Link
                href="#businesses"
                className="bg-brand-gold hover:bg-white hover:text-brand-blue-dark text-brand-blue-dark px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-transparent"
              >
                Explore Businesses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="bg-[#0f172a]/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-brand-blue-dark px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* LATEST ANNOUNCEMENTS BANNER */}
        {announcements.length > 0 && (
          <section className="bg-brand-gold text-brand-blue-dark py-4 relative z-20 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-3 md:mb-0">
                  <span className="font-bold uppercase tracking-wider text-sm flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse mr-2" />
                    Latest Updates
                  </span>
                </div>
                <div className="flex-1 md:px-8 overflow-hidden">
                  <div className="flex flex-col space-y-2">
                    {announcements.map((announcement: Announcement) => (
                      <div key={announcement.id} className="text-sm font-medium flex items-center">
                        <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0 opacity-50" />
                        <span className="mr-2 font-bold">{announcement.title}:</span>
                        <span className="truncate">{announcement.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-brand-blue-dark border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1632&auto=format&fit=crop"
                  alt="About Revathy Xsara Group"
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-4xl font-extrabold text-brand-gold mb-2">25+ Years</p>
                  <p className="text-lg font-medium text-gray-200">Building community trust through excellence</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-brand-gold font-bold tracking-[0.15em] text-sm uppercase mb-3 flex items-center gap-2">
                  <span className="w-10 h-0.5 bg-brand-gold"></span> About The Group
                </h2>
                <h3 className="text-4xl lg:text-5xl font-black text-brand-blue dark:text-white mb-8 leading-tight">
                  Driving Local Economy & Community Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  Revathy Xsara Private Limited manages a diverse portfolio of businesses, aiming to be the most trusted local brand. From premium cinema experiences to everyday retail and essential vehicle services, we touch lives daily with our commitment to quality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white dark:bg-brand-blue-light p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-shadow">
                    <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-3">Our Mission</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">To provide premium, reliable, and innovative services across multiple sectors, enhancing the living standard of our community.</p>
                  </div>
                  <div className="bg-white dark:bg-brand-blue-light p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-shadow">
                    <h4 className="text-xl font-bold text-brand-blue dark:text-white mb-3">Our Vision</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">To be the most recognized and trusted business house in the region, fostering sustainable, scalable economic growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="py-24 bg-white dark:bg-brand-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-brand-gold font-bold tracking-[0.15em] text-sm uppercase mb-3 text-center">
                Our Values
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-brand-blue dark:text-white text-center">
                Why Choose Us
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Trusted local brand', icon: <ShieldCheck className="w-8 h-8 text-brand-gold" /> },
                { title: 'Multiple verticals', icon: <Building2 className="w-8 h-8 text-brand-gold" /> },
                { title: 'Customer focused', icon: <HeartHandshake className="w-8 h-8 text-brand-gold" /> },
                { title: 'Growing digital', icon: <Globe className="w-8 h-8 text-brand-gold" /> },
              ].map((val, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-brand-blue-light rounded-3xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6">
                    {val.icon}
                  </div>
                  <h4 className="text-lg font-bold text-brand-blue dark:text-white mb-2">{val.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR BUSINESSES SECTION */}
        <section id="businesses" className="py-24 bg-gray-50 dark:bg-[#0a0f1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-brand-gold font-bold tracking-[0.15em] text-sm uppercase mb-3 flex items-center gap-2">
                  <span className="w-10 h-0.5 bg-brand-gold"></span> Our Portfolio
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-brand-blue dark:text-white leading-tight">
                  Businesses Under The Group
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium pb-2 border-b-2 border-brand-gold">
                Serving quality every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {businesses.map((business: Business) => {
                const slug = business.name.toLowerCase().replace(/ /g, '-');
                return (
                  <div key={business.id} className="group bg-white dark:bg-brand-blue-light rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={business.image || "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0"}
                        alt={business.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/20 to-transparent transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                         {business.type || 'Services'}
                      </div>
                      <h4 className="absolute bottom-5 left-6 right-6 text-2xl font-bold text-white z-10 leading-tight">
                        {business.name}
                      </h4>
                    </div>
                    <div className="p-8 flex-grow flex flex-col bg-white dark:bg-brand-blue-light">
                      <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow text-[0.95rem] leading-relaxed">
                        {business.description}
                      </p>
                      <Link
                        href={`/businesses/${slug}`}
                        className="inline-flex items-center justify-between py-3 px-6 rounded-full bg-brand-blue-dark dark:bg-white text-white dark:text-brand-blue-dark hover:bg-brand-gold dark:hover:bg-brand-gold transition-colors font-bold text-sm w-full group/btn"
                      >
                        View Details <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section id="statistics" className="py-24 bg-brand-blue-dark text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop')] opacity-10 bg-cover bg-fixed bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/70" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold tracking-[0.15em] text-sm uppercase mb-3 text-center">
                By The Numbers
              </h2>
              <h3 className="text-4xl font-black text-white text-center">
                Our Track Record
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
              {statistics.map((stat, i) => (
                <div key={stat.id} className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg transform transition-transform hover:-translate-y-2">
                  <div className="flex justify-center mb-6">
                    {icons[i % icons.length]}
                  </div>
                  <p className="text-6xl font-black text-brand-gold mb-4 font-mono">{stat.value}</p>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-wider">{stat.title}</h4>
                  <p className="text-sm text-gray-400 font-medium">{stat.description}</p>
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
                <Image src={galleryItems[0]?.image || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop"} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={galleryItems[1]?.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop"} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                <Image src={galleryItems[2]?.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop"} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                 <Image src={galleryItems[3]?.image || "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop"} alt="Gallery 4" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
              </div>
              <div className="relative h-[200px] rounded-2xl overflow-hidden group">
                 <Image src={galleryItems[4]?.image || "https://images.unsplash.com/photo-1545083036-79df3b68018e?q=80&w=1470&auto=format&fit=crop"} alt="Gallery 5" fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-white dark:bg-brand-blue relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold tracking-[0.15em] text-sm uppercase mb-3">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-black text-brand-blue dark:text-white">Contact Our Team</h3>
              <div className="w-16 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Maps & Info */}
              <div>
                <div className="bg-gray-50 dark:bg-brand-blue-light/30 rounded-3xl p-10 mb-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-8">Head Quarters</h4>
                  <ul className="space-y-8">
                    <li className="flex items-start">
                      <div className="bg-brand-gold/10 p-4 rounded-2xl mr-5 flex-shrink-0 border border-brand-gold/20">
                        <MapPin className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-1">Corporate Office</p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Revathy Xsara Pvt Ltd, Parippally,<br/> Kerala, India</p>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-brand-gold/10 p-4 rounded-2xl mr-5 flex-shrink-0 border border-brand-gold/20">
                        <Phone className="w-6 h-6 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-1">Direct Line</p>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">+91 98765 43210</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Map Embed */}
                <div className="h-[320px] rounded-3xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.73320330626!2d76.76970687314115!3d8.811116192365365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e7210c78cee5%3A0xe18334ace142a006!2sRevathy%20CineMax!5e0!3m2!1sen!2sin!4v1774682036009!5m2!1sen!2sin"
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://maps.google.com/?q=Revathy+CineMax+Parippally"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-brand-blue-dark dark:bg-gray-800 text-white dark:text-brand-gold border border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 group"
          title="Get Directions"
        >
          <MapPin size={24} className="group-hover:animate-bounce" />
        </a>
        <a
          href="tel:+919876543210"
          className="w-14 h-14 bg-brand-gold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 group"
          title="Call Us"
        >
          <Phone size={24} className="group-hover:animate-bounce" />
        </a>
        <a
          href="https://wa.me/919746625026"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 group"
          title="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M9 15a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /><path d="M14 15a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" /></svg>
        </a>
      </div>
    </div>
  );
}
