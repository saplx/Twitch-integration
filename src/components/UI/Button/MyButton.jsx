import cl from "./MyButton.module.css";

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={cl.MyButton}>
      {children}
    </button>
  );
};

export default MyButton;
