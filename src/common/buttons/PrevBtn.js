const PrevBtn = ({ page, setPage }) => {
  const MIN_PAGE_LENGTH = 1;

  return (
    <button
      className="btn btn-sm btn-secondary mb-1 col-md-2 offset-5"
      disabled={page <= MIN_PAGE_LENGTH}
      onClick={() => setPage((prevState) => prevState - 1)}
    >
      Prev
    </button>
  );
};

export default PrevBtn;
