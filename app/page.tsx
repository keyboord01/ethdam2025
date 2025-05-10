"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import heroCorner from "@/assets/hero_corner.svg";
import Arrow from "@/assets/arrow.svg";
import Link from "next/link";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useWallet } from "@/components/WalletProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { account } = useWallet();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    setIsSearchVisible(!!account);
  }, [account]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto text-black px-4">
      <div className="relative">
        <div className="">
          <Navbar />
        </div>
        <section className="bg-[#CDFF75] rounded-bl-3xl py-16 px-8 flex flex-col md:flex-row items-center justify-between mb-16 relative">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              CLICK THE <span className="text-[#32008a]">SCORE</span>,<br />
              <span className="text-[#32008a]">TRUST</span> TO CONNECT
            </h1>
          </div>
        </section>

        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20, width: 0 }}
              animate={{ opacity: 1, y: 0, width: "auto" }}
              exit={{ opacity: 0, y: -20, width: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 !w-full left-0 md:translate-y-32 translate-y-44 mr-6"
            >
              <form onSubmit={handleSearch}>
                <motion.div
                  className="flex items-center rounded-b-2xl rounded-tr-2xl overflow-hidden pr-2 border-2 border-[#BABABA]"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{
                    duration: 0.6,
                    ease: "linear",
                    delay: 0.1,
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search wallets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-2 pl-4 w-full pr-10 outline-none text-black placeholder-gray-400 "
                  />
                  <motion.button
                    type="submit"
                    className="text-[#7a7a7a] hover:text-[#4d4c4c] transition-colors duration-300 flex gap-1 items-center text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <FaSearch
                      size={20}
                      className="pt-1"
                    />
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex absolute bottom-0 left-0 md:translate-y-18 translate-y-30"
          >
            <p className="text-4xl font-bold">Explore Other Wallets</p>
          </motion.div>
        )}
        <div className="flex absolute bottom-0 right-0 translate-y-18">
          <div className="relative bg-[#CDFF75] flex items-center px-8 py-4 rounded-br-3xl w-full md:w-auto">
            <Link
              href="/profile"
              className="text-2xl flex text-[#32008a] items-center gap-2 h-[42.5px] cursor-pointer group hover:translate-x-1 transition-transform duration-300"
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
              className="absolute left-0 bottom-0 top-0 -translate-x-4/5"
              width={140}
              height={200}
              priority
            />
          </div>
        </div>
      </div>
      <FeatureGrid />
      <Footer />
    </div>
  );
}
