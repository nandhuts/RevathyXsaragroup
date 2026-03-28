export interface Business {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
}

export interface Gallery {
  id: string;
  image: string;
  category: string;
}

// System types for components if needed
export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}
