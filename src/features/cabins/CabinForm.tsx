import { FieldErrors, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Cabin } from "../../types/cabin";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import Form from "../../ui/Form";

// Define the form data type (excluding id since it's auto-generated)
type CabinFormData = Omit<Cabin, "id" | "image"> & { image: FileList | null };

interface CabinFormProps {
  onCloseModal?: () => void;
}

export default function CabinForm({ onCloseModal }: CabinFormProps = {}) {
  const { register, handleSubmit, reset, formState, getValues } =
    useForm<CabinFormData>();
  const { errors } = formState;
  console.log(errors);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      onCloseModal?.();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function onSubmit(data: CabinFormData) {
    console.log("Form data:", data);
    console.log("Image data:", data.image);

    // Handle file input - FileList to File conversion
    if (!data.image || data.image.length === 0) {
      toast.error("Please select an image");
      return;
    }

    const formData = {
      ...data,
      image: data.image[0],
    };

    console.log("Processed form data:", formData);
    mutate(formData);
  }

  function onError(errors: FieldErrors<CabinFormData>) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const regularPrice = getValues().regularPrice;
              if (!regularPrice) return true; // Skip validation if regular price not set yet
              return (
                Number(value) <= Number(regularPrice) ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Create
        </Button>
      </FormRow>
    </Form>
  );
}
