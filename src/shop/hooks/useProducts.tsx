import { useQuery } from "@tanstack/react-query"
import { getProductActions } from "../actions/get_products.action"
import { useSearchParams } from "react-router"

export const useProducts = () => {

    const[ searchParams ] = useSearchParams()

    const limit = searchParams.get('limit') || 9
    const page = searchParams.get('page') || 1
    const sizes = searchParams.get('sizes') || []

    const offset = (Number(page) - 1) * Number(limit)

    return useQuery({
        queryKey: ['products', {limit, offset, sizes}],
        queryFn: () => getProductActions({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            sizes
        }),
        staleTime: 1000 * 60 * 5, // Mantiene 5 minutos los datos en cache para que no consulte tanto al api
    })
}
