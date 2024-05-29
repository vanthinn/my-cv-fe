import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { FC } from 'react'

interface Props {
  error?: any
  onChange: any
  value: any
  disabled?: boolean
}

const DateTimePicker: FC<Props> = ({
  error,
  onChange,
  value,
  disabled,
}: Props): JSX.Element => {
  return (
    <div>
      <DatePicker
        sx={{
          width: '100%',
          '& .MuiInputBase-input': {
            paddingY: 1.5,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            border: !!error ? '1px solid red' : 'none',
          },
          backgroundColor: '#E6F0F6',
          borderRadius: '8px',
        }}
        disabled={disabled}
        format="DD-MM-YYYY"
        value={value === '' ? dayjs() : dayjs(value)}
        onChange={onChange}
      />
      {!!error && <span className="text-red-600 text-sm">{error?.message}</span>}
    </div>
  )
}

export default DateTimePicker
