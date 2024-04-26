export type OrderItem = {
  productId: number;
  quantity: number;
};

export type Order = {
  items: (OrderItem & { id: number })[];
};
