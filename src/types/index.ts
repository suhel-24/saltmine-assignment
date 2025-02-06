export interface Product {
    name: string;
    quantity: number;
    price: number;
}

export interface CartState {
    items: Product[];
    subtotal: number;
    tax: number;
    total: number;
}

export type ProductName = 'cheerios' | 'cornflakes' | 'frosties';