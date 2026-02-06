import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto h-16 w-16 rounded-full border-2 border-foreground bg-primary flex items-center justify-center shadow-brutal mb-4">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle>Check Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We&apos;ve sent a magic link to your email. Click the link to sign in — no password needed.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <Link href="/sign-in" className="text-primary hover:underline">try again</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
