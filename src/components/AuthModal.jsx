import { useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      isLogin
        ? "Login successful! Welcome back 👋"
        : "Account created successfully! 🎉"
    );

    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={21} />
        </button>

        <div className="auth-icon">
          <User size={28} />
        </div>

        <span className="auth-eyebrow">
          WELCOME TO FOODCHOW
        </span>

        <h2>
          {isLogin ? "Welcome back!" : "Create your account"}
        </h2>

        <p className="auth-subtitle">
          {isLogin
            ? "Sign in to continue ordering your favorite food."
            : "Join FoodChow and start ordering delicious food."}
        </p>

        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-input">
              <User size={18} />
              <input
                type="text"
                placeholder="Full name"
                required
              />
            </div>
          )}

          <div className="auth-input">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email address"
              required
            />
          </div>

          <div className="auth-input password-input">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {isLogin && (
            <button
              type="button"
              className="forgot-password"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
          >
            {isLogin ? "Login to FoodChow" : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <>
              New to FoodChow?{" "}
              <button onClick={() => setMode("signup")}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;