"use client";

import InputText from "@/components/form/InputText";
import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent } from "react";
import { ExpenseFormProps } from "@/models/form.model";
import InputSelect from "@/components/form/InputSelect";
import InputDate from "@/components/form/InputDate";
import OnClickButton from "@/components/OnClickButton";
import { ExpenseInterface } from "@/models/db.model";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const ExpenseForm: React.FC<ExpenseFormProps> = (props) => {
  const {
    classes,
    baseClass,
    insertRecord,
    categoriesSelection,
    updateFtTables,
  } = props;
  const router = useRouter();

  const dateRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const amtRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const today = new Date();
    const todayStr = convertDatetoStr(today);

    const expense: ExpenseInterface = {
      exp_date: dateRef.current?.value!,
      exp_desc: descRef.current?.value!,
      amount: +amtRef.current?.value!,
      category_id: +categoryRef.current?.value!,
      exp_month: dateRef.current?.value!
        ? +dateRef.current?.value!.split("-")[1]
        : null,
      exp_year: dateRef.current?.value!
        ? +dateRef.current?.value!.split("-")[0]
        : null,
      user_id: 1,
      created_on: todayStr,
      updated_on: todayStr,
      recurring: false,
      recurring_period: null,
      recurring_start: null,
    };

    const response = await insertRecord(expense);

    if (response.status === 200) {
      updateFtTables(expense);

      if (dateRef.current) {
        dateRef.current.value = todayStr;
      }
      if (descRef.current) {
        descRef.current.value = "";
      }
      if (amtRef.current) {
        amtRef.current.value = "";
      }
      router.refresh();
    }
  };

  const categoriesOptions = categoriesSelection.map((option) => ({
    name: option.category,
    value: option.id,
  }));

  const formFields = (
    <Fragment>
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="desc"
        placeholder="Description"
        label="Description"
        valid={true}
        invalidText=""
        inputRef={descRef}
      />
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="amt"
        placeholder="Amount"
        label="Amount"
        valid={true}
        invalidText=""
        inputRef={amtRef}
      />
      <InputDate
        baseClass={baseClass}
        classes={classes}
        name="date"
        label="Date"
        inputRef={dateRef}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="category"
        label="Category"
        inputRef={categoryRef}
        inputOptions={categoriesOptions}
      />
      <OnClickButton
        onClick={submitHandler}
        classes={classes}
        baseClass={baseClass}
        btnClass="btn"
      >
        Record Expense
      </OnClickButton>
    </Fragment>
  );

  return (
    <Form baseClass={baseClass} classes={classes} formFields={formFields} />
  );
};

export default ExpenseForm;
