import { createSelector } from "reselect";

const selectPosts = (state) => state.posts;

export const selectDrafts = createSelector(
  [selectPosts],
  (posts) => posts.drafts
);

export const selectPublishedPosts = createSelector(
  [selectPosts],
  (posts) => posts.published
);

export const totalDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);

export const totalPublished = createSelector(
  [selectPublishedPosts],
  (published) => published.length
);