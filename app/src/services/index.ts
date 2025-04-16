// ** config
import { API_URL, COOKIE_NAMES } from "@/config";

// ** third party
import Cookies from "js-cookie";

// ** models
import { BaseErrorModel, BaseModel } from "@/models/BaseModel";

// ** utils
import fetchClientInterceptor from "@/utils/fetchClientInterceptor";
import FetchError from "@/utils/fetchError";

fetchClientInterceptor();

interface ServiceRequestInit extends RequestInit {
  body?: any;
  readonly isLocalApi?: boolean;
  readonly isFormData?: boolean;
}

const localeApiUrl = `/api`;

const service = async <T>(
  url: string,
  init?: ServiceRequestInit | undefined
): Promise<BaseModel<T> | BaseErrorModel | null> => {
  if (!url) {
    throw new Error('URL is required');
  }

  let headers: Record<string, any> = {
    ...init?.headers,
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  };
  const token = Cookies.get(COOKIE_NAMES.TOKEN);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (init?.isFormData) delete headers["Content-Type"];

  if (init?.method !== "GET" && init?.body) {
    init = {
      ...init,
      body: init?.isFormData ? init?.body : JSON.stringify(init?.body),
    };
  }

  try {
    const baseUrl = init?.isLocalApi ? localeApiUrl : API_URL;
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const fullUrl = `${baseUrl}/${cleanUrl}`.replace(/([^:]\/)\/+/g, '$1');

    const res = await fetch(fullUrl, {
      ...init,
      headers,
      cache: init?.cache ?? "no-store",
    });

    if (init?.method === "DELETE") return null;

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
      throw new FetchError(res, errorData?.message || 'Request failed');
    }

    return await res.json();
  } catch (error) {
    if (error instanceof FetchError) throw error;
    throw new FetchError(
      new Response(null, { status: 500 }), 
      error instanceof Error ? error.message : 'Request failed'
    );
  }
};

export default service;
