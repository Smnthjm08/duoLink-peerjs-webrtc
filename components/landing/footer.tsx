import {
  FaDiscord,
  FaTelegramPlane,
  FaTwitter,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const sections = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Features', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'Advertise', href: '#' },
    ],
  },
];

const Footer1 = () => {
  return (
    <section className="pt-4 pb-6">
      <div className="container">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          </div>
          <Separator className="my-14" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">Term of Services</a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <h3 className="mb-4 mt-8 font-bold">Social</h3>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaDiscord className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="https://www.linkedin.com/in/sumanthjm/">
                    <FaLinkedin className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="https://x.com/jm_sumanth">
                    <FaTwitter className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaTelegramPlane className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="https://github.com/Smnthjm08">
                    <FaGithub className="size-6" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">
            © 2024 Smnthjm08. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Footer1;
