// ** next
import { notFound } from "next/navigation";

// ** utils
import FetchError from "@/utils/fetchError";

const serverFetchInterceptor = () => {
  if (typeof global !== "undefined") {
    const { fetch: originalFetch } = global;

    global.fetch = async (...args) => {
      let [resource, config] = args;

      try {
        const response = await originalFetch(resource, config);

        if (response.status === 404) return notFound();

        if (!response.ok) {
          const errorResData = await response.json();
          throw new FetchError(response, errorResData?.message);
        }

        return response;
      } catch (error) {
        if (error instanceof FetchError) throw error;
        throw new FetchError(
          new Response(null, { status: 500 }), 
          'Failed to fetch'
        );
      }
    };
  }
};

export default serverFetchInterceptor;
