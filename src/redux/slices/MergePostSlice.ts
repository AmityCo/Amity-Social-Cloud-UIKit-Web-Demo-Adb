import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface MergePostState {
  postList: Amity.Post[];
}
const initialState: MergePostState = {
  postList: [],
};

const mergePostSlice = createSlice({
  name: 'mergePost',
  initialState,
  reducers: {
    updateMergePostList: (state, action: PayloadAction<Amity.Post>) => {

      state.postList = [
        ...state.postList,
        action.payload,
      ];
    },

    deleteBypostId: (state, action: PayloadAction<{ postId: string }>) => {
      const { postId } = action.payload;
      const prevPostList: Amity.Post[] = [...state.postList];
      const updatedPostList: Amity.Post[] = prevPostList.filter(
        (item) => item.chatId !== postId
      );

      state.postList = updatedPostList;
    },
    clearPostList: (state) => {
      state.postList = [];
    },
  },
});

export default mergePostSlice;
