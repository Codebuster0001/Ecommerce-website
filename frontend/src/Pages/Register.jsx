import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import RegisterImage from '../assets/register.webp';
import { useAuth } from '../Components/Common/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/profile";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn, navigate, redirectPath]);

  const isPasswordValid = (pwd) =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters and include a number and a special character.");
      toast.error("Invalid password format");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const success = await register(name, email, password);
      if (success) {
        toast.success('Registration successful!');
        navigate("/login");
      } else {
        setError("Registration failed");
        toast.error("Registration failed");
      }
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', delay: 2.4, stiffness: 80 },
    },
  };

  return (
    <div className="min-h-screen py-4 flex items-center justify-center px-4 bg-gradient-to-r from-purple-50 to-white">
      <motion.div
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div className="p-8 md:p-16" variants={containerVariants} initial="hidden" animate="visible">
            <div className="mb-8 text-center">
              <Link to="/" className="text-3xl font-bold text-purple-600 tracking-tight">Shopy</Link>
            </div>
            <motion.h2 className="text-2xl font-semibold text-gray-800 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
              Create Your Account
            </motion.h2>
            <motion.p className="text-gray-600 mb-8 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
              Join us and start exploring amazing products tailored just for you.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} required />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" placeholder="your.email@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </motion.div>

              {error && (
                <motion.p className="text-red-600 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                  {error}
                </motion.p>
              )}

              <motion.button type="submit" className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 flex items-center justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 200, delay: 2.5 }} disabled={loading}>
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : null}
                {loading ? "Creating..." : "Create Account"}
              </motion.button>
            </form>

            <motion.p className="mt-8 text-sm text-center text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline font-medium">Sign In</Link>
            </motion.p>
          </motion.div>

          <motion.div className="hidden md:block relative" variants={imageVariants} initial="hidden" animate="visible">
            <img src={RegisterImage} alt="Register Promo" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-purple-900 opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <motion.h3 className="text-2xl font-bold mb-2 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}>
                Join the Shopping Revolution
              </motion.h3>
              <motion.p className="text-sm opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
                Enjoy personalized offers, fast checkout, and premium support.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
