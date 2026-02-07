"use client";

import React, { useState } from "react";

import AvatarCard from "./AvatarCard";
import AvatarModal from "./AvatarModal";
import { addHolding } from "@/app/staking/server_actions";

type avatar = {
  id: number;
  address: string;
  isStaked: boolean;
  stakedAt: Date | null;
  contract: string;
};

interface AvatarCardProps {
  avatars: avatar[];
  is3d: boolean;
  name: string;
}

const AvatarGrid: React.FC<AvatarCardProps> = ({ avatars, is3d, name }) => {
  const itemsPerPage = 10; // Number of items per page

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">(
    "next"
  );

  // Calculate the start and end indices of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's items
  const currentItems = avatars.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(avatars.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (isAnimating) return; // Prevent triggering animation mid-transition
    setIsAnimating(true);
    setAnimationDirection(direction);

    setTimeout(() => {
      setIsAnimating(false);
      setCurrentPage((prev) =>
        direction === "next"
          ? Math.min(prev + 1, totalPages)
          : Math.max(prev - 1, 1)
      );
    }, 500); // Match the animation duration
  };

  const openModal = (tokenid: number) => {
    if (is3d) {
      setSelectedNFT(tokenid);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const StakeClick = async (
    tokenId: number,
    address: string,
    contract: string
  ) => {
    console.log("StakeClick", tokenId, address);

    try {
      await addHolding(tokenId, address, contract);
      // Optionally refresh the avatars list or update UI
    } catch (error) {
      console.error("Error staking token:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        {/* Prev Button */}
        <div>
          <button
            disabled={currentPage === 1 || isAnimating}
            onClick={() => {
              handlePageChange("prev");
            }}
            className={`w-24 h-24 flex items-center justify-center bg-white text-bison-300 rounded-full shadow-lg hover:text-bison-600 focus:outline-none focus:ring-2 focus:ring-bison-300 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-24 h-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l-7-7 7-7"
              />
              <path
                d="M6 12 H18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="text-center text-bison-600 text-xl align-bottom">
          Total {name} NFTs: {avatars.length}
        </div>
        {/* Next Button */}
        <div>
          <button
            disabled={currentPage === totalPages || isAnimating}
            onClick={() => handlePageChange("next")}
            className={`w-24 h-24 flex items-center justify-center bg-white text-bison-300 rounded-full shadow-lg hover:text-bison-600 focus:outline-none focus:ring-2 focus:ring-bison-300 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-24 h-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5l7 7-7 7"
              />
              <path
                d="M6 12 H18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2 grid-cols-2 transition-transform duration-500 ${
          isAnimating
            ? animationDirection === "next"
              ? "-translate-x-full"
              : "translate-x-full"
            : "translate-x-0"
        }`}
      >
        {currentItems.map((avatar) => (
          <>
            <AvatarCard
              key={avatar.id.toString()}
              apeId={avatar.id.toString()}
              onClick={() => openModal(avatar.id)}
              is3d={is3d}
              isStaked={avatar.isStaked}
              stakedAt={avatar.stakedAt}
              StakeClick={() =>
                StakeClick(avatar.id, avatar.address, avatar.contract)
              }
            />
          </>
        ))}

      </div>
      {isModalOpen && selectedNFT > 0 && (
        <AvatarModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          avatarId={selectedNFT}
        />
      )}
    </div>
  );
};

export default AvatarGrid;
