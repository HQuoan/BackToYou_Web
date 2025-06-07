import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getUsersBalance } from "../../services/apiUsers";

export function useUsersBalance() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // ===== PAGINATION =====
  let pageNumber = Number(searchParams.get("page")) || 1;
  const pageSize = PAGE_SIZE;

  const page = { pageNumber, pageSize };

  // ===== FILTER =====

  const email = searchParams.get("email");

  const filter = {
    orderBy: searchParams.get("sortBy") || undefined,
    email: !email ? null : email,
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["users-balance", page, filter],
    queryFn: () => getUsersBalance({ page, filter }),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const users = data?.result ?? [];
  const pagination = data?.pagination ?? null;

  // ===== PREFETCH NEXT & PREV PAGES =====
  const totalPages = pagination?.totalPages ?? 0;

  if (pageNumber < totalPages) {
    const nextPage = { pageNumber: pageNumber + 1, pageSize };
    queryClient.prefetchQuery({
      queryKey: ["users-balance", nextPage, filter],
      queryFn: () => getUsersBalance({ page: nextPage, filter }),
    });
  }

  if (pageNumber > 1) {
    const prevPage = { pageNumber: pageNumber - 1, pageSize };
    queryClient.prefetchQuery({
      queryKey: ["users-balance", prevPage, filter],
      queryFn: () => getUsersBalance({ page: prevPage, filter }),
    });
  }

  return { isLoading, error, users, pagination };
}
