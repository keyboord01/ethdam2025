import { ethers } from "ethers";
import { Signer } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const CONTRACT_ABI: string[] = [];

export interface ContractHelpers {
  getScore: (userAddress: string) => Promise<number>;
  updateScore: (newScore: number) => Promise<void>;
}

export const createContractHelpers = (signer: Signer): ContractHelpers => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const getScore = async (userAddress: string): Promise<number> => {
    try {
      const score = await contract.getScore(userAddress);
      return Number(score);
    } catch (error) {
      console.error("Error fetching score:", error);
      throw error;
    }
  };

  const updateScore = async (newScore: number): Promise<void> => {
    try {
      const tx = await contract.updateScore(newScore);
      await tx.wait();
    } catch (error) {
      console.error("Error updating score:", error);
      throw error;
    }
  };

  return {
    getScore,
    updateScore,
  };
};

export const useContractHelpers = (signer: Signer | null) => {
  if (!signer) {
    return null;
  }

  return createContractHelpers(signer);
};
