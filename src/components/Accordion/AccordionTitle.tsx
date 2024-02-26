type AccordionTitlePropsType = {
  title: string;
};

export function AccordionTitle(props: AccordionTitlePropsType) {
  return <h3>{props.title}</h3>;
}
