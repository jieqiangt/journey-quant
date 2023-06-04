import { ComponentBaseProps } from "@/models/base.model";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

interface TableProps extends ComponentBaseProps {
  headers: string[];
  data: { [colName: string]: string | number | boolean | undefined }[];
}

const Table: React.FC<TableProps> = (props) => {
  const { classes, baseClass, headers, data } = props;

  const tableRows = data.map((row, idx) => (
    <TableRow key={idx} classes={classes} baseClass={baseClass} row={row} />
  ));
  return (
    <table>
      <TableHead classes={classes} baseClass={baseClass} headers={headers} />
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default Table;
