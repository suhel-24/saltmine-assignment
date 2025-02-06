import { getProductPrice } from './services/productprice-service';
import { Product,CartState } from './types'

class ShoppingCart {
    private items: Product[] = [];
    private cartState: CartState = {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0
    };

    // add a product to a cart
    async addProduct(name: string, quantity: number): Promise<void> {
        const price = await getProductPrice(name);
        const existingProductIndex = this.items.findIndex(item => item.name === name);

        if (existingProductIndex > -1) {
            this.items[existingProductIndex].quantity += quantity;
        } else {
            this.items.push({ name, quantity, price });
        }
        this.calculateCartState();
    }

    calculateCartState(): void {
        let subtotal = 0;
        for (const item of this.items) {
            subtotal += item.price * item.quantity;
        }

        // Round up to 2 decimal places
        const tax = Math.ceil(subtotal * 0.125 * 100) / 100; 
        const total = Math.ceil((subtotal + tax) * 100) / 100;  


        this.cartState = {
            items: [...this.items],
            subtotal,
            tax,
            total
        };
    }


    getCartState(): CartState {
        return this.cartState;
    }
}

export default ShoppingCart;