import { MouseEvent, useEffect, useRef, useState } from "react";
import "./TwoNameToggle.css";

interface Props {
  name1: string;
  name2: string;
  onTrigger: (currentName: string) => void;
  defaultSelectFirst?: boolean;
}

export default function TwoNameToggle({
  name1,
  name2,
  onTrigger,
  defaultSelectFirst = true,
}: Props) {
  const [tagPosition, setTagPosition] = useState("left");
  const [fillWidth, setFillWidth] = useState("0px");
  const firstSelection = useRef<HTMLDivElement>(null);
  const secondSelection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    defaultSelectFirst && firstSelection.current
      ? firstSelection.current.click()
      : !defaultSelectFirst && secondSelection.current
      ? secondSelection.current.click()
      : null;
  }, []);

  const moveLeft = (e: MouseEvent) => {
    setTagPosition("left");
    onTrigger(name1);
    const selectedDiv = e.target as HTMLDivElement;
    setFillWidth(`${selectedDiv.clientWidth}px`);
  };
  const moveRight = (e: MouseEvent) => {
    setTagPosition("right");
    onTrigger(name2);
    const selectedDiv = e.target as HTMLDivElement;
    setFillWidth(`${selectedDiv.clientWidth}px`);
  };

  return (
    <div className="two-names-toggle">
      <div className="toggle-selector" onClick={moveLeft} ref={firstSelection}>
        {name1}
      </div>
      <div className="toggle-selector" onClick={moveRight} ref={secondSelection}>
        {name2}
      </div>
      <div className={`two-names-toggle-fill ${tagPosition}`} style={{ width: fillWidth }} />
    </div>
  );
}
