import React, { VFC } from "react";
import PostCreateAndExploreLayout from "../../components/Layout/PostCreateAndExploreLayout";
import PostCreate from "../../components/Post/PostCreate";

export const Create: VFC = () => {
  return (
    <PostCreateAndExploreLayout>
      <PostCreate />
    </PostCreateAndExploreLayout>
  );
};

export default Create;
