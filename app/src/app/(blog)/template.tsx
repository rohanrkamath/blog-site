// ** react
import { Fragment, ReactNode } from "react";

// **  mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// ** models
import { OrderType } from "@/models/enums";
import CategoryModel from "@/models/CategoryModel";
import PageModel from "@/models/PageModel";

// ** layouts
import Navigation from "@/layouts/navigation/blog";
import Footer from "@/layouts/Footer";

// ** components
import TopNavBar from "@/components/TopNavBar";

// ** services
import CategoryService from "@/services/CategoryService";
import PageService from "@/services/PageService";

// ** config
import { NAVBAR_PAGE_IDS } from "@/config";

export default async function Template({ children }: { children: ReactNode }) {
  const categories = (
    await CategoryService.getItems({
      sType: "parent",
      s: "null",
      order: "order",
      orderBy: OrderType.DESC,
    })
  )?.data as CategoryModel[];

  const navbarPageIds = NAVBAR_PAGE_IDS?.split(",") || [];
  const navbarPages = new Array<PageModel>();

  for await (const pageId of navbarPageIds) {
    try {
      const page = await PageService.getItemById(pageId);
      if (page?.data) navbarPages.push(page.data);
    } catch (err) {}
  }

  return (
    <Fragment>
      <Navigation categories={categories} navbarPages={navbarPages} />
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)', // Subtract header height
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <TopNavBar />
        <Container 
          component="main"
          maxWidth={false} 
          sx={{ 
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            margin: '0 auto'
          }}
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            {children}
          </Box>
        </Container>
        <Container
          maxWidth={false}
          sx={{
            mt: 'auto',
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            margin: '0 auto'
          }}
        >
          <Footer />
        </Container>
      </Box>
    </Fragment>
  );
}
