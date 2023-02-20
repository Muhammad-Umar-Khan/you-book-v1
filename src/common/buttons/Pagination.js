import { TOTAL_POSTS } from "../../pages/Posts";
export const NextBtn = ({ page, setPage }) => {
  const POSTS_PER_PAGE = 5;
  const MAX_PAGE_LENGTH = TOTAL_POSTS / POSTS_PER_PAGE;

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

export const PrevBtn = ({ page, setPage }) => {
  return (
    <button
      className="btn btn-sm btn-secondary mb-1 col-md-2 offset-5"
      disabled={page <= 1}
      onClick={() => setPage((prevState) => prevState - 1)}
    >
      Prev
    </button>
  );
};
