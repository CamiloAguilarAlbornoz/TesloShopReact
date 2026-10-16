import { tesloApi } from "@/api/tesloApi";
import type { ProductResponse } from "@/interfaces/products.response";

interface Options {
    limit?: number | string;
    offset?: number | string;
    gender?: number | string;
}

export const getProductsByGender = async ({limit, offset, gender}: Options): Promise<ProductResponse> => {

    const {data} = await tesloApi.get<ProductResponse>('/products', {
        params: {
            limit,
            offset,
            gender
        }
    })

    const productsWithImageUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))
    
    return {...data, products: productsWithImageUrl}
}