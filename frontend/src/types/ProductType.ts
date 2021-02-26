export interface Reviews {
  name: string;
  rating: number;
  comment: string;
}

export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Reviews[];
}
