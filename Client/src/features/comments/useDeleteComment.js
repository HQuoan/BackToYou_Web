import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentAPI } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      toast.success("Xóa bình luận thành công");
      queryClient.invalidateQueries("comment");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteComment };
}
