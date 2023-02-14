import "./userPosts.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Paginate from "../Paginate/Paginate";

const UserPosts = () => {
  const [order, setOrder] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [arePostsLoading, setArePoastLoading] = useState(false);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState("1");
  // const [postsPerPage, setPostsPerPage] = useState("5");
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
    setAreCommentsLoading(true);
    toggleComments(postId);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const ExData = response.data;
    setComments(ExData);
    setAreCommentsLoading(false);
  };

  useEffect(() => {
    const loadPostsForUser = async () => {
      setArePoastLoading(true);
      let response;
      if (order) {
        response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=DESC&userId=${userId}&_limit=5&_page=${page}`
        );
        const mewData = await response.data;
        setPosts(mewData);
      } else {
        response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=ASC&userId=${userId}&_limit=5&_page=${page}`
        );
        const mewData = await response.data;
        setPosts(mewData);
      }
      const extractedPosts = response.data;
      const mutatedPosts = extractedPosts.map((post) => ({
        ...post,
        showComments: false,
      }));
      setPosts(mutatedPosts);
      setArePoastLoading(false);
    };
    try {
      loadPostsForUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [userId, order, page]);
  return (
    <div className="container mt-5">
      <div className="row">
        <button onClick={() => setOrder((prevState) => !prevState)}>
          Change order
        </button>
        <h2>Posts</h2>
        {arePostsLoading ? (
          <p>Loading Posts...</p>
        ) : (
          posts.map((post) => (
            <div
              style={{ cursor: "pointer" }}
              className="col-md-10 offset-1 mb-3"
              key={post.id}
              onClick={() => loadPostComments(post.id)}
            >
              <p>P#{post.id}</p>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              {post.showComments && // && comments[0].length > 0 can be replaced with comments[0]?.postId;
                comments[0]?.postId === post.id && (
                  <div className="comments">
                    <h2>Comments</h2>
                    {areCommentsLoading ? (
                      <p>Loading...</p>
                    ) : (
                      comments.map(
                        (comment) =>
                          post.id === comment.postId && ( //post.id === comment.postId can be removed as well bcz we are already checkinh it on line 91;
                            <div key={comment.id}>
                              <p>C#{comment.id}</p>
                              <strong>{comment.name}</strong>
                              <p>{comment.body}</p>
                            </div>
                          )
                      )
                    )}
                  </div>
                )}
            </div>
          ))
        )}
        <button
          className="btn btn-sm btn-secondary mb-1 col-md-2 offset-5"
          disabled={page === 1}
          onClick={() => setPage((prevState) => prevState - 1)}
        >
          Prev
        </button>
        <button
          disabled={page >= 2}
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
