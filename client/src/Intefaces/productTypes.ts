// I en separat fil, t.ex. productTypes.ts
export interface Product {
    product: any;
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number; // Lägg till quantity som en valfri egenskap
  }
