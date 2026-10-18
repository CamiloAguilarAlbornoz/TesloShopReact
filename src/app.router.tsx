import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DasboardPage } from "./admin/pages/dashboard/DasboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { lazy } from "react";
import { AdminRoutes, NotAuthenticatedRoutes } from "./components/routes/ProtectedRoutes";

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'))

// eslint-disable-next-line react-refresh/only-export-components
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'))

export const appRouter = createBrowserRouter([
    // Main Routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },
    // Auth Routes
    {
        path: '/auth',
        element: (
            <NotAuthenticatedRoutes>
                <AuthLayout />
            </NotAuthenticatedRoutes>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },
    // Admin Routes
    {
        path: '/admin',
        element: (
            <AdminRoutes>
                <AdminLayout />
            </AdminRoutes>
        ),
        children: [
            {
                index: true,
                element: <DasboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/'/>
    }
])