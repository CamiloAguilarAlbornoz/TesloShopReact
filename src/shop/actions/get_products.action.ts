import { tesloApi } from "@/api/tesloApi"
import type { ProductResponse } from "@/interfaces/products.response"

export const getProductActions = async (): Promise<ProductResponse> => {
    
    const { data } = await tesloApi.get<ProductResponse>('/products')

    const productsWithImageUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))

    return {...data, products: productsWithImageUrl}
}