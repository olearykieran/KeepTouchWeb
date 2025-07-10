import Link from "next/link";
import Image from "next/image";
// Import logo directly
import LogoImage from "../assets/images/icon.png";

export default function Footer() {
  return (
    <footer className="py-12 px-4 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      <div className="w-full text-center">
        <div className="inline-flex items-center">
          <Image
            src={LogoImage}
            alt="KeepTouch Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-lg font-semibold text-gray-700">KeepTouch</span>

          {/* Fixed width spacer that will maintain exact width regardless of screen size */}
          <span className="inline-block w-10 md:w-16 lg:w-24"></span>

          <Link href="/privacy" className="text-gray-600 hover:text-gray-800 text-sm">
            Privacy Policy
          </Link>

          <span className="inline-block w-8 md:w-10"></span>

          <Link href="/terms" className="text-gray-600 hover:text-gray-800 text-sm">
            Terms of Service
          </Link>

          <span className="inline-block w-8 md:w-10"></span>

          <Link href="#" className="text-gray-600 hover:text-gray-800 text-sm">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        {new Date().getFullYear()} KeepTouch. All rights reserved.
      </div>
    </footer>
  );
}
