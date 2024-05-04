import React, { FC, useRef, useState } from 'react'
import ButtonNextBack from '../ButtonNextBack/ButtonNextBack'
import TextFieldV2 from '../../../TextFieldV2'
import Button from '../../../Button'
import { HiOutlineTrash, HiPlus, HiX } from 'react-icons/hi'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { stateLevel } from '../../../../common/constants'
import Selected from '../../../Select'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../../../store'

interface Props {
  handleBack: () => void
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const schema = yup.object().shape({
  languages: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      language: yup.string().required('Language is required'),
      level: yup.string().required('Level is required'),
    }),
  ),
})

const SkillAndLanguage: FC<Props> = ({
  handleBack,
  activeStep,
  setActiveStep,
}): JSX.Element => {
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
  const skills = resumeData?.skills || []
  const languagesDefault = resumeData?.languages || [{ id: '', language: '', level: '' }]
  const formRef = useRef<HTMLFormElement>(null)
  const [inputSkills, setInputSkills] = useState<string>('')

  const handleChangeInputSkill = (value: any): void => {
    setInputSkills(value.target.value)
  }

  const handleDelete = (item: string) => {
    const newData = skills.filter((skill: any) => skill !== item)
    setResumeData({ ...resumeData, skills: newData })
  }

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      languages: languagesDefault,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  })

  const onSubmit = (data: any) => {
    setResumeData({ ...resumeData, languages: data.languages })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      )
    }
  }

  return (
    <div className="mt-4">
      <div>
        <h4 className="font-medium text-xl">
          Almost finished the basics! Just add a list of skills
        </h4>
        <p className="text-sm text-gray-400 mt-2">
          The skills you add should reflect the requirements of the job you're applying
          for.
        </p>
        <h6 className="text-base font-semibold mt-4 mb-2">SKills</h6>
        <div className="flex gap-4">
          <TextFieldV2
            onChange={handleChangeInputSkill}
            value={inputSkills}
            placeholder="eg. HTML/CSS"
            width="400px"
          />

          <Button
            disabled={inputSkills === ''}
            onClick={() => {
              setResumeData({ ...resumeData, skills: [...skills, inputSkills] })
              setInputSkills('')
            }}>
            <HiPlus className="text-xl mr-2" /> Add
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {skills.length > 0 &&
          skills.map((item: any, index: number) => (
            <span
              className="text-base px-4 py-2 text-white bg-blue-600 list-none rounded-full flex items-center "
              key={index}>
              {item}{' '}
              <HiX
                onClick={() => handleDelete(item)}
                className="text-lg ml-3 cursor-pointer"
              />
            </span>
          ))}
      </div>

      <div className="mt-16">
        <h4 className="font-medium text-xl">Speak multiple languages?</h4>
        <p className="text-sm text-gray-400 mt-2">
          Add your languages and levels of ability here (only if you speak more than one
          language).
        </p>
      </div>

      <div className="mt-2">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <div className="flex flex-col ">
                  <label
                    htmlFor={`languages[${index}].language`}
                    className="font-semibold text-gray-700 mb-1">
                    Language
                  </label>
                  <Controller
                    name={
                      `languages[${index}].language` as `languages.${number}.language`
                    }
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextFieldV2
                        error={error}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`languages[${index}].level`}
                    className="font-semibold text-gray-700 mb-1">
                    Level
                  </label>
                  <Controller
                    name={`languages[${index}].level` as `languages.${number}.level`}
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <Selected
                        error={error}
                        onChange={onChange}
                        value={value}
                        options={stateLevel}
                        empty="Select state"
                      />
                    )}
                  />
                </div>

                <HiOutlineTrash
                  className="text-3xl mt-9  cursor-pointer hover:text-red-500"
                  onClick={() => remove(index)}
                />
              </React.Fragment>
            ))}
          </div>
          <Button
            type="button"
            className="mt-6"
            onClick={() => append({ language: '', level: '' })}>
            <HiPlus className="text-xl mr-2" /> Add another
          </Button>
        </form>
      </div>
      <ButtonNextBack
        handleBack={handleBack}
        activeStep={activeStep}
        handleNext={handleNext}
      />
    </div>
  )
}

export default SkillAndLanguage
