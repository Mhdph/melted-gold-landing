import { Transaction } from "./types";

// Helper function to check if transaction is pending
export const isPending = (tx: Transaction) => {
  // Prioritize status field over accept field
  if (tx.status) {
    return tx.status === "inProgress";
  }
  return tx.accept === false;
};

// Helper function to check if transaction is approved
export const isApproved = (tx: Transaction) => {
  // Prioritize status field over accept field
  if (tx.status) {
    return tx.status === "success";
  }
  return tx.accept === true;
};

// Helper function to check if transaction is rejected
export const isRejected = (tx: Transaction) => {
  // Prioritize status field over accept field
  if (tx.status) {
    return tx.status === "reject";
  }
  return tx.accept !== true && tx.accept !== false;
};

// Helper function to get transaction status display text
export const getStatusText = (tx: Transaction) => {
  // Prioritize status field over accept field
  if (tx.status) {
    switch (tx.status) {
      case "inProgress":
        return "در انتظار";
      case "success":
        return "تایید شده";
      case "reject":
        return "رد شده";
      default:
        return "نامشخص";
    }
  }

  // Fallback to accept field
  if (tx.accept === false) return "در انتظار";
  if (tx.accept === true) return "تایید شده";
  return "رد شده";
};

// Helper function to get transaction status CSS classes
export const getStatusClasses = (tx: Transaction) => {
  // Prioritize status field over accept field
  if (tx.status) {
    switch (tx.status) {
      case "inProgress":
        return "bg-gold/10 text-gold";
      case "success":
        return "bg-green-400/10 text-green-400";
      case "reject":
        return "bg-red-400/10 text-red-400";
      default:
        return "bg-gray-400/10 text-gray-400";
    }
  }

  // Fallback to accept field
  if (tx.accept === false) return "bg-gold/10 text-gold";
  if (tx.accept === true) return "bg-green-400/10 text-green-400";
  return "bg-red-400/10 text-red-400";
};
