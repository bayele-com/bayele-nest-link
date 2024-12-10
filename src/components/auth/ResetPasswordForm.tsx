import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending reset link..." : "Send reset link"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;