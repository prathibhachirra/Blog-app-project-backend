import React from 'react'
import { userAuth } from '../stores/userAuth'
import { useNavigate } from 'react-router'

function UserProfile() {
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
          My Articles
        </h1>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Article Card */}
        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Article 1
          </h2>

          <p className="text-sm text-gray-400 mb-2">
            By Author Name
          </p>

          <p className="text-gray-600">
            This is the first article description.
          </p>
        </div>

        {/* Article Card */}
        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Article 2
          </h2>

          <p className="text-sm text-gray-400 mb-2">
            By Author Name
          </p>

          <p className="text-gray-600">
            This is the second article description.
          </p>
        </div>

      </div>
    </div>
  )
}

export default UserProfile