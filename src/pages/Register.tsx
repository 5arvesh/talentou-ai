
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface userItem {
  email: string
  first_name: string;
  last_name: string;
  password: string
}

export function Register() {
  const [user, setUser] = useState<userItem[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(()=>{
    fetch("....")
      .then((response)=> response.json())
      .then((e)=> setUser(e as userItem[])); 
  }, [])
  
  const handleRegister = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/eula");
  };
  
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8 res-1200:p-2">
        {/* Logo */}

        {/* Mascot with speech bubble */}
        <AuthHeader/>

        {/* Registration Form */}
        <div className="max-w-md mx-auto w-full res-1200:max-w-xs res-1400:max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center res-1200:text-[18px] res-1200:mb-4 res-1400:text-[22px] res-1400:mb-6">Registration</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4 mt-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter Email Address" 
                        className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter Your First Name" 
                        className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter Your Last Name" 
                        className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password" 
                          className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs pr-12"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password" 
                          className="rounded-md shadow-sm h-12 res-1200:h-8 res-1200:text-xs pr-12"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit"
                style={{ backgroundColor: "#4ead3b", color: "black" }}
                className="w-full h-12 font-medium rounded-md shadow-sm hover:opacity-90 res-1200:h-8 res-1200:text-xs"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Right side - Green background with content */}
      <AuthRightLayout/>
    </div>
  );
}

export default Register;
