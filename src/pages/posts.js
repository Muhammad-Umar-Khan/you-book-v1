import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postCommentsRequest, postsForUserRequest } from "../services/api";
import { NextBtn, PrevBtn } from "../common/buttons/Pagination";
import GoBack from "../common/buttons/back";

export let TOTAL_POSTS = null;

const DisplayCommentsComponent = ({ comments, post }) => {
  return (
    <div className="comments">
      <h2>Comments</h2>
      {comments.loading ? (
        <p>Loading...</p>
      ) : (
        comments.data.map(
          (comment) =>
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
  const [order, setOrder] = useState("ASC");
  const [posts, setPosts] = useState({
    data: [],
    loading: false,
  });
  const [comments, setComments] = useState({
    data: [],
    loading: false,
  });
  const [page, setPage] = useState(1);
  const { userId } = useParams();
  const validUserId = parseInt(userId);

  const toggleComments = (postId) => {
    let newPosts = posts.data.map((post) =>
      post.id === postId
        ? { ...post, showComments: !post.showComments }
        : { ...post, showComments: false }
    );
    setPosts({
      ...posts,
      data: newPosts,
    });
  };

  const loadPostComments = async (postId) => {
    setComments({
      ...comments,
      loading: true,
    });
    toggleComments(postId);
    const response = await postCommentsRequest(postId);
    const { data } = response;
    // setComments(data);
    setComments({
      data: data,
      loading: false,
    });
    // setloading(false);
  };

  const loadPostsForUser = async () => {
    try {
      setPosts({
        ...posts,
        loading: true,
      });
      let response = await postsForUserRequest(validUserId, page, order);
      TOTAL_POSTS = response.headers["x-total-count"];
      const { data } = response;
      setPosts({
        data: data,
        loading: false,
      });

      const mutatedPosts = data.map((post) => ({
        ...post,
        showComments: false,
      }));
      setPosts({
        data: mutatedPosts,
        loading: false,
      });
      // setIsPostsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadPostsForUser();
  }, [validUserId, order, page]);

  return (
    <div className="container mt-5">
      <div className="row">
        <button
          onClick={() =>
            setOrder((prevState) => (prevState === "ASC" ? "DESC" : "ASC"))
          }
        >
          Change order
        </button>
        <h2>Posts</h2>
        {posts.loading ? (
          <p>Loading Posts...</p>
        ) : (
          posts.data.map((post) => (
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
                comments.data[0]?.postId === post.id && (
                  <DisplayCommentsComponent
                    // loading={loading}
                    // comments={comments}
                    comments={comments}
                    post={post}
                  />
                )}
            </div>
          ))
        )}
        <PrevBtn page={page} setPage={setPage} />
        <NextBtn page={page} setPage={setPage} />
        <GoBack />
      </div>
    </div>
  );
};

export default UserPosts;
