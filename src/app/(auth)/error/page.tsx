import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto h-16 w-16 rounded-full border-2 border-foreground bg-destructive flex items-center justify-center shadow-brutal mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive-foreground" />
          </div>
          <CardTitle>Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Something went wrong during authentication. Please try again.
          </p>
          <Link href="/sign-in">
            <Button>Back to Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
