import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const { googleSignIn, signInWithPassword, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/password-setup");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithPassword(email, password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast({
        description: "Password reset email sent. Check your inbox.",
      });
      setIsResetting(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">
            {isResetting ? "Reset Password" : "Sign In"}
          </h2>
        </CardHeader>
        <CardContent>
          {!isResetting ? (
            <>
              <form onSubmit={handlePasswordSignIn} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsResetting(!isResetting)}
          >
            {isResetting ? "Back to Sign In" : "Forgot Password?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
