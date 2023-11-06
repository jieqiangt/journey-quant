"use client";

import { ComponentBaseProps, ColumnObject } from "@/models/base.model";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useState, Fragment } from "react";
import Modal from "../Modal";

interface TableProps extends ComponentBaseProps {
  headers: string[];
  data: ColumnObject[];
  dataType: string;
}

const Table: React.FC<TableProps> = (props) => {
  const { classes, baseClass, headers, data, dataType } = props;

  const [updateItem, setUpdateItem] = useState(
    undefined as ColumnObject | undefined
  );

  const items = data.map((item) => {
    return {
      ...item,
      id: +item.id!,
      updateButton: (
        <button
          id={`${item.id}`}
          onClick={function () {
            setUpdateItem(item);
          }}
        >
          Update
        </button>
      ),
    };
  });

  const closeModal = () => {
    setUpdateItem(undefined);
  };

  const tableRows = items.map((row, idx) => (
    <TableRow key={idx} classes={classes} baseClass={baseClass} row={row} />
  ));
  return (
    <Fragment>
      <Modal
        classes={classes}
        modalClass={"modal"}
        updateItem={updateItem}
        dataType={dataType}
        closeModal={closeModal}
      />
      <table className={classes[`${baseClass}--table`]}>
        <TableHead classes={classes} baseClass={baseClass} headers={headers} />
        <tbody className={classes[`${baseClass}--table--body`]}>
          {tableRows}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
