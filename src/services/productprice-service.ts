import axios from "axios";

export const getProductPrice = async (name: string)=> {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/products/${name}`);
        return response.data.price;
    } catch (error) {
        console.error(`Error fetching price for ${name}:`, error);
        throw new Error(`Failed to retrieve price for ${name}`);
    }
}
