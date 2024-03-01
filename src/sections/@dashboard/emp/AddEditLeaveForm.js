import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, MenuItem, Button } from "@mui/material";

// routes
import { PATH_DASHBOARD } from "src/routes/paths";
import FormProvider, { RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from "src/components/hook-form";
//components
import { useSnackbar } from "src/components/snackbar";
import moment from "moment";
//constants
import { LEAVE_TYPE } from "../constants";
import { useLeaves } from "src/hooks/useLeaves";

// ----------------------------------------------------------------------

AddEditLeaveForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLeave: PropTypes.object,
};

export default function AddEditLeaveForm({ isEdit = false, currentLeave }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { requestLeave, updateLeaveRequest } = useLeaves();

  const NewLeaveSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
    leave_type: Yup.string().required("Leave type is required"),
    start_date: Yup.string().required("Leave start date is required"),
    end_date: Yup.string().required("Leave end date is required"),
  });

  const defaultValues = useMemo(
    () => ({
      start_date: currentLeave?.start_date ? moment(currentLeave?.start_date) : null,
      end_date: currentLeave?.end_date ? moment(currentLeave?.end_date) : null,
      reason: currentLeave?.reason || "",
      leave_type: currentLeave?.leave_type || "",
      status: currentLeave?.status || "pending",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLeave]
  );

  const methods = useForm({
    resolver: yupResolver(NewLeaveSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const noOfDays = values?.start_date && values.end_date ? moment(values.end_date).diff(values.start_date, "days") : 0;

  useEffect(() => {
    if (isEdit && currentLeave) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentLeave]);

  const onSubmit = async (data) => {
    try {
      console.log("Data:", data);
      const response = await (isEdit ? updateLeaveRequest(currentLeave?.id, data) : requestLeave(data));
      console.log("Data Response:", response);
      // dispatch(onRequestLeave(data));
      // await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      navigate(PATH_DASHBOARD.emp.root);
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2.5}>
                <RHFDatePicker name='start_date' label='Start Date' minDate={moment()} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    textAlign: "center",
                    p: 1,
                  }}
                >
                  <Typography>{`${noOfDays} Days`}</Typography>
                </Box>
                <RHFDatePicker name='end_date' label='End Date' minDate={moment(values?.start_date)} />
              </Stack>
              <RHFSelect name='leave_type' label='Leave Type'>
                {LEAVE_TYPE.map((leave) => (
                  <MenuItem key={leave.value} value={leave.value}>
                    {leave.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name='reason' label='Reason' multiline rows={4} />
              <Stack direction='row' spacing={2}>
                <Button variant='outlined' size='large' fullWidth onClick={() => navigate(PATH_DASHBOARD.emp.root)}>
                  {" "}
                  Cancel
                </Button>
                <LoadingButton type='submit' loading={isSubmitting} variant='contained' size='large' fullWidth>
                  Request
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </FormProvider>
  );
}
