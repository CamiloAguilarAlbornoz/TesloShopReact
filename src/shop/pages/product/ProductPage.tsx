import { useState } from 'react';

import {
    PencilIcon,
} from 'lucide-react';
import { useProduct } from '@/shop/hooks/useProduct';
import { Navigate, useParams, Link } from 'react-router';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const ProductPage = () => {

    const {idSlug} = useParams<string>()

    const{data: product, isError, isLoading} = useProduct(idSlug || '')
    
    const [activeImage, setActiveImage] = useState(0);
    const [imagePosition, setImagePosition] = useState(0)

    if (isError) return (<Navigate to='/' />)
    if (isLoading || product === undefined) return (<CustomFullScreenLoading />)

    const stockLevel = product.stock > 10
        ? { label: 'En stock', color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' }
        : product.stock > 0
            ? { label: `Solo ${product.stock} disponibles`, color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' }
            : { label: 'Agotado', color: 'text-red-700', bg: 'bg-red-50', dot: 'bg-red-500' };

    return (
        <div className="min-h-screen bg-[#f7f6f3]">
            {/* Main product section */}
            <main className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                {/* --- Image gallery --- */}
                <div className="animate-fade-in-up">
                    <div className="relative overflow-hidden rounded-2xl bg-stone-100">
                    <img
                        src={product.images[imagePosition]}
                        alt={product.title}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 backdrop-blur-sm">
                        {product.gender}
                    </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="mt-4 flex gap-3">
                    {product.images.map((img, i) => (
                        <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                            activeImage === i
                            ? 'border-stone-900 ring-2 ring-stone-900/10'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        >
                        <img
                        src={img}
                        alt={`Vista ${i + 1}`}
                        className="h-20 w-20 object-cover"
                        onClick={() => setImagePosition(i)}/>
                        </button>
                    ))}
                    </div>
                </div>

                {/* --- Product info --- */}
                <div className="flex flex-col justify-center animate-fade-in-up [animation-delay:150ms]">
                    {/* Category */}
                    <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                        {product.gender}
                    </span>
                    <span className="h-px w-8 bg-stone-300" />
                    </div>

                    {/* Name */}
                    <div className='flex justify-between items-center'>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-900">
                        {product.title}
                        </h1>
                        <Link to={`/admin/products/${idSlug}`}>
                            <PencilIcon
                                className='w-4 h-4 text-blue-500' />
                        </Link>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-stone-900">
                            {product.price.toFixed(2)}
                        </span>
                    </div>
                    {/* Divider */}
                    <div className="my-7 h-px bg-stone-200" />

                    {/* Stock */}
                    <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${stockLevel.bg} ${stockLevel.color}`}>
                    
                    {
                        stockLevel && (
                            <div>
                                <span className={`h-2 w-2 rounded-full ${stockLevel.dot} ${product.stock > 0 ? 'animate-pulse' : ''}`} />
                                {stockLevel.label}
                                    <span className="text-stone-400">·</span>
                            </div>
                        )
                    }
                    <span className="font-normal">{product.stock} unidades</span>
                    </div>

                    {/* Sizes */}
                    <div className="mt-7">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-stone-800">Selecciona tu talla</h3>
                        <button className="text-sm font-medium text-stone-500 underline-offset-2 transition hover:text-stone-900 hover:underline">
                        Guía de tallas
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {
                            product.sizes.map((size) => (
                                <button
                                key={size}
                                className='relative h-14 w-16 rounded-xl border-2 text-base font-bold transition-all duration-200 active:scale-95 border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                                >
                                    {size}    
                                </button>
                            ))
                        }
                    </div>
                    <p className="mt-2.5 text-sm text-stone-400">Elige una talla para continuar</p>
                    </div>

                    {/* Quantity + Add to cart */}
                    <div className="mt-8 flex items-stretch gap-3">
                    
                    </div>
                </div>
                </div>

                {/* Description section */}
                <div className="mt-16 max-w-3xl animate-fade-in-up [animation-delay:300ms]">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900">Descripción</h2>
                <p className="mt-4 leading-relaxed text-stone-600">
                    {product.description}
                </p>
                </div>
            </main>
        </div>
    )
}
