import { Timestamp } from 'firebase/firestore';

export type FollowsAndFollowersData = {
  following: boolean;
  email: string;
  createTime: Timestamp;
};
