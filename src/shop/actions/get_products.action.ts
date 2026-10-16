import { tesloApi } from "@/api/tesloApi"
import type { ProductResponse } from "@/interfaces/products.response"

interface Options {
    limit?: number | string;
    offset?: number | string;
    sizes?: string;
    gender?: string
}

export const getProductActions = async (options: Options): Promise<ProductResponse> => {
    
    const {limit, offset, sizes, gender} = options

    const { data } = await tesloApi.get<ProductResponse>('/products', {
        params: {
            limit,
            offset,
            sizes,
            gender
        }
    })

    const productsWithImageUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))

    return {...data, products: productsWithImageUrl}
}