import { createContext, useContext } from "react";
import type { FieldValues, FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export interface FormItemContextValue {
  id: string;
}

export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const createFormFieldContextValue = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(name: TName): FormFieldContextValue<TFieldValues, TName> => ({ name });

export const createFormItemContextValue = (id: string): FormItemContextValue => ({ id });

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext?.name) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const id = itemContext?.id ?? String(fieldContext.name);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
