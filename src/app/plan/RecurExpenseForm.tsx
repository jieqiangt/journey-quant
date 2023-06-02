"use client";

import InputText from "@/components/form/InputText";
import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent } from "react";
import { FormProps } from "@/models/form.model";
import InputSelect from "@/components/form/InputSelect";
import InputDate from "@/components/form/InputDate";
import OnClickButton from "@/components/OnClickButton";
import { RecurExpenseInterface } from "@/models/db.model";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const RecurExpenseForm: React.FC<FormProps> = (props) => {
  const {
    classes,
    baseClass,
    insertRecord,
    categoriesSelection,
    paymentsSelection,
    recurPeriodsSelection,
  } = props;
  const router = useRouter();

  const recurStartRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const amtRef = useRef<HTMLInputElement>(null);
  const recurPeriodRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const paymentRef = useRef<HTMLSelectElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const today = new Date();
    const todayStr = convertDatetoStr(today);

    const expense: RecurExpenseInterface = {
      exp_desc: descRef.current?.value!,
      amount: +amtRef.current?.value!,
      category_id: +categoryRef.current?.value!,
      payment_id: +paymentRef.current?.value!,
      recurring_period: recurPeriodRef.current?.value!,
      recurring_start: recurStartRef.current?.value!,
      user_id: 1,
      created_on: todayStr,
      updated_on: todayStr,
      is_active: true,
    };

    const response = await insertRecord(expense);

    if (response.status === 200) {
      if (recurStartRef.current) {
        recurStartRef.current.value = "";
      }
      if (descRef.current) {
        descRef.current.value = "";
      }
      if (amtRef.current) {
        amtRef.current.value = "";
      }
      if (categoryRef.current) {
        categoryRef.current.value = "";
      }
      if (paymentRef.current) {
        paymentRef.current.value = "";
      }
      if (recurPeriodRef.current) {
        recurPeriodRef.current.value = "";
      }
      router.refresh();
    }
  };

  const categoriesOptions = categoriesSelection.map((option) => ({
    name: option.sub_category,
    value: option.id,
  }));

  const paymentOptions = paymentsSelection.map((option) => ({
    name: option.alias,
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
        name="start"
        label="Start Date"
        inputRef={recurStartRef}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="recurPeriod"
        label="Recurring Period"
        inputRef={recurPeriodRef}
        inputOptions={recurPeriodsSelection}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="category"
        label="Category"
        inputRef={categoryRef}
        inputOptions={categoriesOptions}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="payment"
        label="Payment Mode"
        inputRef={paymentRef}
        inputOptions={paymentOptions}
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
    <Form
      baseClass={baseClass}
      formClass="form"
      classes={classes}
      formFields={formFields}
    />
  );
};

export default RecurExpenseForm;
