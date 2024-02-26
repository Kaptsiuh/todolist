import { Star } from "./Star";

type RatingProps = {
  value: 0 | 1 | 2 | 3 | 4 | 5;
};

export function Rating(props: RatingProps) {
  if (props.value === 0) {
    return (
      <>
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
      </>
    );
  }
  if (props.value === 1) {
    return (
      <>
        <Star selected={true} />
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
      </>
    );
  }
  if (props.value === 2) {
    return (
      <>
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={false} />
        <Star selected={false} />
        <Star selected={false} />
      </>
    );
  }
  if (props.value === 3) {
    return (
      <>
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={false} />
        <Star selected={false} />
      </>
    );
  }
  if (props.value === 4) {
    return (
      <>
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={true} />
        <Star selected={false} />
      </>
    );
  }
  return (
    <>
      <Star selected={true} />
      <Star selected={true} />
      <Star selected={true} />
      <Star selected={true} />
      <Star selected={true} />
    </>
  );
}
