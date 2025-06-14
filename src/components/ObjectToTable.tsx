import "./ObjectToTable.css";

const SingleObjectTable = ({ obj }: { [key: string]: any }) => {
  return (
    <table className="first-col">
      <tbody>
        {Object.keys(obj).map((k) => {
          return (
            <tr key={k}>
              <td>{k}</td>
              <td>{obj[k]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const MultipleObjectsTable = ({ obj }: { obj: { [key: string]: any }[] }) => {
  const allKeys = obj.reduce<string[]>((acc, curr) => {
    Object.keys(curr).map((k) => (acc.includes(k) ? null : acc.push(k)));
    return acc;
  }, []);
  return (
    <table>
      <thead>
        <tr>
          {allKeys.map((k) => {
            return <th key={k}>{k}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {obj.map((o, i) => {
          // const uniqueCode = String(new Date())
          return (
            <tr key={new Date().getTime() + i}>
              {allKeys.map((k) => {
                return <td>{o[k]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface Props {
  obj: { [key: string]: any } | { [key: string]: any }[];
}

/**
 * Return a table parsing the provided object or array of objects.
 *
 * If a **single object** is provided, the table will bea header-less and
 * all the information will be displayed vertically.
 *
 * When **multiple objects** are provided, the keys will be placed on the header and
 * each row will represent one of the provided objects.
 *
 * @param props
 * @returns HTMLTableElement
 */
export default function ObjectToTable(props: Props) {
  const obj = props.obj;
  return (
    <>{Array.isArray(obj) ? <MultipleObjectsTable obj={obj} /> : <SingleObjectTable obj={obj} />}</>
  );
}
