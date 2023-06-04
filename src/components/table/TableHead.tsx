import { ComponentBaseProps } from "@/models/base.model";

interface TableHeadProps extends ComponentBaseProps {
  headers: string[];
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const { classes, baseClass, headers } = props;

  const headerCells = headers.map((header) => <th key={header}>{header}</th>);

  return (
    <thead>
      <tr>{headerCells}</tr>
    </thead>
  );
};

export default TableHead;
