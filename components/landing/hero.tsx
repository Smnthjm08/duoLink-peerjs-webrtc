import { Bell, CalendarPlus, PlayCircle, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container">
        <Badge
          variant="outline"
          className="mb-4 max-w-full text-sm font-normal lg:mb-10 lg:py-2 lg:pl-2 lg:pr-5"
        >
          <span className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
            <Bell className="size-4" />
          </span>
          <p className="truncate whitespace-nowrap font-bold">
            This is beta version!
          </p>
        </Badge>
        <h1 className="mb-6 text-4xl font-bold leading-none tracking-tighter md:text-[7vw] lg:text-8xl">
          Connect Instantly Anywhere.
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl font-medium">
          Seamless, high-quality video calls powered by WebRTC and Peerjs.
          Experience real-time collaboration without the hassle.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <Button size={"lg"} className="w-full md:w-auto  font-semibold">
          <CalendarPlus className="mr-2 size-5" />
            New Meeting
          </Button>
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-full md:w-auto  font-semibold"
          >
            <Video className="mr-2 size-4" />
            Join Meeting
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
