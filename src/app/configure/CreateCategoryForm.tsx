"use client";

import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent, ChangeEvent, useState } from "react";
import { InsertFormProps, InputButtonOptionProps } from "@/models/form.model";
import InputText from "@/components/form/InputText";
import OnClickButton from "@/components/OnClickButton";
import { CategoryInterface } from "@/models/db.model";
import InputButton from "@/components/form/InputButton";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const CreateCategoryForm: React.FC<InsertFormProps> = (props) => {
  const { classes, baseClass, insertRecord } = props;
  const router = useRouter();

  const [discretionary, setDiscretionary] = useState<boolean | undefined>(
    undefined
  );
  const categoryRef = useRef<HTMLInputElement>(null);
  const subCategoryRef = useRef<HTMLInputElement>(null);

  const radioHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "true") {
      setDiscretionary(() => true);
    } else {
      setDiscretionary(() => false);
    }
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const today = new Date();
    const todayStr = convertDatetoStr(today);
    const category: CategoryInterface = {
      discretionary: discretionary!,
      category: categoryRef.current?.value!,
      sub_category: subCategoryRef.current?.value!,
      user_id: 1,
      created_on: todayStr,
      updated_on: todayStr,
    };

    const response = await insertRecord(category);

    if (response.status === 200) {
      if (categoryRef.current) {
        categoryRef.current.value = "";
      }
      if (subCategoryRef.current) {
        subCategoryRef.current.value = "";
      }

      router.refresh();
    }
  };

  const discretionarySelectOptions: InputButtonOptionProps[] = [
    {
      type: "radio",
      name: "discretionary",
      fieldSetName: "expenseNecessity",
      label: "Discretionary",
      value: true,
      onChange: radioHandler,
      baseClass,
      classes,
    },
    {
      type: "radio",
      name: "necessity",
      fieldSetName: "expenseNecessity",
      label: "Necessity",
      value: false,
      onChange: radioHandler,
      baseClass,
      classes,
    },
  ];

  const formFields = (
    <Fragment>
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="category"
        placeholder="Category"
        label="Category"
        valid={true}
        invalidText=""
        inputRef={categoryRef}
      />
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="subCategory"
        placeholder="Sub Category"
        label="Sub Category"
        valid={true}
        invalidText=""
        inputRef={subCategoryRef}
      />
      <InputButton
        baseClass={baseClass}
        classes={classes}
        type="radio"
        legend="Expense Necessity"
        inputOptions={discretionarySelectOptions}
      />
      <OnClickButton
        onClick={submitHandler}
        classes={classes}
        baseClass={baseClass}
        btnClass="btn"
      >
        Add New Category
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

export default CreateCategoryForm;
