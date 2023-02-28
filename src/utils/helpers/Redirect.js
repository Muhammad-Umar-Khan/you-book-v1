import { useNavigate } from "react-router-dom";
const Redirect = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(-1);
  }, 1000);
};

export default Redirect;
