import Navbar from "@/components/Navbar";
import Image from "next/image";
import heroCorner from "@/assets/hero_corner.svg";
import Arrow from "@/assets/arrow.svg";
import Link from "next/link";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto text-black px-4">
      <div className="relative">
        <div className="">
          <Navbar />
        </div>

        <section className="bg-[#CDFF75] rounded-bl-3xl rounded-br-3xl py-16 px-8 flex flex-col md:flex-row items-center justify-between mb-16 relative">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              CLICK THE <span className="text-[#5142ff]">SCORE</span>,<br />
              <span className="text-[#5142ff]">TRUST</span> TO CONNECT
            </h1>
          </div>
        </section>
        <div className="flex absolute bottom-0 right-0 translate-y-5/6">
          <div className="relative bg-[#CDFF75] flex items-center px-8 py-4 rounded-br-3xl w-full md:w-auto">
            <Link
              href="/profile"
              className="text-2xl flex items-center gap-2  h-[42.5px] cursor-pointer group hover:translate-x-1 transition-transform duration-300"
            >
              show your score
              <Image
                src={Arrow}
                alt="Logo"
                width={12}
                height={12}
                className="w-4 h-4 object-contain group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Image
              src={heroCorner}
              alt="divbar Corner"
              className="absolute left-0 bottom-0 top-0 -translate-x-4/5 "
              width={140}
              height={200}
              priority
            />
          </div>
        </div>
      </div>
      <div className="py-12">
        <FeatureGrid />
      </div>
    </div>
  );
}
