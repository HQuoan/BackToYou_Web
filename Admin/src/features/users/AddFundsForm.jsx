import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useAdjustFunds } from "./useAdjustFunds";

function AddFundsForm({ user, onCloseModal }) {
  const { isUpdating, adjustFunds } = useAdjustFunds();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    if (data.amount === 0) return;

    adjustFunds(
      {
        userId: user.id,
        balance: parseFloat(data.amount),
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Amount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="amount"
          disabled={isUpdating}
          defaultValue={0}
          {...register("amount", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Add funds</Button>
      </FormRow>
    </Form>
  );
}

export default AddFundsForm;
