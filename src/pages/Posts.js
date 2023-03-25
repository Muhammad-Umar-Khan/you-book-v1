import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postComments, postsForUser } from "../services/api";
import { ASC, DESC } from "../../src/utils/constants/generalConstants";
import BackBtn from "../common/buttons/BackBtn";
import Pagination from "../common/buttons/Pagination";

export let TOTAL_POSTS = null;

const DisplayCommentsComponent = ({ comments, post }) => {
  return (
    <div className="comments">
      <h2>Comments</h2>
      {comments.loading ? (
        <p>Loading...</p>
      ) : (
        comments?.data?.map(
          (comment) =>
            post.id === comment?.postId && (
              <div key={comment?.id}>
                <p>C#{comment?.id}</p>
                <strong>{comment?.name}</strong>
                <p>{comment?.body}</p>
              </div>
            )
        )
      )}
    </div>
  );
};

const UserPosts = () => {
  const [order, setOrder] = useState(ASC);
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
    let newPosts = posts?.data?.map((post) =>
      post.id === postId
        ? { ...post, showComments: !post?.showComments }
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
    const { data } = await postComments(postId);
    setComments({
      data: data,
      loading: false,
    });
  };

  const loadPostsForUser = useCallback(async () => {
    try {
      setPosts({
        ...posts,
        loading: true,
      });
      let response = await postsForUser(validUserId, page, order);
      TOTAL_POSTS = response.headers["x-total-count"];
      const { data } = response;
      setPosts({
        data: data,
        loading: false,
      });

      const mutatedPosts = data?.map((post) => ({
        ...post,
        showComments: false,
      }));
      setPosts({
        data: mutatedPosts,
        loading: false,
      });
    } catch (error) {
      console.log(error?.message);
    }
  }, [order, page, posts, validUserId]);
  const POSTS_PER_PAGE = 5;

  const TOTAL_PAGES = TOTAL_POSTS / POSTS_PER_PAGE;

  const paginationData = [
    {
      id: 1,
      title: "Prev",
      disabled: page <= 1,
      setPage: () => setPage((prevState) => prevState - 1),
    },
    {
      id: 2,
      title: "Next",
      disabled: page >= TOTAL_PAGES,
      setPage: () => setPage((prevState) => prevState + 1),
    },
  ];

  useEffect(() => {
    loadPostsForUser();
  }, [validUserId, order, page, loadPostsForUser]);

  return (
    <div className="container mt-5">
      <div className="row">
        <button
          onClick={() =>
            setOrder((prevState) => (prevState === ASC ? DESC : ASC))
          }
        >
          Change order
        </button>
        <h2>Posts</h2>
        {posts.loading ? (
          <p>Loading Posts...</p>
        ) : (
          posts?.data?.map((post) => (
            <div
              className="col-md-10 offset-1 mb-3 cursor-pointer"
              key={post.id}
              onClick={() => loadPostComments(post?.id)}
            >
              <p>P#{post?.id}</p>
              <strong>{post?.title}</strong>
              <p>{post?.body}</p>

              {post?.showComments && comments?.data[0]?.postId === post?.id && (
                <DisplayCommentsComponent comments={comments} post={post} />
              )}
            </div>
          ))
        )}

        <div className="row">
          <div className="col-md-8 offset-2">
            {paginationData?.map(
              (
                { id, title, disabled, setPage } // destructuring values on the runtime.
              ) => (
                <Pagination
                  key={id}
                  title={title}
                  disabled={disabled}
                  setPage={setPage}
                />
              )
            )}
          </div>
        </div>

        <BackBtn title={"Back"} />
      </div>
    </div>
  );
};

export default UserPosts;
