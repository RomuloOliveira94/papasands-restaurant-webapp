export interface Order {
  id: string;
  total: number;
  userUid: string;
  address: string;
  payment: string;
  order: [
    {
      id: number;
      name: string;
      price: number;
      image: string;
    }
  ];
}
