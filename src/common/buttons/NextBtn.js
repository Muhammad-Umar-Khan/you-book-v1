const NextBtn = ({ page, setPage, posts }) => {
  const POSTS_PER_PAGE = 5;
  const TOTAL_POSTS = posts.length;
  const MAX_PAGE_LENGTH = 10 / POSTS_PER_PAGE;

  return (
    <button
      disabled={page >= MAX_PAGE_LENGTH}
      onClick={() => setPage((prevState) => prevState + 1)}
      className="btn btn-sm btn-secondary col-md-2 offset-5"
    >
      Next
    </button>
  );
};

export default NextBtn;
