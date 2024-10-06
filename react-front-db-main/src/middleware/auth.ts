import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "../app/service/userApi";

export const listenetMiddleware = createListenerMiddleware();

listenetMiddleware.startListening({
    matcher: userApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        if(action.payload.token) {
            localStorage.setItem('token', action.payload.token)
        }
    }
})