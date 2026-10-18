import { useAuthStore } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"

/*
No puede entrar las rutas a menos que esté autenticado
si no lo está se redirije a la ruta de login
*/
export const AuthenticatedRoutes = ({children}: PropsWithChildren) => {
    const {authStatus} = useAuthStore()
    if (authStatus === 'checking') return null
    if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />
    return children
}

/*
No puede entrar las rutas a menos que NO esté autenticado
si lo está se redirije a la ruta principal
*/
export const NotAuthenticatedRoutes = ({children}: PropsWithChildren) => {
    const {authStatus} = useAuthStore()
    if (authStatus === 'checking') return null
    if (authStatus === 'authenticated') return <Navigate to='/' />
    return children
}

/*
No puede entrar a las rutas a menos que esté autenticado y
que tenga rol de administrador
*/
export const AdminRoutes = ({children}: PropsWithChildren) => {
    const {authStatus, isAdmin} = useAuthStore()
    if (authStatus === 'checking') return null
    if (authStatus === 'not-authenticated') return <Navigate to='/auth/login' />
    if (!isAdmin()) return <Navigate to='/' />
    return children
}