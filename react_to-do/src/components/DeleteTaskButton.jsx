const DeleteTaskButton = ({ onDelete }) => {
  return (
      <button className="delete-btn" onClick={onDelete}>
          Remove
           <img className="img" src="https://img.icons8.com/?size=100&id=13902&format=png&color=000000" alt="Italian Trulli" />
      </button>
  );
};

export default DeleteTaskButton;