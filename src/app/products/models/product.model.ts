export interface Product {
  "type": string;
  "id": string;
  "attributes": {
    "name": string;
    "description": string;
    "price": string;
    "category": string;
    "discount": number;
    "is_discount_active": boolean;
  };
}

export interface ProductCategory {
  "type": string;
  "id": string;
  "attributes": {
    "name": string;
    "description": string;
  };
}
