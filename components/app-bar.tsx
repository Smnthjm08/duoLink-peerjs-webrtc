import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/app/mode-toogle";
import { LoginButton } from "./auth/login-button";

const AppBar = () => {
  return (
    <section className="py-4 bg-primary">
      <div className="container">
        {/* {Desktop} */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold pl-24  lg:text-2xl">
                👀 duoLink
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            <Button className="font-extrabold bg-slate-50 text-slate-900">
              Log in
            </Button>
            <LoginButton>
              <Button variant={"outline"} className="font-extrabold">
                Sign Up
              </Button>
            </LoginButton>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">👀 duoLink</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">👀 duoLink</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-col gap-4">
                  <a href="#" className="font-semibold">
                    Home
                  </a>
                </div>
                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-3">
                    <Button variant={"outline"}>Log in</Button>
                    <LoginButton>
                      <Button variant={"secondary"} size={"lg"}>
                        Sign In
                      </Button>
                    </LoginButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBar;
