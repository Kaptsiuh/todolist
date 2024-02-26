type StartPropsType = {
  selected: boolean;
};

export function Star(props: StartPropsType) {
  if (props.selected === true) {
    return (
      <span>
        <b>star</b>
      </span>
    );
  } else {
    return <span>star</span>;
  }
}
