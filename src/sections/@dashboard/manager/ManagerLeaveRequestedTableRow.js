import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { TableRow, MenuItem, TableCell, IconButton, Tooltip } from "@mui/material";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import MenuPopover from "src/components/menu-popover";
import moment from "moment";
import { LEAVE_STATUS, getStatusColor } from "../constants";
import TextMaxLine from "src/components/text-max-line";

// ----------------------------------------------------------------------

ManagerLeaveRequestedTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function ManagerLeaveRequestedTableRow({ row, onApprove, onReject }) {
  const { end_date, start_date, leave_type, reason, status, displayName } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);
  const [isApproving, setApproving] = useState(false);
  const [isRejecting, setRejecting] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align='left' sx={{ textTransform: "capitalize" }}>
          {displayName}
        </TableCell>
        <TableCell align='left' sx={{ textTransform: "capitalize" }}>
          {leave_type}
        </TableCell>

        <TableCell align='left'>{moment(start_date).format("Do MMM YY")}</TableCell>
        <TableCell align='left'>{moment(end_date).format("Do MMM YY")}</TableCell>
        <TableCell align='left'>{moment(end_date).diff(start_date, "days")}</TableCell>

        <TableCell align='left' sx={{ maxWidth: 180 }}>
          <Tooltip title={reason}>
            <TextMaxLine line={1} variant='subtitle2' noWrap>
              {reason}
            </TextMaxLine>
          </Tooltip>
        </TableCell>

        <TableCell>
          <Label variant='soft' color={getStatusColor(status)} sx={{ textTransform: "capitalize" }}>
            {status}
          </Label>
        </TableCell>

        <TableCell align='right'>
          {status === LEAVE_STATUS.PENDING && (
            <IconButton color={openPopover ? "inherit" : "default"} onClick={handleOpenPopover}>
              <Iconify icon='eva:more-vertical-fill' />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow='right-top' sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={async () => {
            setApproving(true);
            await onApprove();
            setApproving(false);
            handleClosePopover();
          }}
          sx={{ color: "success.main" }}
        >
          <Iconify icon={isApproving ? "svg-spinners:90-ring-with-bg" : "solar:close-circle-bold-duotone"} />
          Approve
        </MenuItem>
        <MenuItem
          onClick={async () => {
            setRejecting(true);
            await onReject();
            setRejecting(false);
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={isRejecting ? "svg-spinners:90-ring-with-bg" : "solar:close-circle-bold-duotone"} />
          Reject
        </MenuItem>
      </MenuPopover>
    </>
  );
}
