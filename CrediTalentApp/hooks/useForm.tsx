import { useState, ChangeEvent } from 'react'

type FormState<T> = {
  [K in keyof T]: T[K]
}

type UseFormReturn<T> = {
  form: FormState<T>
  setForm: React.Dispatch<React.SetStateAction<FormState<T>>>
  resetForm: () => void
  handleInput: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleFileInput: (event: ChangeEvent<HTMLInputElement>) => void
}

const useForm = <T extends Record<string, unknown>>(
  initialState: T,
): UseFormReturn<T> => {
  const [form, setForm] = useState<FormState<T>>(initialState)

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target
    if (files) {
      setForm((prevState) => ({ ...prevState, [name]: files }))
    }
  }

  const resetForm = () => setForm(initialState)

  // Return the form state variable and input handling functions
  return { form, setForm, resetForm, handleInput, handleFileInput }
}

export default useForm
