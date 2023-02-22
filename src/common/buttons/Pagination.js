import { Fragment } from "react";
const Pagination = ({ setPage, title, disabled }) => {
  return (
    <Fragment>
      <button
        onClick={setPage}
        disabled={disabled}
        className="btn text-center mx-1 btn-secondary"
      >
        {title}
      </button>
    </Fragment>
  );
};

export default Pagination;
