"use client"

import React from "react"
import { store } from "./store"
import { Provider } from "react-redux"

type ReduxProviderProps = {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}

