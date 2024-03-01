import PropTypes from "prop-types";
// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from "@mui/material";
// components
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

LeavesRequestedTableSearch.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function LeavesRequestedTableSearch({ isFiltered, filterName, filterRole, onFilterName, onResetFilter }) {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      direction={{
        xs: "column",
        sm: "row",
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder='Search Leave type...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify icon='eva:search-fill' sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button color='error' sx={{ flexShrink: 0 }} onClick={onResetFilter} startIcon={<Iconify icon='eva:trash-2-outline' />}>
          Clear
        </Button>
      )}
    </Stack>
  );
}
