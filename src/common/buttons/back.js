const GoBack = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button onClick={goBack} className="btn btn-outline-success m-2">
      Go Back
    </button>
  );
};

export default GoBack;
