

interface FeedSectionProps {
  post: {
    _id: string;
    content: string;
    image: string;
    owner: {
      username: string;
      profileImage: string;
    }
  }
}

const FeedSection = ({post}: FeedSectionProps) => {
 
  return (
    <div>
      <section>
        {post.owner.username}
      </section>
    </div>
  )
}

export default FeedSection