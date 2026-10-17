import { useQuery } from "@tanstack/react-query"
import { getProductActions } from "../actions/get_products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {

    const[ searchParams ] = useSearchParams()

    const limit = searchParams.get('limit') || 9
    const page = searchParams.get('page') || 1
    const sizes = searchParams.get('sizes') || ''
    const price = searchParams.get('price') || 'any'
    const {gender} = useParams()

    const offset = (Number(page) - 1) * Number(limit)

    let minPrice = undefined
    let maxPrice = undefined

    if (price !== 'any') {
        if (price !== '200+') {
            const auxPrice = price.split('-')
            minPrice = +auxPrice[0]
            maxPrice = +auxPrice[1]
        } else {
            minPrice = 200
        }
    }

    return useQuery({
        queryKey: ['products', {limit, offset, sizes, gender, minPrice, maxPrice}],
        queryFn: () => getProductActions({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            sizes,
            gender,
            minPrice,
            maxPrice
        }),
        staleTime: 1000 * 60 * 5, // Mantiene 5 minutos los datos en cache para que no consulte tanto al api
    })
}
