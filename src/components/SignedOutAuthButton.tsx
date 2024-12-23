import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./Export";

const SignedOutAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = async () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  if (!isLoaded) return null;
  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="text-white border-zinc-200"
    >
      Continue With <img className="size-6" src="/google.png" alt="Google" />
    </Button>
  );
};

export default SignedOutAuthButton;
