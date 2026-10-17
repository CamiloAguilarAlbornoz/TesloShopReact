import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import type { PropsWithChildren } from 'react'
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading'
import { useAuthStore } from './auth/store/auth.store'

const queryClient = new QueryClient()

const CheckAutProvider = ({children} : PropsWithChildren) => {

    const {checkAuthStatus} = useAuthStore()

    const {isLoading} = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, // Ejecuta la petición cada hora y media
        refetchOnWindowFocus: true
    })
    if (isLoading) return <CustomFullScreenLoading />
    return children
}

export const TesloShopApp = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />

            {/*Custom Provider*/}
            <CheckAutProvider>
                <RouterProvider router={appRouter} />
            </CheckAutProvider>
            
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
