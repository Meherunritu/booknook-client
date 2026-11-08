import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

const socials = [
  { href: "https://x.com", label: "BookNook on X", icon: FaXTwitter },
  { href: "https://facebook.com", label: "BookNook on Facebook", icon: FaFacebookF },
  { href: "https://instagram.com", label: "BookNook on Instagram", icon: FaInstagram },
  { href: "https://github.com", label: "BookNook on GitHub", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-secondary">
            <BookOpen size={26} />
            BookNook
          </Link>
          <p className="mt-4 max-w-sm text-sm opacity-80">
            A small online library where neighbours share their shelves. Add a book, borrow a book, return a book.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="btn btn-circle btn-sm btn-outline border-neutral-content/30 text-neutral-content hover:border-secondary hover:bg-secondary hover:text-secondary-content">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link className="hover:text-secondary" href="/">Home</Link></li>
            <li><Link className="hover:text-secondary" href="/books">All Books</Link></li>
            <li><Link className="hover:text-secondary" href="/add-book">Add a Book</Link></li>
            <li><Link className="hover:text-secondary" href="/my-borrows">My Borrows</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail size={16} /> hello@booknook.app</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 1700 000 000</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-content/15 py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
