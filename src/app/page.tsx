"use client"

import ContentPage from "./Pages/ContentPage"
import LoginPage from "./Pages/LoginPage";
import { useAppSelector } from "./redux/store";
import Navbar from "./Components/ServerComponents/Navbar";

export default function Home() {

  const { isAuthenticated } = useAppSelector(state => state.auth)

  return (
    <main className="max-w-4xl mx-auto pt-4">
      <Navbar></Navbar>
      {isAuthenticated ? <ContentPage/> : <LoginPage/> }

    </main>
  )
}
