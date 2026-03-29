import React, { useState } from 'react'
import type { UserPostType } from '../../types/userPost'
import { Link } from 'react-router';
import { Heart, MessageCircle, User2, } from 'lucide-react';
import { toast } from 'sonner';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { toggleLikePost } from '../../api/like.api';

interface Props{
  post: UserPostType
}
const UserPost = ({post}: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
   const [likes, setLikes] = useState<string[]>(post.likes);
  const [loading, setLoading] = useState(false);
   const isLikedByMe = user ? likes.includes(user._id) : false;
    const [likeCount, setLikeCount] = useState<number>(post.likeCount);


   const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please login to like the post");
      return;
    }

    try {
      setLoading(true);

      if (isLikedByMe) {
        setLikes((prev) => prev.filter((id) => id !== user._id));
        setLikeCount((prev) => prev - 1);
      } else {
        setLikes((prev) => [...prev, user._id]);
        setLikeCount((prev) => prev + 1);
      }

      await toggleLikePost(post._id);
    } catch (error) {
      toast.error("Failed to like post");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div>
        <div>
          {post.owner?.profileImage ? (
            <Link
              to={`/profile/${post.owner.username}`}
              className="flex items-center gap-2"
            >
              {user?.profileImage ? (
                <img src={post.owner.profileImage} alt={post.owner.username} />
              ) : (
                <User2 />
              )}
            </Link>
          ) : (
            <Link
              to={`/profile/${post.owner.username}`}
              className="flex items-center gap-2"
            >
              <span>{post.owner.username}</span>
            </Link>
          )}
          {post.image && (
            <div>
              <img src={post.image} alt="Post image" />
            </div>
          )}
          <p>{post.content}</p>

          <div>
                      <button onClick={handleToggleLike} disabled={loading}>
                        <Heart
                          size={20}
                          className={`transition ${isLikedByMe ? "fill-red-500" : "fill-none"}`}
                        />
                        ({likeCount})
                      </button>
                      <button
                        // onClick={handleToggleComments}
                        className="flex items-center gap-1 text-black/80 hover:text-black cursor-pointer"
                      >
                        <MessageCircle  size={20} />
                        <span className="text-sm">{post.commentCount}</span>
                      </button>
                    </div>
        </div>
      </div>
    </section>
  );
}

export default UserPost