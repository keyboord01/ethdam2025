"use client";
import Link from "next/link";
import { useWallet } from "./WalletProvider";
import Image from "next/image";
import navbarCorner from "@/assets/navbar_corner.svg";
import Logo from "@/assets/logo.svg";
import { useState, useEffect } from "react";

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const ConnectedDot = () => (
  <div className="h-2 w-2 rounded-full bg-green-500" />
);

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
);

export default function Navbar() {
  const { account, connectWallet, signer } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isValidNetwork, setIsValidNetwork] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      if (signer?.provider) {
        try {
          const network = await signer.provider.getNetwork();
          const isValid = network.chainId.toString(16) === "5aff";
          setIsValidNetwork(isValid);
        } catch (error) {
          console.error("Network check failed:", error);
          setIsValidNetwork(false);
        }
      }
    };

    checkNetwork();
  }, [signer]);

  const disconnectWallet = () => {
    window.location.reload();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="flex flex-col md:flex-row w-full mt-4">
      <div className="relative bg-[#CDFF75] flex items-center px-8 py-4 rounded-tl-3xl w-full md:w-auto">
        <Link
          href="/"
          className="text-3xl font-bold flex items-center gap-4"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={20}
            height={20}
            className="w-8 h-8 object-contain"
          />
          ZenCycle
        </Link>
        <button
          className="ml-auto md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <MenuIcon isOpen={menuOpen} />
        </button>
        <Image
          src={navbarCorner}
          alt="Navbar Corner"
          className="absolute right-0 bottom-0 top-0 translate-x-4/5 md:block hidden"
          width={140}
          height={200}
          priority
        />
      </div>
      <div
        className={`
          flex-1 flex-col md:flex md:flex-row items-center justify-end gap-4 md:gap-8 px-8 py-4
          bg-white md:bg-transparent
          ${menuOpen ? "flex" : "hidden"}
          md:flex
        `}
      >
        <Link
          href="#"
          className="relative hover:text-[#32008A] transition-colors duration-300 text-xl font-medium cursor-pointer group"
        >
          <span>whitelist</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#32008A] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="#"
          className="relative hover:text-[#32008A] transition-colors duration-300 text-xl font-medium cursor-pointer group"
        >
          <span>docs</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#32008A] transition-all duration-300 group-hover:w-full"></span>
        </Link>
        {account && (
          <Link
            href="/profile"
            className="relative hover:text-[#32008A] transition-colors duration-300 text-xl font-medium cursor-pointer group"
          >
            <span>profile</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#32008A] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}
        {account ? (
          <div className="flex items-center gap-4 font-medium">
            {!isValidNetwork && (
              <span className="text-red-500 text-sm">Wrong Network!</span>
            )}
            <div className="relative group">
              <button
                className="ml-2 px-4 pb-2 pt-1 border rounded-lg bg-[#F5F5F5] hover:bg-red-50 hover:text-red-600 transition cursor-pointer flex items-center gap-2"
                onClick={disconnectWallet}
              >
                <span>{formatAddress(account)}</span>
                <div className="relative w-4 h-4">
                  <div className="absolute top-1.5 left-1 inset-0 transition-opacity duration-200 group-hover:opacity-0 animate-pulse">
                    <ConnectedDot />
                  </div>
                  <div className="absolute top-0.5 inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <LogoutIcon />
                  </div>
                </div>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Click to disconnect wallet
              </div>
            </div>
          </div>
        ) : (
          <button
            className="ml-2 px-4 4 pb-2 pt-1 border rounded-lg bg-[#F5F5F5] hover:bg-gray-100 transition cursor-pointer font-medium"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
