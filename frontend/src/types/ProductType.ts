export interface ReviewType {
  _id?: string;
  name?: string;
  rating: number;
  comment: string;
  createdAt?: string;
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
  reviews: ReviewType[];
}

export interface ProductListType {
  products: ProductType[];
  page: number;
  pages: number;
}
