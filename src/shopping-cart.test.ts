import ShoppingCart from './shopping-cart';
import { getProductPrice } from './services/productprice-service';
import { ProductName } from './types';

jest.mock('./services/productprice-service');

describe('ShoppingCart', () => {
    let cart:ShoppingCart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    it('should add a product to the cart', async () => {
        (getProductPrice as jest.Mock).mockResolvedValue(8.43);
        await cart.addProduct('cheerios', 2);
        const state = cart.getCartState();

        expect(state.items.length).toBe(1);
        expect(state.items[0].name).toBe('cheerios');
        expect(state.items[0].quantity).toBe(2);
        expect(state.items[0].price).toBe(8.43);
        expect(state.subtotal).toBeCloseTo(16.86, 2);
        expect(state.tax).toBeCloseTo(2.11, 2);
        expect(state.total).toBeCloseTo(18.97, 2);
    });

    it('should update the quantity when adding an existing product', async () => {
        (getProductPrice as jest.Mock).mockResolvedValue(4.99);
        await cart.addProduct('cornflakes', 1);
        await cart.addProduct('cornflakes', 2);
        const state = cart.getCartState();

        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(3);
        expect(state.subtotal).toBeCloseTo(14.97, 2);
        expect(state.tax).toBeCloseTo(1.88, 2);
        expect(state.total).toBeCloseTo(16.86, 2);
    });

    it('should calculate cart state correctly with multiple products', async () => {
        (getProductPrice as jest.Mock).mockImplementation(async (name:ProductName) => {
            const prices : Record<ProductName, number> = {
                cheerios: 8.43,
                cornflakes: 4.99,
                frosties: 5.99
            };
            return prices[name];
        });

        await cart.addProduct('cheerios', 1);
        await cart.addProduct('cornflakes', 2);
        await cart.addProduct('frosties', 1);
        const state = cart.getCartState();

        expect(state.items.length).toBe(3);
        expect(state.subtotal).toBeCloseTo(24.40, 2);
        expect(state.tax).toBeCloseTo(3.05, 2);
        expect(state.total).toBeCloseTo(27.45, 2);
    });

    it('should handle empty cart state correctly', () => {
        const state = cart.getCartState();
        expect(state.items.length).toBe(0);
        expect(state.subtotal).toBe(0);
        expect(state.tax).toBe(0);
        expect(state.total).toBe(0);
    });
});
