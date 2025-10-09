import React from 'react'
import { useAuth } from '@/context/authContext';
import { account, ID } from "@/lib/appwrite";

export const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Home Page</h1>

              <button
                type="button"
                onClick={logout}
              >
                Logout
              </button>
    </div>
  )
}
