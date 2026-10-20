import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/shop/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {

    const { id } = useParams();
    const{data: product, isError, isLoading, mutation} = useProduct(id || '')
    const navigate = useNavigate()

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subTitle =
        id === 'new'
        ? 'Aquí puedes crear un nuevo producto.'
        : 'Aquí puedes editar el producto.';

    const handleSubmit = async (productLike: Partial<Product>) => {
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success('Producto actualizado correctamente', {
                    position: 'top-right'
                })
                navigate(`/product/${data.id}`)
            },
            onError: (error) => {
                console.log(error)
                toast.error('Error al actualizar el producto')
            }
        })
    }

    if (isError) return (<Navigate to='/admin/products' />);
    if (isLoading) return (<CustomFullScreenLoading />);
    if (!product) return (<Navigate to='/admin/products' />);

    return <AdminProductForm title={title} subTitle={subTitle} product={product} onSubmit={handleSubmit} isPending={mutation.isPending}/>
}
