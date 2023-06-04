import { ComponentBaseProps } from "@/models/base.model";

interface TableRowProps extends ComponentBaseProps {
  row: { [col: string]: string | boolean | number | undefined };
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const { classes, baseClass, row } = props;

  const rowCells = [];
  for (const col in row) {
    rowCells.push(<td key={col}>{row[col]}</td>);
  }

  return <tr>{rowCells}</tr>;
};

export default TableRow;
