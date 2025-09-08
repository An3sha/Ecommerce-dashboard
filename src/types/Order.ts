export interface User {
  name: string;
  avatar?: string;
}

export interface Order {
  orderId: string;
  user: User;
  project: string;
  address: string;
  date: string;
  status: string;
  hasExternalLink?: boolean;
}