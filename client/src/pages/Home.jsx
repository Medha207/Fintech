import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Home() {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] text-white pt-20 pb-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fadeIn">
            Welcome to{" "}
            <span className="block mt-3 text-gradient animate-float">FinTech Pro</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Your all-in-one platform to manage transactions, track spending, and gain financial insights with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 transform transition-all duration-300"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
            </Link>
            <Link
              to={isAuthenticated ? "/transactions" : "/login"}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:border-purple-400 transition-all duration-300"
            >
              {isAuthenticated ? "View Transactions" : "Login"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0f172a] relative mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient">FinTech Pro?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make financial management effortless and intuitive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 group animate-fadeIn">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Track Transactions</h3>
              <p className="text-gray-400 leading-relaxed">
                Easily log and manage your daily transactions with categories and real-time balance updates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 group animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/50">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Smart Dashboard</h3>
              <p className="text-gray-400 leading-relaxed">
                Get insights and visualize your financial data with beautiful charts and analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 group animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/50">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Secure & Reliable</h3>
              <p className="text-gray-400 leading-relaxed">
                Your data is protected with industry-standard encryption and secure authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] relative overflow-hidden mt-20">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="glass-card p-8 animate-fadeIn">
              <div className="text-6xl font-bold text-gradient mb-3">10K+</div>
              <div className="text-lg text-gray-400">Active Users</div>
            </div>
            <div className="glass-card p-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl font-bold text-gradient mb-3">1M+</div>
              <div className="text-lg text-gray-400">Transactions Processed</div>
            </div>
            <div className="glass-card p-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl font-bold text-gradient mb-3">99.9%</div>
              <div className="text-lg text-gray-400">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#0f172a] relative overflow-hidden mt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Join thousands of users who are already managing their money smarter with FinTech Pro.
          </p>
          <Link
            to="/register"
            className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 transform transition-all duration-300"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
