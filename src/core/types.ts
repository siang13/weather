import { AxiosResponse } from 'axios';
import { BaseSyntheticEvent } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

declare global {
  interface Error {
    code: number;
    response: AxiosResponse;
  }
}

export interface FormReturn<T extends FieldValues> extends UseFormReturn<T> {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}
