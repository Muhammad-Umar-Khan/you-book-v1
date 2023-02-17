const NextBtn = ({ page, setPage }) => {
  const MAX_PAGE_LENGTH = 2;

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
