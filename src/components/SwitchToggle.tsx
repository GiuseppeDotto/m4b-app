interface Props {
  defaultValue?: boolean;
  onChange: (status: boolean) => void;
}

export default function SwitchToggle(props: Props) {
  return (
    <>
      <label htmlFor="switch-toggle"></label>
      <input
        type="checkbox"
        id="switch-toggle"
        defaultChecked={props.defaultValue}
        onChange={(e) => props.onChange(e.target.checked)}
      />
    </>
  );
}
