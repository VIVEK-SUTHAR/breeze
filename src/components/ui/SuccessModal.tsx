import React from "react";

interface TransactionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  hash: string;
}

const TransactionSuccessModal: React.FC<TransactionSuccessModalProps> = ({
  isOpen,
  onClose,
  hash,
}) => {
  if (!isOpen) return null;

  const blockExplorerUrl = `https://etherscan.io/tx/${hash}`;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-bold text-orange-500 mb-4">Success!</h2>
        <p className="text-sm text-gray-700 mb-4">
          Your transaction was successful.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Transaction Hash:{" "}
          <a
            href={blockExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {hash}
          </a>
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccessModal;
