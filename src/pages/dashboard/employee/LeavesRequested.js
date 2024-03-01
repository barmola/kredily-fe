import React from "react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
// @mui
import { Tab, Tabs, Card, Table, Button, Tooltip, Divider, TableBody, Container, IconButton, TableContainer } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "src/routes/paths";

// components
import Iconify from "src/components/iconify";
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
import { LeavesRequestedTableRow, LeavesRequestedTableSearch } from "src/sections/@dashboard/emp";
import { useLeaves } from "src/hooks/useLeaves";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ["all", "approved", "rejected", "pending"];

const TABLE_HEAD = [
  { id: "leave_type", label: "Type", align: "left" },
  { id: "start_date", label: "Start Date", align: "left" },
  { id: "end_date", label: "End Date", align: "left" },
  { id: "total_no_of_days", label: "No of Days", align: "left" },
  { id: "reason", label: "Reason", align: "left" },
  { id: "status", label: "status", align: "left" },
  { id: "action", label: "action" },
];

// ----------------------------------------------------------------------

export default function CallFlow() {
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
  const { fetchLeaveRequests, leaveRequests, deleteLeaveRequest, isLoading } = useLeaves();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

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
    fetchLeaveRequests();
  }, []);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    try {
      const deleteResponse = await deleteLeaveRequest(id);
      const fetchResponse = await fetchLeaveRequests();
      enqueueSnackbar("Leave request deleted successfully", { variant: "success" });
      return Promise.all([deleteResponse, fetchResponse]);
    } catch (e) {}
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.emp.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus("all");
  };

  return (
    <>
      <Helmet>
        <title> Leaves History | Kredily HRMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading='Employee | Leaves History'
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.emp.add}
              variant='contained'
              startIcon={<Iconify icon='solar:circle-bottom-down-bold-duotone' />}
            >
              Apply Leave
            </Button>
          }
        />

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
                        <LeavesRequestedTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
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
