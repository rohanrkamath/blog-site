"use client";

// ** next
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ** react
import { useEffect, useState, useRef, useLayoutEffect } from "react";

// ** third party
import { useFormik } from "formik";
import * as Yup from "yup";

// ** mui
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Divider from "@mui/material/Divider";

// ** icons
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type FormProps = {
  searchText: string;
};

export default function SearchInput({ ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const s = searchParams.get("s");
  const [debouncedValue, setDebouncedValue] = useState(s || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const isFirstSearch = useRef(true);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const initialValues: FormProps = {
    searchText: s || "",
  };

  // form validate
  const validationSchema = Yup.object().shape({
    searchText: Yup.string(),
  });

  const createQueryString = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('s', value);
    } else {
      params.delete('s');
    }
    return params.toString();
  };

  // Use useLayoutEffect for immediate focus after navigation
  useLayoutEffect(() => {
    if (pathname === "/search" && isFirstSearch.current) {
      isFirstSearch.current = false;
      inputRef.current?.focus();
    }
  }, [pathname]);

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = useFormik<FormProps>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!values?.searchText) {
        router.push("/");
        return;
      }
      const query = createQueryString(values.searchText);
      router.push(pathname === "/" ? `/search?${query}` : `${pathname}?${query}`);
    },
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Debounce search input
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Only set new timer if we're on the search page or home page
    if (pathname === "/search" || pathname === "/") {
      debounceTimer.current = setTimeout(() => {
        if (debouncedValue) {
          const query = createQueryString(debouncedValue);
          if (pathname === "/") {
            router.push(`/search?${query}`);
          } else {
            router.replace(`${pathname}?${query}`);
          }
        } else {
          router.push("/");
        }
      }, 500); // 500ms delay
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [debouncedValue, pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldValue("searchText", value);
    setDebouncedValue(value);
  };

  const handleClear = () => {
    setFieldValue("searchText", "");
    setDebouncedValue("");
    inputRef.current?.focus();
  };

  return (
    <FormControl
      {...props}
      variant="outlined"
      error={errors.searchText ? touched.searchText : false}
      sx={{ 
        width: '100%',
        mb: 4, // Add margin bottom of 4 units (32px)
        mt: 2  // Add margin top of 2 units (16px)
      }}
    >
      <InputLabel htmlFor="search-input">
        Search a blog post...
      </InputLabel>
      <OutlinedInput
        id="search-input"
        {...getFieldProps("searchText")}
        inputRef={inputRef}
        type="text"
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        endAdornment={
          <InputAdornment position="end">
            {values.searchText && (
              <>
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
              </>
            )}
            <IconButton 
              onClick={() => handleSubmit()} 
              edge="end"
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        placeholder="Search a blog post..."
        label="Search a blog post..."
        autoComplete="off"
      />
    </FormControl>
  );
}
