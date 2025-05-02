"use client";

import { default as NextLink } from "next/link";

// ** mui
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

type ServerPaginationProps = {
  routerUrl: string;
  totalPages: number;
  currentPage: number;
};

const ServerPagination = ({
  routerUrl,
  totalPages = 1,
  currentPage = 1,
}: ServerPaginationProps) => {
  const getPaginationUrl = (page: number | null) => `/${routerUrl}/${page}`;

  if (!totalPages || !currentPage) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Pagination
        renderItem={(item) => (
          <PaginationItem
            component={NextLink}
            href={getPaginationUrl(item.page)}
            {...item}
          />
        )}
        count={totalPages}
        page={currentPage}
      />
    </Box>
  );
};

export default ServerPagination; 