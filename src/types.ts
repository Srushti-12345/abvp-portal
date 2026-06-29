export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  titleMr?: string;
  subtitle: string;
  subtitleMr?: string;
  tag?: string;
  tagMr?: string;
  primaryButtonText?: string;
  primaryButtonTextMr?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonTextMr?: string;
  secondaryButtonLink?: string;
}

export interface EventItem {
  id: string;
  title: string;
  titleMr?: string;
  category: string;
  categoryMr?: string;
  date: string; // "15"
  month: string; // "AUG"
  monthMr?: string; // "ऑगस्ट"
  year: string;  // "2024"
  location: string;
  locationMr?: string;
  time: string;
  timeMr?: string;
  link: string;
  type: 'celebration' | 'seminar' | 'workshop' | 'conference';
}

export interface StatItem {
  id: string;
  icon: string; // Lucide or Google Symbol name
  value: string; // "05+"
  label: string; // "UNIVERSITIES"
  labelMr?: string; // "विद्यापीठे"
}

export interface NewsItem {
  id: string;
  title: string;
  titleMr?: string;
  image: string;
  tag?: string; // "LATEST"
  tagMr?: string;
  date: string;
  dateMr?: string;
  isLatest?: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  titleMr?: string;
  date: string;
  dateMr?: string;
  priority: 'high' | 'normal';
  link?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  nameMr?: string;
  role: string;
  roleMr?: string;
  image: string;
  email: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

export interface InitiativeItem {
  id: string;
  title: string;
  titleMr?: string;
  description: string;
  descriptionMr?: string;
  icon: string;
  link: string;
  actionText?: string;
  actionTextMr?: string;
  isCustomColor?: boolean;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}
