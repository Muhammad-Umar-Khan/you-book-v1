import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../services/api";

const PostComments = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const validPostId = parseInt(postId);
  const loadPostComments = async () => {
    try {
      const response = await getPostComments(validPostId);
      const { data } = response;
      setComments(data);
    } catch (error) {
      throw new Error("Could't get post's comments");
    }
  };

  useEffect(() => {
    loadPostComments();
  }, [validPostId]);
  return (
    <Fragment>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.body}</p>
      ))}
    </Fragment>
  );
};

export default PostComments;
