import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFDatePicker({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker fullWidth {...field} renderInput={(params) => <TextField {...params} />} {...other} />
      )}
    />
  );
}
