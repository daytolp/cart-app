import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/UserSlice";
import { authSlice } from "./slices/auth/AuthSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer,
    }
});
