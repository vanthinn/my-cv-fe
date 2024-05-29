import { FC } from 'react'
import { formatDayVN, formatToMonthYear } from '../../../../utils/functions/formatDay'
import { fonts } from '../../../../common/constants'

interface Props {
  resumeData: any
}

const BasicTemplate: FC<Props> = ({ resumeData }: Props): JSX.Element => {
  return (
    <div
      id="cv-template"
      style={{ fontFamily: resumeData.fontStyle || fonts[0].value }}
      className="bg-slate-200  flex justify-center items-center w-full flex-1">
      <main className="relative bg-white shadow-lg shadow-black/30 w-full h-auto">
        <div className="flex flex-row flex-1 h-auto items-stretch">
          <div className="w-1/3  bg-gray-800/90 flex flex-col gap-4 text-white">
            <img
              className="object-cover h-60 bg-white"
              src={resumeData.profile.avatarUrl}
            />

            <div className="flex flex-col justify-evenly flex-1 pt-8 pb-16">
              <div
                id="Reference"
                className="pl-6">
                <h1 className="uppercase pb-2 border-b-2 border-gbg-yellow-400 text-lg font-bold">
                  Information
                </h1>
                <ul className="pt-4">
                  <li>
                    <h2 className="">
                      Date of birth: {formatDayVN(resumeData.profile.dateOfBirth)}
                    </h2>
                  </li>
                </ul>
                <ul className="pt-2">
                  <li>
                    <h2 className="">Gender: {resumeData.profile.gender}</h2>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4">Phone</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">
                    {resumeData.profile.phoneNumber}
                  </div>
                </div>
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4">Email</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">{resumeData.profile.email}</div>
                </div>
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4 text-sm">Social</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">
                    {resumeData.profile.facebook || resumeData.profile.linkedin}
                  </div>
                </div>
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4">Address</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">{resumeData.profile.address}</div>
                </div>
              </div>
              <div
                id="Education"
                className="pl-6 pt-24 flex-1">
                <h1 className="uppercase pb-2 border-b-2 border-gbg-yellow-400 text-lg font-bold">
                  Education
                </h1>
                <ul className="pt-4 ">
                  <li>
                    <h1 className="uppercase font-semibold">
                      {resumeData.education.fieldOfStudy}
                    </h1>
                    <h2 className="text-sm"> {resumeData.education.schoolName}</h2>
                    <div className="flex items-center">
                      <h2 className="text-sm">
                        {formatToMonthYear(resumeData.education.startDate)}
                      </h2>
                      <span className="mx-2"> - </span>
                      <h2 className="text-sm">
                        {formatToMonthYear(resumeData.education.endDate)}
                      </h2>
                    </div>
                    <span className="text-sm">GPA: {resumeData.education.GPA}</span>
                  </li>
                </ul>
              </div>

              <div
                id="Language"
                className="pl-6 pt-24 flex-1">
                <h1 className="uppercase pb-2 border-b-2 border-gbg-yellow-400 text-lg font-bold">
                  Languages
                </h1>
                <ul className="pt-4">
                  <li className="">
                    <div className="flex flex-col">
                      {resumeData.languages.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex gap-2">
                          <span className="font-medium">{item.displayName}:</span>
                          <span>{item.level}</span>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-2/3 h-auto bg-gray-400/20 flex flex-col flex-1">
            <div className="w-full h-full">
              <ul
                style={{ backgroundColor: resumeData?.color }}
                className="bg-yellow-400 mt-12 pl-10 py-8">
                <h1 className="text-4xl">
                  <b>{resumeData?.profile.firstName}</b> {resumeData?.profile.lastName}
                </h1>
                <h2 className="text-2xl mt-2">{resumeData?.title}</h2>
              </ul>
              <section className="flex flex-col px-10 pt-8 gap-8">
                <div className="flex-col flex gap-3">
                  <h1 className="text-xl uppercase border-b-4 border-gray-400">
                    About me
                  </h1>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: resumeData.summary || '',
                    }}
                  />
                </div>
                {resumeData.experiences && resumeData.experiences.length > 0 && (
                  <>
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl uppercase border-b-4 border-gray-400">
                        Work Experience
                      </h1>
                      <div
                        id="exp_blocks"
                        className="flex flex-col gap-4">
                        {resumeData.experiences.map((data: any, index: number) => (
                          <div
                            key={index}
                            className="flex">
                            <div className="w-1/3 flex flex-col">
                              <p className="text-sm ">
                                <span className="font-medium">From:</span>{' '}
                                {formatToMonthYear(data.startDate)}
                              </p>
                              <p className="text-sm">
                                <span className="mr-5 mt-1 font-medium">To:</span>{' '}
                                {formatToMonthYear(data.endDate)}
                              </p>
                            </div>
                            <div className="w-2/3">
                              <h1 className="text-md font-semibold uppercase">
                                {data.position}
                              </h1>
                              <h2 className="text-sm font-semibold">
                                {data.company}/{data.location}
                              </h2>
                              <div
                                className="text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: data.description || '',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-col flex gap-3">
                      <h1 className="text-xl uppercase border-b-4 border-gray-400">
                        Software Skills
                      </h1>
                      <div className="flex">
                        <div className="w-1/3" />
                        <div className="w-2/3 grid grid-cols-2 text-sm  ">
                          {resumeData.skills.map((item: any, index: number) => (
                            <ul
                              key={index}
                              className="py-2 col-span-1">
                              <li>{item}</li>
                              <li className="flex w-full h-1 pr-6 mt-2">
                                <div className="w-3/4 bg-gray-500" />
                                <div className="w-1/4 bg-gray-300" />
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {resumeData.certificates && resumeData.certificates.length > 0 && (
                  <div className="flex-col flex gap-3">
                    <h1 className="text-xl uppercase border-b-4 border-gray-400">
                      Certifications
                    </h1>
                    <div className="flex">
                      {resumeData.certificates.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex  w-full">
                          <div className="w-1/3">
                            <span>{formatDayVN(item.date)}</span>
                          </div>
                          <div className="w-2/3 flex-1 ">
                            <p className="font-medium w-full flex-1">
                              {item.displayName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BasicTemplate
