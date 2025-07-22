const CompleteTaskCheckbox = ({ completed, onToggle }) => {
    return <input className="checkbox" type="checkbox" checked={completed} onChange={onToggle} />}
    // console.log(checked);

  export default CompleteTaskCheckbox;
  