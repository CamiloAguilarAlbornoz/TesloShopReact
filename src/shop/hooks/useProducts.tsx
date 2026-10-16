import { useQuery } from "@tanstack/react-query"
import { getProductActions } from "../actions/get_products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {

    const[ searchParams ] = useSearchParams()

    const limit = searchParams.get('limit') || 9
    const page = searchParams.get('page') || 1
    const sizes = searchParams.get('sizes') || ''
    const {gender} = useParams()

    const offset = (Number(page) - 1) * Number(limit)

    return useQuery({
        queryKey: ['products', {limit, offset, sizes, gender}],
        queryFn: () => getProductActions({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            sizes,
            gender
        }),
        staleTime: 1000 * 60 * 5, // Mantiene 5 minutos los datos en cache para que no consulte tanto al api
    })
}
