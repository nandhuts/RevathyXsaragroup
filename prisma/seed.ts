import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.business.deleteMany()
  await prisma.achievement.deleteMany()
  await prisma.announcement.deleteMany()

  const businesses = [
    {
      name: "Revathy Cinemax",
      slug: "revathy-cinemax",
      shortDescription: "Movie theatre experience with latest films, snacks and comfortable screens.",
      fullDescription: "Experience the magic of cinema at Revathy Cinemax. We offer the latest blockbuster movies, premium comfortable seating, crystal clear digital projection, and state-of-the-art surround sound. Enjoy our wide selection of delicious snacks and beverages from our concession stand.",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop",
      services: JSON.stringify(["Latest Movies", "Premium Seating", "Dolby Atmos Sound", "Snack Bar", "Online Booking"]),
      locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729.41849187121",
      phone: "+91 98765 43210",
      email: "cinemax@revathyxsara.com",
      address: "Revathy Cinemax, Main Road, City",
      order: 1
    },
    {
      name: "Revathy Xsara Conventional Center",
      slug: "revathy-xsara-conventional-center",
      shortDescription: "Event venue for weddings, corporate meetings and functions.",
      fullDescription: "The perfect destination for your special occasions. Our conventional center offers spacious halls, elegant decor, and comprehensive event management services. Whether it's a grand wedding or a professional corporate meeting, we ensure your event is a memorable success.",
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1498&auto=format&fit=crop",
      services: JSON.stringify(["Wedding Halls", "Corporate Meetings", "Catering Services", "Ample Parking", "Air Conditioned"]),
      locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729.41849187121",
      phone: "+91 98765 43211",
      email: "events@revathyxsara.com",
      address: "Revathy Xsara Convention Center, VIP Road, City",
      order: 2
    },
    {
      name: "Revathy Xsara Hypermarket",
      slug: "revathy-xsara-hypermarket",
      shortDescription: "Retail shopping center for groceries and daily essentials.",
      fullDescription: "Your one-stop destination for all daily needs. From fresh produce to household items, electronics, and apparel, our hypermarket offers a vast range of high-quality products at competitive prices. Enjoy a comfortable and convenient shopping experience.",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop",
      services: JSON.stringify(["Fresh Grocery", "Household Items", "Electronics", "Apparel", "Home Delivery"]),
      locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729.41849187121",
      phone: "+91 98765 43212",
      email: "hypermarket@revathyxsara.com",
      address: "Revathy Xsara Hypermarket, Central Mall, City",
      order: 3
    },
    {
      name: "Revathy Tyres and Services",
      slug: "revathy-tyres-and-services",
      shortDescription: "Tyre sales, vehicle maintenance and service support.",
      fullDescription: "Keep your vehicle running smoothly and safely. We provide top-brand tyres, wheel alignment, balancing, and comprehensive vehicle maintenance services. Our expert mechanics use state-of-the-art equipment to ensure your vehicle gets the best care.",
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop",
      services: JSON.stringify(["Tyre Replacement", "Wheel Alignment", "Vehicle Maintenance", "Oil Change", "Brake Service"]),
      locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729.41849187121",
      phone: "+91 98765 43213",
      email: "service@revathyxsara.com",
      address: "Revathy Tyres and Services, Auto Hub, City",
      order: 4
    },
    {
      name: "Revathy Fuels",
      slug: "revathy-fuels",
      shortDescription: "Fuel station with quick service and customer convenience.",
      fullDescription: "High-quality fuel for your journey. Experience fast, efficient, and friendly service at Revathy Fuels. We offer premium petrol, diesel, and convenience store facilities to refresh yourself while your vehicle gets filled up.",
      imageUrl: "https://images.unsplash.com/photo-1545083036-79df3b68018e?q=80&w=1470&auto=format&fit=crop",
      services: JSON.stringify(["Premium Petrol", "Diesel", "Air filling", "EV Charging", "Convenience Store"]),
      locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729.41849187121",
      phone: "+91 98765 43214",
      email: "fuels@revathyxsara.com",
      address: "Revathy Fuels, Highway Road, City",
      order: 5
    }
  ]

  for (const b of businesses) {
    await prisma.business.create({ data: b })
  }

  const achievements = [
    { title: "Happy Customers", description: "Across our diverse businesses", value: "2M+", order: 1 },
    { title: "Years of Service", description: "Trusted community presence", value: "25+", order: 2 },
    { title: "Businesses", description: "Growing local brand", value: "5", order: 3 },
    { title: "Employees", description: "Dedicated professionals", value: "500+", order: 4 },
  ]

  for (const a of achievements) {
    await prisma.achievement.create({ data: a })
  }

  await prisma.announcement.create({
    data: {
      title: "Welcome to Revathy Xsara Group",
      content: "We are excited to launch our new unified digital platform showcasing all our group businesses.",
      isPublished: true
    }
  })

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
