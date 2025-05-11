"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import {
  FaCopy,
  FaSpinner,
  FaUserCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaTimes,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";

const generateRandomName = () => {
  const adjectives = [
    "Crypto",
    "Blockchain",
    "Web3",
    "DeFi",
    "NFT",
    "Smart",
    "Digital",
  ];
  const nouns = [
    "Explorer",
    "Trader",
    "Builder",
    "Creator",
    "Master",
    "Guru",
    "Wizard",
  ];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

export default function ExplorePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const { account, signer } = useWallet();
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [showDontTrustModal, setShowDontTrustModal] = useState(false);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [trustState, setTrustState] = useState<"trusted" | "untrusted" | null>(
    null
  );
  const [userData, setUserData] = useState({
    name: generateRandomName(),
    wallet: (params?.explore as string) || "",
    score: 75,
  });

  useEffect(() => {
    if (!params?.explore) return;

    setLoading(true);

    const fetchWalletData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUserData((prev) => ({
          ...prev,
          wallet: params.explore as string,
          name: generateRandomName(),
          score: 75,
        }));
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [params?.explore]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.wallet);
  };

  const handleTrustClick = () => {
    setShowTrustModal(true);
  };

  const handleDontTrustClick = () => {
    setShowDontTrustModal(true);
  };

  const simulateTransaction = async (isTrust: boolean) => {
    if (!signer || !account) return;

    try {
      setIsTransactionPending(true);

      const transaction = {
        from: account,
        to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        value: "0x0",
        data: isTrust ? "0x1234" : "0x5678",
      };

      await signer.sendTransaction(transaction);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTrustState(isTrust ? "trusted" : "untrusted");
      setShowTrustModal(false);
      setShowDontTrustModal(false);
      setDays(0);
      setHours(0);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsTransactionPending(false);
    }
  };

  const handleTrustSubmit = async () => {
    if (!userData.wallet || (!days && !hours)) return;
    await simulateTransaction(true);
  };

  const handleDontTrustSubmit = async () => {
    if (!userData.wallet || (!days && !hours)) return;
    await simulateTransaction(false);
  };

  const closeModal = () => {
    setShowTrustModal(false);
    setShowDontTrustModal(false);
    setDays(0);
    setHours(0);
  };

  const getScoreColorClass = (score: number) => {
    if (score > 60) return "text-green-500";
    if (score > 30) return "text-yellow-500";
    return "text-red-500";
  };

  const TrustModal = ({ isTrust = true }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">
            {isTrust ? "Trust this Wallet" : "Don't Trust this Wallet"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2 font-medium">Expires in:</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Days</label>
              <input
                type="number"
                min="0"
                max="365"
                value={days}
                onChange={(e) =>
                  setDays(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Hours</label>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) =>
                  setHours(
                    Math.max(0, Math.min(23, parseInt(e.target.value) || 0))
                  )
                }
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Will expire in {days} {days === 1 ? "day" : "days"} and {hours}{" "}
            {hours === 1 ? "hour" : "hours"}
          </p>
        </div>

        <button
          onClick={isTrust ? handleTrustSubmit : handleDontTrustSubmit}
          disabled={(!days && !hours) || isTransactionPending}
          className={`w-full p-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
            isTrust
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } disabled:opacity-50 transition-colors`}
        >
          {isTransactionPending ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              {isTrust ? <FaThumbsUp /> : <FaThumbsDown />}
              <span>
                {isTransactionPending
                  ? "Confirm in MetaMask..."
                  : `Confirm ${isTrust ? "Trust" : "Don't Trust"}`}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (!params?.explore) {
    return (
      <div className="max-w-6xl mx-auto min-h-screen text-black px-4">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-2xl text-gray-500">
            No wallet address provided
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen text-black px-4">
      <Navbar />

      <div className="flex flex-col items-center font-medium">
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="flex-1 flex flex-col items-start gap-2 bg-[#CDFF75] py-12 rounded-b-2xl rounded-tr-2xl p-8">
            <div className="flex items-center gap-6 mb-4">
              <div className="bg-gray-200 rounded-full p-2">
                <FaUserCircle className="text-7xl text-gray-700" />
              </div>
              <div>
                <div className="text-3xl font-semibold mb-1">
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    userData.name
                  )}
                </div>
                <div className="text-lg text-gray-500 flex items-center gap-2">
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      {userData.wallet}
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg"
                      >
                        <FaCopy />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-[#CDFF75] rounded-2xl p-8 text-center">
            <div className="text-2xl mb-2">Score:</div>
            <div
              className={`text-7xl font-bold ${getScoreColorClass(
                userData.score
              )}`}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                userData.score
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-16 flex flex-col items-center">
          {account ? (
            <div className="flex gap-8">
              <button
                onClick={handleTrustClick}
                disabled={loading || trustState !== null}
                className={`flex items-center gap-3 ${
                  trustState === "trusted"
                    ? "bg-green-100 border-green-500 text-green-600"
                    : trustState === "untrusted"
                    ? "bg-gray-100 border-gray-300 text-gray-400"
                    : "bg-white border-green-500 text-green-600 hover:bg-green-50"
                } border-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 shadow-md`}
              >
                <FaThumbsUp className="text-2xl" />
                <span className="text-xl font-medium">
                  {trustState === "trusted" ? "Trusted" : "Trust"}
                </span>
              </button>
              <button
                onClick={handleDontTrustClick}
                disabled={loading || trustState !== null}
                className={`flex items-center gap-3 ${
                  trustState === "untrusted"
                    ? "bg-red-100 border-red-500 text-red-600"
                    : trustState === "trusted"
                    ? "bg-gray-100 border-gray-300 text-gray-400"
                    : "bg-white border-red-500 text-red-600 hover:bg-red-50"
                } border-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 shadow-md`}
              >
                <FaThumbsDown className="text-2xl" />
                <span className="text-xl font-medium">
                  {trustState === "untrusted" ? "Untrusted" : "Don't Trust"}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-start ">
              <div className="text-2xl text-gray-500">
                Connect your wallet to trust or untrust a wallet
              </div>
            </div>
          )}
        </div>

        {showTrustModal && <TrustModal isTrust={true} />}
        {showDontTrustModal && <TrustModal isTrust={false} />}
      </div>
    </div>
  );
}
