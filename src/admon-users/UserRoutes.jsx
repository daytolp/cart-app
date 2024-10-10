import { Navigate, Route, Routes } from "react-router-dom"
import { UserPage } from "./pages/UserPage"
import { RegisterPage } from "./pages/RegisterPage"
import { useAuth } from "./hooks/useAuth"


export const UserRoutes = () => {
    const { login } = useAuth();

    return (
        <>
            <Routes>
                <Route path="users" element={<UserPage />} />
                {login.isAdmin && (
                    <>
                     <Route path="users/register" element={<RegisterPage />} />
                     <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                )}
               
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    )
}