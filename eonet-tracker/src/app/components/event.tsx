import { Dispatch, SetStateAction, useMemo, useState } from "react";

type eventProp = {
  id: string;
  title: string;
  currentSelection: string;
  sendID: Dispatch<SetStateAction<string>>;
};

export default function Event(props: eventProp) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  function sendID() {
    props.currentSelection != props.id
      ? props.sendID(props.id)
      : props.sendID("");
  }
  // useEffect(() => {
  //   props.currentSelection != props.id
  //     ? setIsSelected(false)
  //     : setIsSelected(true);
  // }, [props.currentSelection]);
  const selectedEvent = useMemo(() => {
    if (props.currentSelection != props.id) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  }, [props.currentSelection]);

  return (
    <div
      className={`rounded-sm p-1 transition-colors duration-150 ${isSelected ? "bg-white text-black" : "bg-black text-white hover:bg-neutral-800"}`}
      onClick={sendID}
    >
      {props.title}
    </div>
  );
}
