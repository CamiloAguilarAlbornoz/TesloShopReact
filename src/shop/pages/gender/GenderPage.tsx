import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {

    const {gender} = useParams()

    const genderLabel = gender === 'men' ? 'Hombres' :  gender === 'women' ? 'Mujeres' : 'Niños'

    const{data} = useProducts()

    return (
        <>
            <CustomJumbotron
            title={`Productos para ${genderLabel}`}
            subtitle='Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. 
            Calidad premium para un estilo atemporal.' />

            <ProductsGrid products={data?.products || []} />

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
