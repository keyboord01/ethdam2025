"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { BrowserProvider } from "ethers";
import { wrapEthersSigner } from "@oasisprotocol/sapphire-ethers-v6";

type WalletContextType = {
  account: string | null;
  signer: any | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType>({
  account: null,
  signer: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<any | null>(null);

  useEffect(() => {
    const loadPersistedWallet = async () => {
      const persistedAccount = localStorage.getItem("walletAccount");
      if (persistedAccount) {
        try {
          const ethereum = (window as any).ethereum;
          if (!ethereum) {
            localStorage.removeItem("walletAccount");
            return;
          }

          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (
            accounts.length > 0 &&
            accounts[0].toLowerCase() === persistedAccount.toLowerCase()
          ) {
            const provider = new BrowserProvider(ethereum);
            const wrappedSigner = await wrapEthersSigner(
              await provider.getSigner()
            );
            setAccount(accounts[0]);
            setSigner(wrappedSigner);
          } else {
            localStorage.removeItem("walletAccount");
          }
        } catch (error) {
          console.error("Failed to restore wallet connection:", error);
          localStorage.removeItem("walletAccount");
        }
      }
    };

    loadPersistedWallet();
  }, []);

  async function connectWallet() {
    console.log("[Wallet] Starting connection process...");

    const sapphireChain = {
      chainId: "0x5aff",
      chainName: "Oasis Sapphire Testnet",
      nativeCurrency: {
        name: "TEST",
        symbol: "TEST",
        decimals: 18,
      },
      rpcUrls: ["https://testnet.sapphire.oasis.io/"],
      blockExplorerUrls: ["https://testnet.explorer.sapphire.oasis.dev/"],
    };

    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new BrowserProvider(ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== BigInt(sapphireChain.chainId)) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: sapphireChain.chainId }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [sapphireChain],
            });
          } else {
            throw switchError;
          }
        }
      }

      const finalNetwork = await provider.getNetwork();
      if (finalNetwork.chainId !== BigInt(sapphireChain.chainId)) {
        throw new Error("Please switch to Sapphire Testnet in MetaMask");
      }

      const wrappedSigner = await wrapEthersSigner(await provider.getSigner());

      setAccount(accounts[0]);
      setSigner(wrappedSigner);
      localStorage.setItem("walletAccount", accounts[0]);
    } catch (error) {
      console.error("Connection failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Connection failed. Please check MetaMask and try again."
      );
    }
  }

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    localStorage.removeItem("walletAccount");
  };

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0].toLowerCase() !== account?.toLowerCase()) {
        setAccount(accounts[0]);
        localStorage.setItem("walletAccount", accounts[0]);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [account]);

  return (
    <WalletContext.Provider
      value={{ account, signer, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}
