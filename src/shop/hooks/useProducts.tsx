import { useQuery } from "@tanstack/react-query"
import { getProductActions } from "../actions/get_products.action"

export const useProducts = () => {

    // TODO: viene lógica

    return useQuery({
        queryKey: ['products'],
        queryFn: getProductActions
    })
}
