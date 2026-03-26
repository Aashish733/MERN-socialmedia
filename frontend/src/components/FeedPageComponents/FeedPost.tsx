import { useSelector } from "react-redux";
import type { FeedPostType } from "../../types/feed";
import type { RootState } from "../../store/store";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { CommentType } from "../../types/comment";
import { Heart, MessageCircle, User2 } from "lucide-react";
import { toggleLikePost } from "../../api/like.api";

interface FeedPostProps {
  post: FeedPostType;
}

const FeedPost = ({ post }: FeedPostProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [likes, setLikes] = useState<string[]>(post.likes);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const [loading, setLoading] = useState(false);
  // const [showComments, setShowComments] = useState<boolean>(false);
  // const [comments, setComments] = useState<CommentType[]>([]);
  // const [commentText, setCommentText] = useState("");
  // const [loadingComments, setLoadingComments] = useState(false);
  // const [commentsCount, setCommentsCount] = useState<number>(
  //   post.commentsCount,
  // );
  // const [expanded, setExpanded] = useState<boolean>(false);
  // const contentRef = useRef<HTMLDivElement | null>(null);
  // const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  const isLikedByMe = user ? likes.includes(user._id) : false;

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
        toast.success("You liked this post");
      }

      await toggleLikePost(post._id);
    } catch (error: any) {
      toast.error(error.message || "Failed to toggle like");

      // rollback
      if (isLikedByMe) {
        setLikes((prev) => [...prev, user._id]);
        setLikeCount((prev) => prev + 1);
      } else {
        setLikes((prev) => prev.filter((id) => id !== user._id));
        setLikeCount((prev) => prev - 1);
      }
    } finally {
      setLoading(false);
    }
  }


 
  return (
    <div>
      <section>
        <div>
          <div>
            {user?.profileImage ? (
              <img src={post.owner.profileImage} alt={post.owner.username} />
            ) : (
              <User2 />
            )}

            <span>{post.owner.username}</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>

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
              <MessageCircle size={20} />
              <span className="text-sm">{post.commentsCount}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedPost;
