import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useCallback, useMemo, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export const LeaveContext = createContext(null);

// ----------------------------------------------------------------------

LeaveProvider.propTypes = {
  children: PropTypes.node,
};

export function LeaveProvider({ children }) {
  const { DB, user } = useAuthContext();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setLoading] = useState(false);

  console.log("User:", user);

  const requestLeave = async (leaveData) => {
    try {
      const leaveRequestsRef = collection(DB, "leaveRequests");
      const response = await addDoc(leaveRequestsRef, {
        userId: user?.uid,
        displayName: user?.displayName,
        ...leaveData,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const leaveRequestsRef = collection(DB, "leaveRequests");
      const q = query(leaveRequestsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLoading(false);
      setLeaveRequests(requests);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const fetchAllLeaveRequests = async () => {
    try {
      setLoading(true);
      const leaveRequestsRef = collection(DB, "leaveRequests");
      const querySnapshot = await getDocs(leaveRequestsRef);
      const requests = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLeaveRequests(requests);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const fetchLeaveRequestsById = async (id) => {
    try {
      const leaveRequestRef = doc(DB, "leaveRequests", id);
      const leaveRequestSnapshot = await getDoc(leaveRequestRef);

      if (leaveRequestSnapshot.exists()) {
        return {
          ...leaveRequestSnapshot.data(),
          id: leaveRequestSnapshot.id,
        };
      } else {
        throw Error("Leave request not found");
      }
    } catch (error) {
      throw Error("Error fetching leave request:");
    }
  };

  const deleteLeaveRequest = async (id) => {
    try {
      const deleteResponse = await deleteDoc(doc(DB, "leaveRequests", id));
      console.log("Leave request deleted successfully:", id);
      return deleteResponse;
    } catch (e) {
      return e;
    }
  };

  const updateLeaveRequest = async (id, data) => {
    try {
      const leaveRequestsRef = collection(DB, "leaveRequests");
      const leaveRequestDoc = doc(leaveRequestsRef, id);
      const updateResponse = await updateDoc(leaveRequestDoc, data);
      return updateResponse;
    } catch (error) {
      return error;
      console.error("Error updating leave request:", error);
    }
  };

  const memoizedValue = useMemo(
    () => ({
      requestLeave,
      fetchLeaveRequests,
      leaveRequests,
      deleteLeaveRequest,
      fetchLeaveRequestsById,
      updateLeaveRequest,
      fetchAllLeaveRequests,
      isLoading,
    }),
    [
      isLoading,
      requestLeave,
      fetchLeaveRequests,
      leaveRequests,
      user,
      deleteLeaveRequest,
      fetchLeaveRequestsById,
      updateLeaveRequest,
      fetchAllLeaveRequests,
    ]
  );

  return <LeaveContext.Provider value={memoizedValue}>{children}</LeaveContext.Provider>;
}
