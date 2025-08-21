import { useState, type FormEvent } from "react";
import { Mail, User, Lock, MessageSquare, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import useAuthStore from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    profilePic: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/20">
                Get started with your free account
              </p>
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
              id="fullName"
              type="text"
              placeholder="John Doe"
              label="Full Name"
              icon={<User className="text-base-content/40" />}
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="mt-1 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
        </section>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your love ones"
      />
    </main>
  );
}
export default SignUpPage;
