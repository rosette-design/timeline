import { HiPlay, HiHome, HiShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Background image with half opacity */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: "url(/images/background.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Main content with higher z-index */}
      <main className="relative z-10 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Create your collection from{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              rosette.design
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Customize with love and share your story.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/1aff1864-ebb8-4967-b031-c0fa411b2569"
          >
            <HiPlay className="text-foreground:invert" size={20} />
            Demo
          </Link>
          <a
            className="rounded-full border-2 border-solid border-foreground transition-colors flex items-center justify-center hover:border-foreground/70 hover:text-foreground/70 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="mailto:rosette.workshop@gmail.com"
          >
            Contact Us
          </a>
        </div>
      </main>
      <footer className="relative z-10 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
