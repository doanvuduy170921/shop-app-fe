import {ProductImage} from "./product.image";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string; // Đường dẫn hình ảnh
  category_id: string;
  url: string;
  product_images :ProductImage[];
}
