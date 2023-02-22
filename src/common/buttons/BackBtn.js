import { useNavigate } from "react-router-dom";

const BackBtn = ({title}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button onClick={goBack} className="btn btn-outline-success m-2">
     {title}
    </button>
  );
};

export default BackBtn;
