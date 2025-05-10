"use client";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { FaCopy, FaSpinner, FaUserCircle } from "react-icons/fa";
import { useWallet } from "@/components/WalletProvider";

const MOCK_USER = {
  name: "loremipsum",
  wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m",
  score: 86,
  connections: [
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 27 },
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 59 },
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 78 },
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 94 },
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 33 },
    { wallet: "0xc1fgdhj7dhg7337b39753n7832923n94m", score: 14 },
  ],
};

export default function ProfilePage() {
  const { account } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [account]);

  // const router = useRouter();
  // const contractHelpers = useContractHelpers(signer);
  // const [score, setScore] = useState<number | null>(null);

  // useEffect(() => {
  //   if (!account) {
  //     router.push("/");
  //     return;
  //   }

  //   const fetchScore = async () => {
  //     if (contractHelpers && account) {
  //       try {
  //         const userScore = await contractHelpers.getScore(account);
  //         setScore(userScore);
  //       } catch (error) {
  //         console.error("Failed to fetch score:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchScore();
  // }, [account, contractHelpers, router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(MOCK_USER.wallet);
  };

  const getScoreColorClass = (score: number) => {
    if (score > 60) return "text-green-500";
    if (score > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen text-black px-4">
      <Navbar />

      <div className="flex flex-col items-center font-medium">
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="flex-1 flex flex-col items-start gap-2 bg-[#CDFF75] py-12 rounded-b-2xl rounded-tr-2xl p-8 ">
            <div className="flex items-center gap-6 mb-4">
              <div className="bg-gray-200 rounded-full p-2">
                <FaUserCircle className="text-7xl text-gray-700" />
              </div>
              <div>
                {account && (
                  <>
                    <div className="text-3xl font-semibold mb-1">
                      {MOCK_USER.name}
                    </div>
                    <div className="text-lg text-gray-500 flex items-center gap-2">
                      {account}
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-[#CDFF75] rounded-2xl p-8 text-center ">
            {account ? (
              <>
                <div className="text-2xl mb-2">Your Score:</div>
                <div className="text-7xl font-bold">
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    MOCK_USER.score
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl mb-2">
                  Connect wallet to see your score
                </div>
              </>
            )}
          </div>
        </div>

        {account && (
          <div className="w-full mt-16">
            <div className="text-3xl font-semibold mb-6">Connections:</div>
            <div className="flex flex-col gap-2 bg-white rounded-3xl  overflow-hidden">
              {MOCK_USER.connections.map((conn, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="bg-gray-200 rounded-full p-1">
                    <FaUserCircle className="text-3xl text-gray-700" />
                  </div>
                  <div className="flex-1 text-lg text-gray-600 truncate">
                    {conn.wallet}
                  </div>
                  <div className="text-xl font-semibold mr-2 flex flex-row items-center gap-2">
                    score:
                    <span className={getScoreColorClass(conn.score)}>
                      {loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        conn.score
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
