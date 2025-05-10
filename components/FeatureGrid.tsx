"use client";

import Link from "next/link";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";
import { useWallet } from "./WalletProvider";

const FeatureGrid = () => {
  const { account } = useWallet();
  const features = [
    {
      number: "01",
      title: "Building A Trust Proven Network",
      description:
        "Create your own network with users that you decided to trust, grow your network by connecting with high-scoring users, from DeFi traders to DAO members.",
      className: "col-span-1 lg:col-span-2 row-span-1",
    },
    {
      number: "02",
      title: "Build A Safer Space",
      description:
        "Free Network of scammers and bots, powered by ROFL Agent and privacy tech.",
      className: "col-span-1 lg:col-span-1 row-span-1",
    },
    {
      number: "03",
      title: "Non-Distance Trust",
      description:
        "You can now trust your crypto friend whose face you've never seen or voice you've never heard, not just through their vibe, but through their transactions too.",
      className: "col-span-1 lg:col-span-3 row-span-1",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`max-w-6xl mx-auto ${
        account ? "md:mt-36 mt-48" : "md:mt-0 mt-18"
      } transition-all duration-300`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-2">Features</h2>
        <div className="w-16 h-1 bg-[#242919] rounded-full"></div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`${feature.className}`}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-20 mb-24">
        <motion.div
          className="bg-[#CDFF75] rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-lg">
              Join our network and start building trust-based connections today.
            </p>
          </div>

          <Link
            href="https://x.com/blockchainytu"
            rel="noopener noreferrer"
            target="_blank"
            className="bg-[#242919] text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            Follow us on X
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureGrid;
