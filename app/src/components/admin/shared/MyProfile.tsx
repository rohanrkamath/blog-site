"use client";

// ** react
import { useEffect, useState } from "react";

// ** mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// ** third party
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

// ** models
import { UserProfileFormModel } from "@/models/UserModel";

// ** services
import UserService from "@/services/UserService";

// ** hooks
import useUserQuery from "@/hooks/queries/useUserQuery";
import useComponentContext from "@/hooks/useComponentContext";
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** utils
import FetchError from "@/utils/fetchError";

// ** config
import { COOKIE_NAMES, QUERY_NAMES } from "@/config";

export default function MyProfile() {
  const token = Cookies.get(COOKIE_NAMES.TOKEN) as string;

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { useUserProfileQuery } = useUserQuery();
  const userProfile = useUserProfileQuery(token);
  const fetchErrorSnackbar = useFetchErrorSnackbar();

  const { setFormDrawerData, formDrawer, handleFormDrawerClose } =
    useComponentContext();

  const [initialValues, setInitialValues] = useState<UserProfileFormModel>({
    userName: "",
    email: "",
    name: "",
    surname: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    if (userProfile.isSuccess) {
      const newInitialValues = { ...initialValues, ...userProfile?.data?.data };
      setInitialValues(newInitialValues);
      setValues(newInitialValues);
    }
  }, [userProfile.isSuccess]);

  const getPasswordValidation = Yup.string()
    .min(6, "Minimum 6 character password must be created.")
    .optional();

  // form validate
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Required field"),
    email: Yup.string().email("Enter a valid email").required("Required field"),
    name: Yup.string().required("Required field"),
    surname: Yup.string().required("Required field"),
    password: getPasswordValidation,
    rePassword: getPasswordValidation.oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    ),
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValues,
    isValid,
  } = useFormik<UserProfileFormModel>({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let newValues = { ...values };
        delete newValues.rePassword;

        if (!newValues.password || newValues.password === "") {
          delete newValues.password;
        }
        await UserService.updateProfile(newValues);
        enqueueSnackbar("Profile updated.", {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_NAMES.USER, token],
        });
      } catch (err) {
        fetchErrorSnackbar(err as FetchError);
      }
      handleFormDrawerClose();
      setSubmitting(false);
      resetForm();
    },
  });

  useEffect(() => {
    if (formDrawer.submit) handleSubmit();
  }, [formDrawer.submit]);

  useEffect(() => {
    setFormDrawerData({
      ...formDrawer,
      submitDisabled: !isValid,
    });
  }, [isValid]);

  useEffect(() => {
    setFormDrawerData({
      ...formDrawer,
      submitLoading: isSubmitting,
    });
  }, [isSubmitting]);

  return (
    <form method="post" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          required
          label="User Name"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("userName")}
          helperText={
            errors.userName && touched.userName ? errors.userName : null
          }
          error={errors.userName ? touched.userName : false}
        />

        <TextField
          fullWidth
          required
          label="Name"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("name")}
          helperText={errors.name && touched.name ? errors.name : null}
          error={errors.name ? touched.name : false}
        />

        <TextField
          fullWidth
          required
          label="Surname"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("surname")}
          helperText={errors.surname && touched.surname ? errors.surname : null}
          error={errors.surname ? touched.surname : false}
        />

        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("email")}
          helperText={errors.email && touched.email ? errors.email : null}
          error={errors.email ? touched.email : false}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("password")}
          helperText={
            errors.password && touched.password ? errors.password : null
          }
          error={errors.password ? touched.password : false}
        />

        <TextField
          fullWidth
          label="Password Repeat"
          type="password"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("rePassword")}
          helperText={
            errors.rePassword && touched.rePassword ? errors.rePassword : null
          }
          error={errors.rePassword ? touched.rePassword : false}
        />
      </Stack>
    </form>
  );
}
