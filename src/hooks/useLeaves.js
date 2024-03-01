import { useContext } from "react";
//
import { LeaveContext } from "../context/LeaveContext";

// ----------------------------------------------------------------------

export const useLeaves = () => {
  const context = useContext(LeaveContext);

  if (!context) throw new Error("useLeaveContext context must be use inside LeaveProvider");

  return context;
};
