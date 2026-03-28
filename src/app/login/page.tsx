import { loginAction } from "./actions";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-blue-dark flex items-center justify-center relative px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-brand-blue z-0 opacity-90 mix-blend-multiply" />
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Login Background"
        fill
        className="object-cover z-0 opacity-20"
      />

      <div className="relative z-10 bg-white dark:bg-brand-blue-light w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-brand-gray/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-3xl font-bold text-brand-blue dark:text-white mb-2">Admin Portal</h1>
          <p className="text-gray-500 text-sm">Sign in to manage the Revathy Xsara Group.</p>
        </div>

        {searchParams.error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100 font-medium">
            Incorrect Username or Password
          </div>
        )}

        <form action={loginAction} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input required type="text" name="username" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="Enter username" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input required type="password" name="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="Enter password" />
          </div>

          <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Access Dashboard
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-gray-400">
          Secure Internal Access Only &copy; Revathy Xsara
        </p>
      </div>
    </div>
  );
}
