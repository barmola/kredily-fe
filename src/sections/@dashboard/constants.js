export const LEAVE_TYPE = [
  {
    value: "sick",
    label: "Sick Leave",
  },
  {
    value: "casual",
    label: "Casual Leave",
  },
  {
    value: "unpaid",
    label: "Unpaid Leave",
  },
  {
    value: "earned",
    label: "Priviledge Leave",
  },
];

export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    default:
      return "info";
  }
};

export const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};
