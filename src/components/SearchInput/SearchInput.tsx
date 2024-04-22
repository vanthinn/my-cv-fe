import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { FC } from 'react'

interface IProps {
  size?: string
  value: string
  width?: string
  setValue: (value: string) => void
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchInput: FC<IProps> = ({
  value,
  setValue,
  size,
  width,
  handleKeyDown,
}: IProps): JSX.Element => {
  return (
    <Paper
      sx={{
        p: size === 'small' ? '1px 4px' : 'px 4px',
        display: 'flex',
        alignItems: 'center',
        width: width ? width : 400,
        borderRadius: 2,
        bgcolor: '#E6F0F6',
      }}>
      <IconButton
        type="button"
        sx={{ p: size === 'small' ? '5px' : '10px' }}
        aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, pr: '10px', fontSize: 15 }}
        name="searchInput"
        placeholder="Search for jobs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Paper>
  )
}

export default SearchInput
