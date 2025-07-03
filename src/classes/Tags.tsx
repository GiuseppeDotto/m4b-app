import { Post } from "./Post";

export interface ITag {
  tag: string;
  color: string;
  div?: JSX.Element;
}

const colorPalette: string[] = [
  "rgba(226, 124, 124, 1)", // Soft Coral
  "rgba(198, 134, 134, 1)", // Dusty Rose
  "rgba(110, 166, 119, 1)", // Forest Canopy
  "rgba(183, 211, 184, 1)", // Misty Sage
  "rgba(244, 244, 244, 1)", // Ice White
  "rgba(220, 220, 220, 1)", // Pebble Gray
  "rgba(190, 74, 30, 1)", // Rust Orange
  "rgba(255, 159, 77, 1)", // Amber Gold
  "rgba(90, 159, 165, 1)", // Teal Mist
  "rgba(28, 76, 81, 1)", // Midnight Reef
  "rgba(58, 58, 58, 1)", // Charcoal Slate
  "rgba(232, 224, 217, 1)", // Linen Sand
];

export const calculateTags = (posts: Post[], activeTags: ITag[] = []) => {
  const uniqueTags = posts.reduce((acc: string[], curr) => {
    curr.tags.map((tag) => (acc.includes(tag) ? null : acc.push(tag)));
    return acc;
  }, []);

  return uniqueTags.map((tag, i) => {
    const uniqueKey = String(new Date().getTime() + i);
    const color = activeTags.find((x) => x.tag === tag)?.color || colorPalette[i];
    return {
      tag,
      color,
      div: (
        <div
          className="tag-div"
          style={{
            backgroundColor: color.replace(", 1)", ", 0.33)"),
            outline: `1pt solid ${color}`,
            padding: "2px 5px",
            borderRadius: "5px",
            userSelect: "none",
          }}
          key={uniqueKey}
        >
          {tag}
        </div>
      ),
    } as ITag;
  });
};
