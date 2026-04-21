import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import ReCAPTCHA from "react-google-recaptcha";
import { API, siteKey } from "../global";
import { setDefaultResultOrder } from "dns/promises";
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
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    return data;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   navigate("/role-selection");
    // setLoading(true);
    // try {
    //   const tokens = await recaptchaRef.current.executeAsync();
    //   // console.log("Login data:", { email, password },tokens);

    //   const loginPayload: LoginRequest = {
    //     email: email.toLowerCase(),
    //     password: password,
    //     captcha_token: tokens,
    //   };

    //   if(!email || !password){
    //     setLoading(false);
    //     setError("Please fill the required field")
    //   }else{
    // setLoading(false);
    //  const res = await loginUser(loginPayload);
    
    //   if (res.success) {
        
    //     const userData = res?.result;
    //     setAuthData(userData);
    //     const { user_role_key, show_welcome_slider } = userData;
    //     if (user_role_key.length === 1) {
    //       if (!show_welcome_slider) {
    //         navigate("/onboarding/step1");
    //       }
    //     } else {
    //       navigate("/role-selection");
    //     }
    //   }
    
    //   setError("")
    //   }

   
    // } catch (err) {
    //     setLoading(false);
    // }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8 res-1200:p-2">
        <AuthHeader />

        {/* Login Form */}
        <div className="max-w-md mx-auto w-full res-1200:max-w-xs res-1400:max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">
            Let's Get Started
          </h1>

          <form onSubmit={onSubmit} className="space-y-6 res-1200:space-y-3">
            <Input
              placeholder="Enter Email Address"
              className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="rounded-md shadow-sm h-12 pr-10 res-1200:h-8 res-1200:text-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          {/* {error && <div className="text-red-500">{error}</div>} */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-gray-600 hover:text-gray-900 res-1200:text-xs"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              style={{ backgroundColor:loading? "#d1d1d1": "#4ead3b", color: "black", cursor:loading? "not-allowed":"pointer" }}
              className="w-full h-12 font-medium rounded-md shadow-sm hover:opacity-90 res-1200:h-8 res-1200:text-xs "
            >
              {loading ? "Loading...":"Login"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Shared layout */}
      <AuthRightLayout />

      <ReCAPTCHA sitekey={`${siteKey}`} size="invisible" ref={recaptchaRef} />
    </div>
  );
}

export default Login;
