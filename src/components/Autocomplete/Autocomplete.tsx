import { IOption } from '../../types/ICommon'
import { Autocomplete, TextField } from '@mui/material'
import { FC } from 'react'
import { HiLocationMarker } from 'react-icons/hi'

interface IProps {
  value: any
  onChange: any
  placeholder: string
  options: IOption[]
  error?: any
  disabled?: boolean
  width?: string
}

const AutocompleteCustom: FC<IProps> = ({
  value,
  error,
  placeholder,
  onChange,
  options,
  disabled,
  width,
}: IProps): JSX.Element => {
  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        size="small"
        disabled={disabled}
        options={options}
        onChange={(_event, option) => {
          if (option === null) onChange('')
          else onChange(option.label)
        }}
        value={value}
        getOptionLabel={(option) => {
          const data = options.find(
            (item: IOption) => option === item.label || option?.label === item.label,
          )
          return data?.name || ''
        }}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              key={option?.name}>
              <HiLocationMarker className="mr-2 mb-1 text-blue-500" />
              {option?.name}
            </li>
          )
        }}
        sx={{
          width: width ? width : '100%',
          '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall ': {
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '8px',
            backgroundColor: '#eff6fa',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: !!error ? '1px solid red' : 'none',
          },
        }}
        isOptionEqualToValue={(option, value) => {
          return option.label === value
        }}
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
            />
          </div>
        )}
      />
      {!!error && <span className="text-red-600 text-sm">{error?.message}</span>}
    </>
  )
}

export default AutocompleteCustom
