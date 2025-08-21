import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, MessageSquare, Lock, Mail } from "lucide-react";

import useAuthStore from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import Input from "../components/Input";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <section className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/20">Sign in to your account</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full space-y-3"
          >
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              label="Email"
              icon={<Mail className="text-base-content/40" />}
              required
              value={formData.email}
              validate
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={<Lock className="text-base-content/40" />}
              required
              value={formData.password}
              validate
              minLength={6}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p className="mt-1 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-bold">
              Create an account
            </Link>
          </p>
        </section>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Signin to continue your conversations and catch up with your friends"
      />
    </main>
  );
}
export default LoginPage;
