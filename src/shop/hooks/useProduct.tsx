import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getProductByIdAction } from "../actions/get_product_by_id.action"

export const useProduct = (idSlug: string) => {

    const query = useQuery({
        queryKey: ['product', {idSlug}],
        queryFn: () => getProductByIdAction(idSlug || ''),
        retry: false,
        staleTime: 1000 * 60 * 5
    })
    return {...query}
}
