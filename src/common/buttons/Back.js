import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button onClick={goBack} className="btn btn-outline-success m-2">
      Go Back
    </button>
  );
};

export default GoBack;
