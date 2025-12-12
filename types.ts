import React from 'react';

export interface ScheduleItem {
  time: string;
  task: string;
  assignee: string; // e.g., "Bạn", "Dev Team", "Design Team"
  priority: 'High' | 'Medium' | 'Low';
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}