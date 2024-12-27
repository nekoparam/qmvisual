import { redirect } from "next/navigation";

interface ErrorWithStatus {
  status?: number;
  response?: {
    status?: number;
  };
}

export function handleUnauthorized(error: ErrorWithStatus) {
  if (error?.status === 401 || error?.response?.status === 401) {
    redirect("/auth/sign-in");
  }
  throw error;
} 