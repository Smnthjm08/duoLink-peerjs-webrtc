import { auth } from "@/auth";
import { ModeToggle } from "@/app/mode-toogle";
import Link from "next/link";
import { ClientSideNav } from "./clientSideNav";

const AppBar = async () => {
  const session = await auth();

  return (
    <section className="py-4 bg-primary">
      <div className="container">
        
        {/* Desktop */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold pl-24 lg:text-2xl">
                <Link href="/">👀 duoLink</Link>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            <ClientSideNav session={session} />
          </div>
        </nav>

        {/* Mobile */}
        <ClientSideNav session={session} isMobile={true} />
      </div>
    </section>
  );
};

export default AppBar;