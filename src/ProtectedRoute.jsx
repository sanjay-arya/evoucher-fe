import { Redirect } from 'react-router-dom'
import {useEffect} from 'react'
export default function ProtectedRoute({component: Component, ...rest}) {
    const isAuthenticated = localStorage.getItem('auth');
    
    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
    );
}
