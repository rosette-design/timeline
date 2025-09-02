import { HiPlay, HiHome, HiShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Rosette Logo"
            width={64}
            height={64}
            className="rounded-lg"
          />
          <h1 className="text-6xl font-bold font-[family-name:var(--font-montserrat)] tracking-wider">
            ROSETTE
          </h1>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/1aff1864-ebb8-4967-b031-c0fa411b2569"
          >
            <HiPlay className="text-foreground:invert" size={20} />
            Demo
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="mailto:rosette.workshop@gmail.com"
          >
            Contact Us
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rosette.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HiHome className="text-foreground" size={16} />
          Home
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.etsy.com/uk/shop/RosetteDesignStudio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HiShoppingBag className="text-foreground" size={16} />
          Shop on Etsy.com
        </a>
      </footer>
    </div>
  );
}
