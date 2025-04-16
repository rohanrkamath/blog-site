// ** utils
import FetchError from "@/utils/fetchError";

const clientFetchInterceptor = () => {
  if (typeof window !== "undefined") {
    const { fetch: originalFetch } = window;

    window.fetch = async (...args) => {
      let [resource, config] = args;

      try {
        const response = await originalFetch(resource, config);

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

export default clientFetchInterceptor;
