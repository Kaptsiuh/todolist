type ButtonPropsType = {
  title: string;
  onClickHandler: () => void;
  className?: string;
};

export const Button = ({
  title,
  onClickHandler,
  className,
}: ButtonPropsType) => {
  return (
    <button className={className} onClick={onClickHandler}>
      {title}
    </button>
  );
};
