export type OrderItem = {
  productId: number;
  quantity: number;
};

export type Order = {
  createdAt: string;
  id: number;
  address: string;
  customerName: string;
  items: (OrderItem & { id: number })[];
};
