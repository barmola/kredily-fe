import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { TableRow, MenuItem, TableCell, IconButton, Typography, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import MenuPopover from "src/components/menu-popover";
import moment from "moment";
import { LEAVE_STATUS, getStatusColor } from "../constants";
import ConfirmDialog from "src/components/confirm-dialog";

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { end_date, start_date, leave_type, reason, status } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [isDeleting, setDeleting] = useState(false);

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
          {leave_type}
        </TableCell>

        <TableCell align='left'>{moment(start_date).format("Do MMM YY")}</TableCell>
        <TableCell align='left'>{moment(end_date).format("Do MMM YY")}</TableCell>
        <TableCell align='left'>{moment(end_date).diff(start_date, "days")}</TableCell>

        <TableCell align='left' sx={{ maxWidth: 180 }}>
          <Tooltip title={reason}>
            <Typography variant='subtitle2' noWrap>
              {reason}
            </Typography>
          </Tooltip>
        </TableCell>

        <TableCell>
          <Label variant='soft' color={getStatusColor(status)} sx={{ textTransform: "capitalize" }}>
            {status}
          </Label>
        </TableCell>

        <TableCell align='right'>
          <IconButton color={openPopover ? "inherit" : "default"} onClick={handleOpenPopover}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow='right-top' sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon='eva:edit-fill' />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
          disabled={status !== LEAVE_STATUS.PENDING}
        >
          <Iconify icon='eva:trash-fill' />
          Cancel Leave
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title='Cancel Leave'
        content={<>Are you sure want to cancel the requested leave?</>}
        action={
          <LoadingButton
            variant='contained'
            loading={isDeleting}
            color='error'
            onClick={async () => {
              setDeleting(true);
              await onDeleteRow();
              setDeleting(false);
              handleCloseConfirm();
            }}
          >
            Cancel Leave
          </LoadingButton>
        }
      />
    </>
  );
}
