import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Dashboard />
      </main>
    </div>
  )
}

export default App