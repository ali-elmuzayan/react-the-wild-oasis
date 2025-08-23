import { FieldError, useForm, useFormState } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Cabin } from "../../types/cabin";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { createCabin } from "../../services/apiCabins";

export default function CabinForm() {
  const { register, handleSubmit } = useForm();
  const { errors } = useFormState();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: Error) => alert(err.message),
  });

  function onSubmit(data: Cabin) {
    console.log(data);
  }

  function onError(errors: FieldError) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
    </form>
  );
}
