import { AccordionList } from "./AccordionList";
import { AccordionTitle } from "./AccordionTitle";

export function Accordion(props: any) {
  return (
    <div>
      <AccordionTitle title={props.titleValue} />
      <AccordionList />
    </div>
  );
}
