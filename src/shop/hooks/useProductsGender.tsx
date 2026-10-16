import { useQuery } from '@tanstack/react-query'
import { getProductsByGender } from '../actions/get_products_by_gender.action'
import { useSearchParams } from 'react-router'

interface Props {
    gender?: string;
}

export const useProductsGender = ({gender}: Props) => {

    const[ searchParams ] = useSearchParams()

    const limit = searchParams.get('limit') || 9
    const page = searchParams.get('page') || 1

    const offset = (Number(page) - 1) * Number(limit)

    return useQuery({
        queryKey: ['productsGender', {limit, page, gender}],
        queryFn: () => getProductsByGender({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            gender}),
        staleTime: 1000 * 60 * 5
    })
}
