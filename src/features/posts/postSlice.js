import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drafts: [],
  published: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    saveDraft: (state, action) => {
      state.drafts.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    publishPost: (state, action) => {
      state.published.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    publishDraft: (state, action) => {
      const draft = state.drafts.find(
        (item) => item.id === action.payload
      );

      if (draft) {
        state.published.push(draft);
        state.drafts = state.drafts.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    deleteDraft: (state, action) => {
      state.drafts = state.drafts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  saveDraft,
  publishPost,
  publishDraft,
  deleteDraft,
} = postSlice.actions;

export default postSlice.reducer;