import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get_product_by_id.action"
import { createUpdateProductAction } from "@/admin/actions/create_update_product.action"
import type { Product } from "@/interfaces/product.interface"

export const useProduct = (idSlug: string) => {

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['product', {idSlug}],
        queryFn: () => getProductByIdAction(idSlug || ''),
        retry: false,
        staleTime: 1000 * 60 * 5
    })

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            // Invalidar cache
            queryClient.invalidateQueries({queryKey: ['products']})
            queryClient.invalidateQueries({queryKey: ['product']})

            // Actualizar queryData
            queryClient.setQueryData(['products', {id: product.gender}], product)
        }
    })

    return {...query, mutation}
}
