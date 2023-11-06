import { ComponentBaseProps } from "@/models/base.model";

interface TableHeadProps extends ComponentBaseProps {
  headers: string[];
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const { classes, baseClass, headers } = props;

  const headerCells = headers.map((header) => (
    <th className={classes[`${baseClass}--table--head--cell`]} key={header}>
      {header}
    </th>
  ));

  return (
    <thead className={classes[`${baseClass}--table--head`]}>
      <tr className={classes[`${baseClass}--table--head--row`]}>
        {headerCells}
      </tr>
    </thead>
  );
};

export default TableHead;
