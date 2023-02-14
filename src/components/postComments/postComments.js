import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../services/api";

const PostComments = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const loadPostComments = async () => {
    const response = await getPostComments(postId);
    const extractedData = response.data;
    setComments(extractedData);
  };

  useEffect(() => {
    try {
      loadPostComments();
    } catch (error) {
      throw new Error("Could't load comments");
    }
  }, [postId]);
  return (
    <Fragment>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.body}</p>
      ))}
    </Fragment>
  );
};

export default PostComments;
