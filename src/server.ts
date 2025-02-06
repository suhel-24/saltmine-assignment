import dotenv from 'dotenv'
import ShoppingCart from "./shopping-cart";

dotenv.config()

async function main() {
    const cart = new ShoppingCart();

    // Simulate adding items to the cart
    await cart.addProduct("cornflakes", 1);
    await cart.addProduct("cornflakes", 1);
    await cart.addProduct("weetabix", 1);

    // Get the cart state
    const cartState = cart.getCartState();

    // Log the cart contents
    console.log("Cart contents:");
    cartState.items.forEach((item) => {
        console.log(`- ${item.quantity} x ${item.name} @ ${item.price} each`);
    });

    // Log the totals
    console.log(`Subtotal = ${cartState.subtotal}`);
    console.log(`Tax = ${cartState.tax}`);
    console.log(`Total = ${cartState.total}`);
}

main().catch(console.error);