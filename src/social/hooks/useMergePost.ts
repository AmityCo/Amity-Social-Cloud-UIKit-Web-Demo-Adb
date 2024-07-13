import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MergePostSlice from "../../redux/slices/MergePostSlice";

export const useMergePost = () => {

    const { postList } = useSelector((state: RootState) => state.mergePost);
    const { updateMergePostList, deleteBypostId } = MergePostSlice.actions
    const dispatch = useDispatch();

    const updateMergePosts = (item: Amity.Post[]) => {
        dispatch(updateMergePostList(item))
    }
    const deleteMergePostById = (item: { postId: string }) => {
        dispatch(deleteBypostId(item))
    }

    return {
        postList,
        updateMergePosts,
        deleteMergePostById,

    }

}