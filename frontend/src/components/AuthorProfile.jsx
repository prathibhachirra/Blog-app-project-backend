import React from 'react'
import { useNavigate } from 'react-router';
import { userAuth } from '../stores/userAuth'

function AuthorProfile() {
  const logout = userAuth(state => state.logout)
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Author Dashboard
        </h1>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Author Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome, Author 👋
        </h2>
        <p className="text-gray-600">
          Manage your articles, create new content, and engage with your audience.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => navigate("/addarticle")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Create Article
        </button>

        <button
          onClick={() => navigate("/authordashboard")}
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
        >
          View My Articles
        </button>
      </div>

    </div>
  )
}

export default AuthorProfile