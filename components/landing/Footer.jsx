import Link from "next/link";
import { TwitterIcon, GithubIcon, MailIcon } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    {
      title: "Feed",
      url: "/feed",
    },
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Feedback",
      url: "adf",
    },
  ];

  const contact = [
    {
      title: <TwitterIcon />,
      url: "https://twitter.com/kenma_dev",
    },
    {
      title: <GithubIcon />,
      url: "https://github.com/prasoonk1204",
    },
    {
      title: <MailIcon />,
      url: "mailto:prasoonkumar467@gmail.com",
    },
  ];

  return (
    <div className="border-t-1 border-black text-black mx-4 sm:mx-16 lg:mx-30 mb-10 flex flex-col sm:flex-row justify-between items-center sm:items-start py-8 gap-8 relative">
      <div className="text-center sm:text-start">
        <h3 className="text-2xl sm:text-4xl font-semibold">Tunetic</h3>
        <h3 className="text-lg mb-4 sm:mb-8">Vibe. Suggest. Repeat.</h3>
        <div className="flex gap-4 justify-center sm:justify-start">
          {contact.map((link, index) => {
            return (
              <Link key={index} href={link.url} target="_blank">
                <p className="bg-black text-white p-2 rounded-full hover:scale-110 hover:bg-gray-800 transition-all duration-100 cursor-pointer">
                  {link.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="text-center sm:text-end">
        <h3 className="text-xl sm:text-3xl mb-4">Quick Links</h3>
        <div className="flex gap-1 flex-col">
          {quickLinks.map((link, index) => {
            return (
              <Link className="hover:-translate-x-1 transition-all duration-100" key={index} href={link.url}>
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tunetic. All rights reserved.
      </div>
    </div>
  );
}
