export interface Cart {
  "type": string;
  "id": string;
  "attributes": {
    "user": string;
    "total": string;
    "cart_products": Array<CartProduct>;
  };
}

export interface CartProduct {
  "id": string;
  "product_id": string;
  "name": string;
  "price": number;
  "quantity": number;
}
