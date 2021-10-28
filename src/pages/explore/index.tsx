import { VFC } from "react";
import PostCreateAndExploreLayout from "../../components/Layout/PostCreateAndExploreLayout";
import PostExplore from "../../components/Post/PostExplore";

const Explore: VFC = () => {
  return (
    <PostCreateAndExploreLayout>
      <PostExplore />
    </PostCreateAndExploreLayout>
  );
};

export default Explore;
