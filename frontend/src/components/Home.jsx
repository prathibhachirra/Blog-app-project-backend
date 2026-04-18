import React from "react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-xl text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Blog Platform ✍️
        </h1>

        <p className="text-gray-600 mb-6">
          This is a simple blog application where users can read articles,
          share their thoughts, and create their own content. Explore blogs
          written by others or start writing your own today.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Home;