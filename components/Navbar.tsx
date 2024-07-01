import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeMode } from "./ThemeMode";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="flex items-center justify-between py-5 w-full lg:w-3/4 mx-auto">
        <ThemeMode />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </div>
  );
};

export default Navbar;
