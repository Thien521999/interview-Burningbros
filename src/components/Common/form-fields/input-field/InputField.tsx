import { Control, Controller } from 'react-hook-form'

interface InputFieldProps {
  control: Control<any>
  name: string
  placeholder?: string
  onclick?: (value: React.MouseEvent<HTMLDivElement>) => void
  inputRef: any
}

export const InputField = ({ control, name, placeholder, onclick, inputRef }: InputFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          ref={inputRef}
          type="text"
          name={name}
          placeholder={placeholder}
          onClick={onclick}
          className="border border-[#D9E0E8] rounded-[8px] w-[100%] h-[32px] line-clamp-1 focus:outline-none focus:border-[#D1B8FA] hover:border-[#D1B8FA] block text-ellipsis px-2.5 py-4"
        />
      )}
    />
  )
}
