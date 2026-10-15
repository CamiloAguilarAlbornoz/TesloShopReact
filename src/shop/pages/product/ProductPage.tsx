import { useState } from 'react';

import {
    ShoppingBag,
    Heart,
    Share2,
    Truck,
    RefreshCw,
    ShieldCheck,
    Check,
} from 'lucide-react';

const PRODUCT = {
    name: 'Camisa Deportiva',
    price: 49.99,
    currency: '€',
    category: 'Ropa Deportiva',
    stock: 24,
    sizes: ['XS', 'S', 'M', 'L'] as const,
    image:
    'https://images.pexels.com/photos/37704838/pexels-photo-37704838.jpeg?auto=compress&cs=tinysrgb&h=900&w=650',
    gallery: [
    'https://images.pexels.com/photos/37704838/pexels-photo-37704838.jpeg?auto=compress&cs=tinysrgb&h=900&w=650',
    'https://images.pexels.com/photos/37704842/pexels-photo-37704842.jpeg?auto=compress&cs=tinysrgb&h=900&w=650',
    'https://images.pexels.com/photos/37704845/pexels-photo-37704845.jpeg?auto=compress&cs=tinysrgb&h=900&w=650',
    'https://images.pexels.com/photos/37704849/pexels-photo-37704849.jpeg?auto=compress&cs=tinysrgb&h=900&w=650',
    ],
};

export const ProductPage = () => {

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const stockLevel =
    PRODUCT.stock > 10
        ? { label: 'En stock', color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' }
        : PRODUCT.stock > 0
            ? { label: `Solo ${PRODUCT.stock} disponibles`, color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' }
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
                        src={PRODUCT.gallery[activeImage]}
                        alt={PRODUCT.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 backdrop-blur-sm">
                        {PRODUCT.category}
                    </div>
                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white active:scale-90"
                    >
                        <Heart
                        className={`h-5 w-5 transition ${isFavorited ? 'fill-red-500 text-red-500' : 'text-stone-600'}`}
                        strokeWidth={2}
                        />
                    </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="mt-4 flex gap-3">
                    {PRODUCT.gallery.map((img, i) => (
                        <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                            activeImage === i
                            ? 'border-stone-900 ring-2 ring-stone-900/10'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        >
                        <img src={img} alt={`Vista ${i + 1}`} className="h-20 w-20 object-cover" />
                        </button>
                    ))}
                    </div>
                </div>

                {/* --- Product info --- */}
                <div className="flex flex-col justify-center animate-fade-in-up [animation-delay:150ms]">
                    {/* Category */}
                    <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                        {PRODUCT.category}
                    </span>
                    <span className="h-px w-8 bg-stone-300" />
                    </div>

                    {/* Name */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-900">
                    {PRODUCT.name}
                    </h1>

                    {/* Rating stars (visual only) */}
                    <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.176 0l-3.368 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                        ))}
                    </div>
                    <span className="text-sm text-stone-400">(128 reseñas)</span>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-stone-900">
                        {PRODUCT.currency}{PRODUCT.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-stone-400 line-through">
                        {PRODUCT.currency}{(PRODUCT.price * 1.4).toFixed(2)}
                    </span>
                    <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        -30%
                    </span>
                    </div>
                    <p className="mt-1.5 text-sm text-stone-500">Impuestos incluidos. Envío calculado al pagar.</p>

                    {/* Divider */}
                    <div className="my-7 h-px bg-stone-200" />

                    {/* Stock */}
                    <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${stockLevel.bg} ${stockLevel.color}`}>
                    <span className={`h-2 w-2 rounded-full ${stockLevel.dot} ${PRODUCT.stock > 0 ? 'animate-pulse' : ''}`} />
                    {stockLevel.label}
                    <span className="text-stone-400">·</span>
                    <span className="font-normal">{PRODUCT.stock} unidades</span>
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
                        {PRODUCT.sizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                            <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`relative h-14 w-16 rounded-xl border-2 text-base font-bold transition-all duration-200 active:scale-95 ${
                                isSelected
                                ? 'border-stone-900 bg-stone-900 text-white'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                            }`}
                            >
                            {size}
                            {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 ring-2 ring-white">
                                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                </span>
                                </span>
                            )}
                            </button>
                        );
                        })}
                    </div>
                    {selectedSize === null && (
                        <p className="mt-2.5 text-sm text-stone-400">Elige una talla para continuar</p>
                    )}
                    </div>

                    {/* Quantity + Add to cart */}
                    <div className="mt-8 flex items-stretch gap-3">
                    {/* Quantity selector */}
                    <div className="flex items-center rounded-xl border-2 border-stone-200 bg-white">
                        <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-14 w-12 items-center justify-center text-xl font-light text-stone-600 transition hover:text-stone-900 active:scale-90"
                        >
                        −
                        </button>
                        <span className="w-10 text-center text-base font-bold text-stone-900">{quantity}</span>
                        <button
                        onClick={() => setQuantity((q) => Math.min(PRODUCT.stock, q + 1))}
                        className="flex h-14 w-12 items-center justify-center text-xl font-light text-stone-600 transition hover:text-stone-900 active:scale-90"
                        >
                        +
                        </button>
                    </div>

                    {/* Add to cart */}
                    <button
                        disabled={selectedSize === null}
                        className={`flex h-14 flex-1 items-center justify-center gap-2.5 rounded-xl font-bold text-white transition-all duration-300 active:scale-[0.98] ${
                        selectedSize === null
                            ? 'cursor-not-allowed bg-stone-300'
                            : 'bg-stone-900 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20'
                        }`}
                    >
                        <ShoppingBag className="h-5 w-5" strokeWidth={2} />
                        Añadir al carrito
                    </button>
                    </div>

                    {/* Secondary actions */}
                    <div className="mt-4 flex gap-3">
                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-white text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50"
                    >
                        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
                        {isFavorited ? 'En favoritos' : 'Añadir a favoritos'}
                    </button>
                    <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-white text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                        <Share2 className="h-4 w-4" strokeWidth={2} />
                        Compartir
                    </button>
                    </div>

                    {/* Benefits */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                        { icon: Truck, title: 'Envío gratis', desc: 'En pedidos +50€' },
                        { icon: RefreshCw, title: 'Devoluciones', desc: '30 días gratis' },
                        { icon: ShieldCheck, title: 'Garantía', desc: '2 años incluidos' },
                    ].map((item) => (
                        <div
                        key={item.title}
                        className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-4 text-center transition hover:shadow-sm"
                        >
                        <item.icon className="h-5 w-5 text-stone-700" strokeWidth={1.8} />
                        <span className="text-xs font-bold text-stone-800">{item.title}</span>
                        <span className="text-xs text-stone-400">{item.desc}</span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

                {/* Description section */}
                <div className="mt-16 max-w-3xl animate-fade-in-up [animation-delay:300ms]">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900">Descripción</h2>
                <p className="mt-4 leading-relaxed text-stone-600">
                    Esta camisa deportiva está confeccionada con tejido transpirable de secado rápido que mantiene
                    tu cuerpo fresco durante el entrenamiento. Su diseño ergonómico ofrece libertad de movimiento
                    sin restricciones, ideal para running, gimnasio o cualquier actividad física. Cuenta con
                    tratamiento anti-olores y protección UV para que rindas al máximo en cada sesión.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                    'Tejido transpirable de secado rápido',
                    'Tratamiento anti-olores',
                    'Protección UV UPF 30+',
                    'Diseño ergonómico sin costuras',
                    'Material reciclado sostenible',
                    'Lavable a máquina a 30°C',
                    ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-stone-700">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                        </span>
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
            </main>
        </div>
    )
}
