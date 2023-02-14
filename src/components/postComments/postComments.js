import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostComments = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  useEffect(() => {
    const loadPostComments = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const ExData = response.data;
      setComments(ExData);
    };
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
