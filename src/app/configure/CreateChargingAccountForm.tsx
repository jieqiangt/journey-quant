"use client";

import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent } from "react";
import { InsertFormProps } from "@/models/form.model";
import InputText from "@/components/form/InputText";
import OnClickButton from "@/components/OnClickButton";
import { ChargingAccountInterface } from "@/models/db.model";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const CreateChargingAccountForm: React.FC<InsertFormProps> = (props) => {
  const { classes, baseClass, insertRecord } = props;
  const router = useRouter();

  const aliasRef = useRef<HTMLInputElement>(null);
  const serviceProviderRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const today = new Date();
    const todayStr = convertDatetoStr(today);
    const chargingAccount: ChargingAccountInterface = {
      alias: aliasRef.current?.value!,
      service_provider: serviceProviderRef.current?.value!,
      user_id: 1,
      created_on: todayStr,
      updated_on: todayStr,
    };

    const response = await insertRecord(chargingAccount);
    if (response.status === 200) {
      if (aliasRef.current) {
        aliasRef.current.value = "";
      }
      if (serviceProviderRef.current) {
        serviceProviderRef.current.value = "";
      }

      router.refresh();
    }
  };

  const formFields = (
    <Fragment>
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="alias"
        placeholder="Alias"
        label="Alias"
        valid={true}
        invalidText=""
        inputRef={aliasRef}
      />
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="serviceProvider"
        placeholder="Service Provider"
        label="Service Provider"
        valid={true}
        invalidText=""
        inputRef={serviceProviderRef}
      />
      <OnClickButton
        onClick={submitHandler}
        classes={classes}
        baseClass={baseClass}
        btnClass="btn"
      >
        Add New Charging Account
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

export default CreateChargingAccountForm;
