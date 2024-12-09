import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;