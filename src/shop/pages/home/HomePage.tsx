import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

    const { data } = useProducts()

    return (
        <>
            <CustomJumbotron
            title='Todos los productos'
            subtitle='Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. 
            Calidad premium para un estilo atemporal.' />

            <ProductsGrid products={ data?.products || [] } />

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
