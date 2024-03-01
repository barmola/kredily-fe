import React from "react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
// @mui
import { Tab, Tabs, Card, Table, Button, Tooltip, Divider, TableBody, Container, IconButton, TableContainer } from "@mui/material";
// routes

// components
import Scrollbar from "src/components/scrollbar";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from "src/components/table";

// sections
import { LeavesRequestedTableSearch } from "src/sections/@dashboard/emp";
import { useLeaves } from "src/hooks/useLeaves";
import { HRLeavesRequestedTableRow } from "src/sections/@dashboard/hr";
import { LEAVE_STATUS } from "src/sections/@dashboard/constants";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all", "approved", "rejected", "pending"];

const TABLE_HEAD = [
  { id: "displayName", label: "Name", align: "left" },
  { id: "leave_type", label: "Type", align: "left" },
  { id: "start_date", label: "Start Date", align: "left" },
  { id: "end_date", label: "End Date", align: "left" },
  { id: "total_no_of_days", label: "No of Days", align: "left" },
  { id: "reason", label: "Reason", align: "left" },
  { id: "status", label: "status", align: "left" },
  { id: "action", label: "action" },
];

// ----------------------------------------------------------------------

export default function HRLeaveList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAllLeaveRequests, leaveRequests, updateLeaveRequest, isLoading } = useLeaves();

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(leaveRequests);

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== "" || filterStatus !== "all";

  const isNotFound = (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterStatus);

  useEffect(() => {
    setTableData(leaveRequests);
  }, [leaveRequests]);

  useEffect(() => {
    fetchAllLeaveRequests();
  }, []);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("all");
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updateResponse = await updateLeaveRequest(id, { status });
      const fetchResponse = await fetchAllLeaveRequests();
      enqueueSnackbar("Leave request updated successfully", { variant: "success" });

      return Promise.all([updateResponse, fetchResponse]);
    } catch (e) {
      return e;
    }
  };

  console.log("Is:", !isLoading && isEmpty(dataFiltered));

  return (
    <>
      <Helmet>
        <title> Leaves History | Kredily HRMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs heading='HR | Leaves History' />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: "background.neutral",
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <LeavesRequestedTableSearch
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {!isLoading && isEmpty(dataFiltered) ? (
                    <>
                      <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)} />
                      <TableNoData isNotFound={isNotFound} />
                    </>
                  ) : isLoading ? (
                    [...Array(rowsPerPage)].map((item, index) => <TableSkeleton key={index} sx={{ height: denseHeight }} />)
                  ) : (
                    dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row) => (
                        <HRLeavesRequestedTableRow
                          key={row.id}
                          row={row}
                          onApprove={() => handleUpdateStatus(row.id, LEAVE_STATUS.APPROVED)}
                          onReject={() => handleUpdateStatus(row.id, LEAVE_STATUS.REJECTED)}
                        />
                      ))
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter((leave) => leave.leave_type.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }
  if (filterStatus !== "all") {
    inputData = inputData.filter((leave) => leave.status === filterStatus);
  }
  return inputData;
}
