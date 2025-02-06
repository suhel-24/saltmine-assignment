# Shopping Cart Implementation

This project implements a basic shopping cart with the following capabilities:

-   Adding products to the cart with name and quantity.
-   Retrieving product prices from a Price API.
-   Calculating cart subtotal, tax (12.5%), and total.

## Architecture

The core logic resides in the `ShoppingCart` class.  It interacts with the Price API using `axios`.  The `jest` framework is used for testing.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the Price API by filling the env variable**

    **Important**: Ensure this server is running _before_ running tests or the `index.ts` script.

3.  **Run the tests:**

    ```bash
    npm test
    ```

4.  **Run the example (index.ts):**

    ```bash
    npm run build
    ```

    ```bash
    npm start
    ```

    This will add some products to the cart and print the cart state to the console.

## Key Components

-   **`ShoppingCart` class:** Manages the cart state, interacts with the Price API, and calculates totals.
-   **`shopping-cart.test.ts`:** Contains unit tests for the `ShoppingCart` class, using `axios-mock-adapter` to mock the Price API.
-   **`index.ts`:** A simple script that demonstrates how to use the `ShoppingCart` class.


## Testing


1. **should add a product to the cart**  
   - Verifies that when a new product is added, the product is added to the cart with the correct price, quantity, and calculated totals.

2. **should update the quantity when adding an existing product**  
   - Verifies that adding an existing product updates its quantity, and the cart state (subtotal, tax, total) is recalculated correctly.

3. **should calculate cart state correctly with multiple products**  
   - Verifies that when multiple products are added, the cart calculates the correct subtotal, tax, and total.

4. **should handle empty cart state correctly**  
   - Verifies that the cart state is correctly handled when the cart is empty (i.e., no products).
