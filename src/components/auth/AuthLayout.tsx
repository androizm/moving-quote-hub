import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  error: string | null;
  children: React.ReactNode;
}

export const AuthLayout = ({ title, error, children }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Password must be at least 6 characters long.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};