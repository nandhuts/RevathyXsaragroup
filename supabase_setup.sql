-- Table for Businesses
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Gallery
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Contact Messages (Website Enquiries)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Demo Business Data
INSERT INTO businesses (name, description, image, category, location) VALUES
('Revathy Cinemax', 'Premium RGB Real Laser cinema experience with Dolby Atmos sound.', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80', 'Entertainment', 'Main City Mall, Kerala'),
('Revathy Xsara Convention Center', 'Luxurious convention center for all your weddings, corporate events, and grand functions.', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80', 'Hospitality', 'East Ave, Kerala'),
('Revathy Xsara Hypermarket', 'Your one-stop destination for daily groceries, premium fresh produce, and family needs.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80', 'Retail', 'Central Square, Kerala');

-- Insert Demo Announcement Data
INSERT INTO announcements (title, message) VALUES
('Grand Opening', 'We are excited to announce the opening of a new branch of Revathy Cinemax this winter!'),
('Festival Discounts', 'Enjoy flat 50% off on all items at the Hypermarket this entire weekend.');
