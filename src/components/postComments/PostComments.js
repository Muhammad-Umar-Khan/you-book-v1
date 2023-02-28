import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../services/api";
import { idValidator } from "../../utils/helpers/idValidator";

const PostComments = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  idValidator(postId);
  const loadPostComments = async () => {
    try {
      const {data} = await getPostComments(postId);
      setComments(data);
    } catch (error) {
      throw new Error("Could't get post's comments");
    }
  };

  useEffect(() => {
    loadPostComments();
  }, [postId]);
  return (
    <Fragment>
      {comments?.map((comment) => (
        <p key={comment?.id}>{comment.body}</p>
      ))}
    </Fragment>
  );
};

export default PostComments;
