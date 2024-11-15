import { createLazyFileRoute } from "@tanstack/react-router";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export const Route = createLazyFileRoute("/sso-callback/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthenticateWithRedirectCallback
      signUpForceRedirectUrl={"/auth-callback"}
    />
  );
}
