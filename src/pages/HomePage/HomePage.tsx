import { FC, useState } from 'react'
import TextFieldV2 from '../../components/TextFieldV2'
import AutocompleteCustom from '../../components/Autocomplete/Autocomplete'
import { LIST_COUNTRY, experienceEnum } from '../../common/constants'
import Button from '../../components/Button'
import Selected from '../../components/Select'

interface Props {}

const HomePage: FC<Props> = (props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [experience, setExperience] = useState<string>('')

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleChangeCity = (value: any): void => {
    setCity(value)
  }

  const handleChangeExperience = (value: any): void => {
    setExperience(value.target.value)
  }
  return (
    <div className="my-8 flex flex-col">
      <div className="flex w-full gap-6">
        <TextFieldV2
          type="search"
          onChange={handleChangeSearch}
          value={inputSearch}
          placeholder="Search for jobs"
          width="300px"
        />

        <AutocompleteCustom
          value={city}
          onChange={handleChangeCity}
          placeholder="All Cities"
          options={LIST_COUNTRY}
        />

        <Selected
          onChange={handleChangeExperience}
          value={experience}
          options={experienceEnum}
          empty="Select experience"
        />

        <Button className="px-8">Search</Button>
      </div>
    </div>
  )
}

export default HomePage
