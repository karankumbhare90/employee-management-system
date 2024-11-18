import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const token = localStorage.getItem('token');

    if (token) {
        // Redirect to dashboard if token exists
        return <Navigate to="/" />;
    }

    return children;
}

export default PublicRoute;
