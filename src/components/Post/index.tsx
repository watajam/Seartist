import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { memo, useEffect, useState, VFC } from "react";
import { db } from "../../../lib/firebase";
import { FormData } from "../../../types/FormData";
import { useRecoilSetEmail } from "../../hooks/useRecoilSetEmail";
import SkeletonLoading from "../SkeletonLoading";
import ListItem from "./ListItem";

const Post: VFC = () => {
  const [posts, setPosts] = useState<
    Pick<
      FormData,
      | "id"
      | "image"
      | "writing"
      | "eventName"
      | "genre"
      | "eventLocation"
      | "eventDate"
      | "openTime"
      | "closeTime"
    >[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useRecoilSetEmail();

  useEffect(() => {
    if (userEmail !== null) {
      const postsRef = query(
        collection(db, "users", userEmail.email, "posts"),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            writing: doc.data().writing,
            eventName: doc.data().eventName,
            genre: doc.data().genre,
            eventLocation: doc.data().eventLocation,
            eventDate: doc.data().eventDate,
            openTime: doc.data().openTime,
            closeTime: doc.data().closeTime,
          }))
        );
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userEmail]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (posts === []) {
    return <p>エラー</p>;
  }

  if (posts && posts.length === 0) {
    return <p>まだ投稿がありません</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {posts.map((post) => {
        return <ListItem key={post.id} post={post} />;
      })}
    </div>
  );
};

export default memo(Post);
