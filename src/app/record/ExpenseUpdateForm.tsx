"use client";

import InputText from "@/components/form/InputText";
import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent } from "react";
import { ExpenseUpdateFormProps } from "@/models/form.model";
import InputSelect from "@/components/form/InputSelect";
import InputDate from "@/components/form/InputDate";
import OnClickButton from "@/components/OnClickButton";
import { ExpenseInterface } from "@/models/db.model";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const ExpenseUpdateForm: React.FC<ExpenseUpdateFormProps> = (props) => {
  const {
    classes,
    baseClass,
    updateRecord,
    currentRecord,
    categoriesSelection,
    updateFtTables,
    closeModal,
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

    const response = await updateRecord(expense);

    if (response.status === 200) {
      updateFtTables(expense);
      closeModal();
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
        defaultValue={currentRecord["exp_desc"] as string}
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
        defaultValue={currentRecord["amount"] as string}
      />
      <InputDate
        baseClass={baseClass}
        classes={classes}
        name="date"
        label="Date"
        inputRef={dateRef}
        defaultValue={currentRecord["exp_date"] as string}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="category"
        label="Category"
        inputRef={categoryRef}
        inputOptions={categoriesOptions}
        defaultOption={currentRecord["category"] as string}
      />
      <OnClickButton
        onClick={submitHandler}
        classes={classes}
        baseClass={baseClass}
        btnClass="btn"
      >
        Update Expense
      </OnClickButton>
    </Fragment>
  );

  return (
    <Form baseClass={baseClass} classes={classes} formFields={formFields} />
  );
};

export default ExpenseUpdateForm;
