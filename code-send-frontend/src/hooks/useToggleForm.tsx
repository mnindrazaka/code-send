import { useMemo, useCallback } from "react";

interface useToggleFormOption<T> {
  name: string;
  emptyValues: T;
  filledValues?: T;
  onCreate: (values: T) => void;
  onEdit: (values: T) => void;
}

const useToggleForm = <T,>({
  name,
  emptyValues,
  filledValues,
  onCreate,
  onEdit
}: useToggleFormOption<T>) => {
  const initialValues = useMemo((): T => {
    return filledValues ? { ...filledValues } : emptyValues;
  }, [filledValues, emptyValues]);

  const title = useMemo((): string => {
    return filledValues ? `Edit ${name}` : `Create ${name}`;
  }, [filledValues, name]);

  const subTitle = useMemo((): string => {
    return filledValues ? `Edit your ${name}` : `Create your new ${name}`;
  }, [filledValues, name]);

  const handleSubmit = useCallback(
    (values: T) => {
      if (filledValues) onEdit(values);
      else onCreate(values);
    },
    [filledValues, onCreate, onEdit]
  );

  return { initialValues, title, subTitle, handleSubmit };
};

export default useToggleForm;
