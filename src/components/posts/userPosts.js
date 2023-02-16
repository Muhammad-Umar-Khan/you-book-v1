import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostComments,
  getPostsForUserAsc,
  getPostsForUserDesc,
} from "../../services/api";

const minPagesLength = 1;
const maxPagesLength = 2;

const DisplayCommentsComponent = ({ isCommentsLoading, comments, post }) => {
  return (
    <div className="comments">
      <h2>Comments</h2>
      {isCommentsLoading ? (
        <p>Loading...</p>
      ) : (
        comments.map(
          (comment) =>
            //post.id === comment.postId can be removed as well bcz we are already checkinh it on line 91;
            post.id === comment.postId && (
              <div key={comment.id}>
                <p>C#{comment.id}</p>
                <strong>{comment.name}</strong>
                <p>{comment.body}</p>
              </div>
            )
        )
      )}
    </div>
  );
};

const UserPosts = () => {
  const [order, setOrder] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { userId } = useParams();

  const toggleComments = (postId) => {
    let newPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, showComments: !post.showComments }
        : { ...post, showComments: false }
    );
    setPosts(newPosts);
  };

  const loadPostComments = async (postId) => {
    setIsCommentsLoading(true);
    toggleComments(postId);
    const response = await getPostComments(postId);
    const {data} = response;
    setComments(data);
    setIsCommentsLoading(false);
  };

  const loadPostsForUser = useCallback(async () => {
    try {
      setIsPostsLoading(true);
      let response;
      if (order) {
        response = await getPostsForUserDesc(userId, page);
        const {data} = response;
        setPosts(data);
      } else {
        response = await getPostsForUserAsc(userId, page);
        const {data} = response;
        setPosts(data);
      }
      const {data} = response;
      const mutatedPosts = data.map((post) => ({
        ...post,
        showComments: false,
      }));
      setPosts(mutatedPosts);
      setIsPostsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [order, page, userId]);

  useEffect(() => {
    loadPostsForUser();
  }, [userId, order, page, loadPostsForUser]);

  return (
    <div className="container mt-5">
      <div className="row">
        <button onClick={() => setOrder((prevState) => !prevState)}>
          Change order
        </button>
        <h2>Posts</h2>
        {isPostsLoading ? (
          <p>Loading Posts...</p>
        ) : (
          posts.map((post) => (
            <div
              className="col-md-10 offset-1 mb-3 cursor-pointer"
              key={post.id}
              onClick={() => loadPostComments(post.id)}
            >
              <p>P#{post.id}</p>
              <strong>{post.title}</strong>
              <p>{post.body}</p>

              {post.showComments &&
                // && comments[0].length > 0 can be replaced with comments[0]?.postId;
                comments[0]?.postId === post.id && (
                  <DisplayCommentsComponent
                    isCommentsLoading={isCommentsLoading}
                    comments={comments}
                    post={post}
                  />
                )}
            </div>
          ))
        )}
        <button
          className="btn btn-sm btn-secondary mb-1 col-md-2 offset-5"
          disabled={page <= minPagesLength}
          onClick={() => setPage((prevState) => prevState - 1)}
        >
          Prev
        </button>
        <button
          disabled={page >= maxPagesLength}
          onClick={() => setPage((prevState) => prevState + 1)}
          className="btn btn-sm btn-secondary col-md-2 offset-5"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPosts;
