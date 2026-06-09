import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import ReCAPTCHA from "react-google-recaptcha";
import { API, siteKey } from "../global";
import { setAuthData } from "@/common/common";

interface LoginRequest {
  email: string;
  password: string;
  captcha_token: string;
}

interface UserData {
  token: string;
  user_id: string;
  tenant_key: string;
  active_project_id: string | null;
  active_role_key: string;
  user_role_key: string[];
  show_welcome_slider: boolean;
}

interface LoginResponse {
  success: boolean;
  result?: UserData;
  error?: {
    msg: string;
  };
}

export function Login() {
  const recaptchaRef = useRef<{ executeAsync: () => Promise<string> }>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<LoginResponse>;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/role-selection");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side — Login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8 res-1200:p-2">
        <AuthHeader />

        {/* Auth card */}
        <div className="max-w-[440px] mx-auto w-full mt-6 rounded-[16px] border border-gray-100 shadow-raised p-10 res-1200:p-6 res-1200:max-w-xs res-1400:max-w-[440px]">
          <h1 className="text-xl font-semibold text-gray-900 mb-7 text-center res-1200:text-base res-1200:mb-4">
            Welcome to Talentou
          </h1>

          <form onSubmit={onSubmit} className="space-y-5 res-1200:space-y-3">
            <div>
              <label htmlFor="email" className="text-[13px] font-semibold text-gray-700 mb-1.5 block">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="rounded-[10px] h-12 res-1200:h-8 res-1200:text-xs focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-[13px] font-semibold text-gray-700 mb-1.5 block">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="rounded-[10px] h-12 pr-10 res-1200:h-8 res-1200:text-xs focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-700 hover:text-purple-800 res-1200:text-xs"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-medium rounded-[10px] hover:opacity-90 res-1200:h-8 res-1200:text-xs"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">OR</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="text-purple-700 hover:text-purple-800 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>

      {/* Right side */}
      <AuthRightLayout />

      <ReCAPTCHA sitekey={`${siteKey}`} size="invisible" ref={recaptchaRef} />
    </div>
  );
}

export default Login;
