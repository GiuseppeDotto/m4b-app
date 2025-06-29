import { ChangeEvent, MouseEvent, useState } from "react";
import "./blogSearchBar.css";
import TwoNameToggle from "./TwoNameToggle";

interface Props {
  tagList: string[];
  displayModes: string[];
  onSelectTags?: (tags: string[]) => void;
  onSearching?: (text: string) => void;
  onDisplayMode?: (mode: string) => void;
}

export default function BlogSearchBar({
  tagList,
  displayModes,
  onSelectTags = () => {},
  onSearching = () => {},
  onDisplayMode = () => {},
}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([...tagList]);

  const clickTag = (e: MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const selectedText = e.currentTarget.innerText;
    const updatedList = selectedTags.includes(selectedText)
      ? [...selectedTags.filter((tag) => tag !== selectedText)]
      : [...selectedTags, selectedText];
    setSelectedTags(updatedList);
    onSelectTags(updatedList);
  };

  return (
    <div className="blog-search-bar">
      <div className="tag-list">
        <small style={{ flex: "0 0 100%" }}>tags:</small>
        <div>
          {tagList.map((tag) => (
            <div
              className={`tag ${selectedTags.includes(tag) ? "active" : ""}`}
              key={tag}
              onClick={clickTag}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="search-div">
        <small>search by title:</small> <br />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearching(e.target.value)}
        />
      </div>
      <div className="display-mode">
        <small>display mode:</small>
        <TwoNameToggle
          name1={displayModes[0]}
          name2={displayModes[1]}
          onTrigger={(curr) => onDisplayMode(curr)}
        />
      </div>
    </div>
  );
}
