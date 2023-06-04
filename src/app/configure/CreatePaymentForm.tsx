"use client";

import Form from "@/components/form/Form";
import { Fragment, useRef, FormEvent } from "react";
import { CreatePaymentFormProps } from "@/models/form.model";
import InputText from "@/components/form/InputText";
import OnClickButton from "@/components/OnClickButton";
import { PaymentInterface } from "@/models/db.model";
import { convertDatetoStr } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";
import InputSelect from "@/components/form/InputSelect";

const CreatePaymentForm: React.FC<CreatePaymentFormProps> = (props) => {
  const { classes, baseClass, insertRecord, chargingAccountsSelection } = props;
  const router = useRouter();

  const aliasRef = useRef<HTMLInputElement>(null);
  const paymentTypeRef = useRef<HTMLSelectElement>(null);
  const cardProviderRef = useRef<HTMLInputElement>(null);
  const paymentOperatorRef = useRef<HTMLInputElement>(null);
  const chargingAccountRef = useRef<HTMLSelectElement>(null);

  const chargingAccountOptions = chargingAccountsSelection.map((option) => ({
    name: option.alias,
    value: option.id,
  }));

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const today = new Date();
    const todayStr = convertDatetoStr(today);
    const payment: PaymentInterface = {
      alias: aliasRef.current?.value!,
      payment_type: paymentTypeRef.current?.value!,
      card_provider: cardProviderRef.current?.value!,
      payment_operator: paymentOperatorRef.current?.value!,
      charged_to: +chargingAccountRef.current?.value!,
      user_id: 1,
      created_on: todayStr,
      updated_on: todayStr,
    };

    const response = await insertRecord(payment);

    if (response.status === 200) {
      if (aliasRef.current) {
        aliasRef.current.value = "";
      }
      if (paymentTypeRef.current) {
        paymentTypeRef.current.value = "";
      }
      if (cardProviderRef.current) {
        cardProviderRef.current.value = "";
      }
      if (paymentOperatorRef.current) {
        paymentOperatorRef.current.value = "";
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
        name="cardProvider"
        placeholder="Card Provider"
        label="Card Provider"
        valid={true}
        invalidText=""
        inputRef={cardProviderRef}
      />
      <InputText
        baseClass={baseClass}
        classes={classes}
        type="text"
        name="paymentOperator"
        placeholder="Payment Operator"
        label="Payment Operator"
        valid={true}
        invalidText=""
        inputRef={paymentOperatorRef}
      />
      <InputSelect
        baseClass={baseClass}
        classes={classes}
        name="chargingAccount"
        label="Charging Account"
        inputRef={chargingAccountRef}
        inputOptions={chargingAccountOptions}
      />
      <OnClickButton
        onClick={submitHandler}
        classes={classes}
        baseClass={baseClass}
        btnClass="btn"
      >
        Add New Payment
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

export default CreatePaymentForm;
