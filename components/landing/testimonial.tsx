import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Testimonial = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center">
          <div className="text-3xl font-bold md:text-5xl lg:text-7xl">
            <p className="flex flex-wrap items-center justify-center">
              Begin video call quickly.
              <span className="mx-4 inline-flex items-center -space-x-4">
                <Avatar className="size-11 border lg:size-16">
                  <AvatarImage
                    src="https://www.shadcnblocks.com/images/block/avatar-1.webp"
                    alt="placeholder"
                  />
                </Avatar>
                <Avatar className="size-11 border lg:size-16">
                  <AvatarImage
                    src="https://www.shadcnblocks.com/images/block/avatar-6.webp"
                    alt="placeholder"
                  />
                </Avatar>
                <Avatar className="size-11 border lg:size-16">
                  <AvatarImage
                    src="https://www.shadcnblocks.com/images/block/avatar-3.webp"
                    alt="placeholder"
                  />
                </Avatar>
              </span>
               At no cost at all.
            </p>
          </div>
          <Button size={'lg'} className="mt-10">
            Get started for free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
