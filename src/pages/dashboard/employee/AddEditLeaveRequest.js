import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
// sections
import { useEffect, useState } from "react";
import { AddEditLeaveForm } from "src/sections/@dashboard/emp";
import { useLeaves } from "src/hooks/useLeaves";

// ----------------------------------------------------------------------

export default function AddEditLeaveRequest() {
  const { leaveId } = useParams();
  const { fetchLeaveRequestsById } = useLeaves();
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    if (leaveId) {
      fetchSelectedLeaveById(leaveId);
    }
  }, [leaveId]);

  const fetchSelectedLeaveById = async (id) => {
    try {
      const leave = await fetchLeaveRequestsById(id);
      setSelectedLeave(leave);
    } catch (e) {}
  };

  return (
    <>
      <Helmet>
        <title> Request Leave: Edit | Kredily HRMS</title>
      </Helmet>

      <Container maxWidth={"lg"}>
        <CustomBreadcrumbs heading={`Request Leave`} />
        <AddEditLeaveForm currentLeave={selectedLeave} isEdit={!!selectedLeave} />
      </Container>
    </>
  );
}
