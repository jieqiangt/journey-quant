import { ComponentBaseProps } from "@/models/base.model";

interface TableRowProps extends ComponentBaseProps {
  row: { [col: string]: string | boolean | number | undefined };
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const { classes, baseClass, row } = props;

  const rowCells = [];
  for (const col in row) {
    rowCells.push(
      <td className={classes[`${baseClass}--table--body--cell`]} key={col}>
        {row[col]}
      </td>
    );
  }

  return (
    <tr className={classes[`${baseClass}--table--body--row`]}>{rowCells}</tr>
  );
};

export default TableRow;
