import { Navigate, Route, Routes } from "react-router-dom"
import { UserPage } from "./pages/UserPage"
import { RegisterPage } from "./pages/RegisterPage"
import { UserProvider } from "./context/UserProvider"
import { AuthContext } from "./components/auth/context/AuthContext"
// import { useUsers } from "./hooks/useUsers";
// import { UserProvider } from "./context/UserProvider";
import { useContext } from 'react'


export const UserRoutes = () => {
    const { login } = useContext(AuthContext);

    return (
        <>
         <UserProvider>
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
         </UserProvider>
        </>
    )
}