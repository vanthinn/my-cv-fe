import { FC } from 'react'
import { formatDayVN, formatToMonthYear } from '../../../../utils/functions/formatDay'
import { fonts } from '../../../../common/constants'

interface Props {
  resumeData: any
}

const ClassicTemplate: FC<Props> = ({ resumeData }: Props): JSX.Element => {
  return (
    <>
      <div>
        <main
          id="classic-template"
          style={{ fontFamily: resumeData.fontStyle || fonts[0].value }}
          className="font-jost hyphens-manual">
          <section className="p-3 my-auto mx-auto  bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16  print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter">
            <header className="inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
              <section className="block">
                <h1 className="mb-0 text-5xl font-bold text-gray-700">
                  {resumeData.profile.firstName + ' ' + resumeData.profile.lastName}
                </h1>
                <h2 className="m-0 mt-2 ml-2 text-2xl font-semibold text-gray-700 leading-snugish">
                  {resumeData.title}
                </h2>
                <h3 className="m-0 mt-2 ml-2 text-xl font-semibold text-gray-500 leading-snugish">
                  {resumeData.profile.address}
                </h3>
              </section>
              <section
                className="justify-between px-3 mt-0 mb-5 text-4xl font-black leading-none text-white bg-gray-700 initials-container print:bg-black"
                style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}>
                <section className="text-center initial">T</section>
                <section className="text-center initial">L</section>
                <section className="text-center initial">H</section>
              </section>
            </header>
            <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
              <section className="flex-col">
                <section className="pb-2 mt-4 mb-0 first:mt-0">
                  <section className="break-inside-avoid">
                    <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
                      <ul className="pr-7 list-inside">
                        <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                          <a
                            href={`mailto:me@${resumeData.profile.email}`}
                            className="group">
                            <span className="mr-8 text-lg font-semibold text-gray-700 leading-snugish">
                              Email:
                            </span>
                            {resumeData.profile.email}
                            <span className="inline-block font-normal text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black">
                              ↗
                            </span>
                          </a>
                        </li>
                        <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                          <a href="tel:+15109070654">
                            <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                              Phone:
                            </span>
                            {resumeData.profile.phoneNumber}
                          </a>
                        </li>
                        {resumeData.profile.facebook && (
                          <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                            <a
                              href={resumeData.profile.facebook}
                              className="group">
                              <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                                Facebook:
                              </span>
                              {resumeData.profile.facebook}
                              <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
                                ↗
                              </span>
                            </a>
                          </li>
                        )}

                        {resumeData.profile.linkedin && (
                          <li className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md">
                            <a
                              href="https://github.com/Thomashighbaugh"
                              className="group">
                              <span className="mr-5 text-lg font-semibold text-gray-700 leading-snugish">
                                Facebook:
                              </span>
                              {resumeData.profile.linkedin}
                              <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
                                ↗
                              </span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </section>
                  </section>
                </section>
                <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
                  <section className="break-inside-avoid">
                    <h2 className="mb-2 text-xl font-bold tracking-widest text-gray-700 print:font-normal">
                      SUMMARY
                    </h2>
                    <section className="mb-2 break-inside-avoid">
                      <p className="mt-2 leading-normal text-gray-700 text-md">
                        <div
                          className="text-sm break-words"
                          dangerouslySetInnerHTML={{
                            __html: resumeData.summary || '',
                          }}
                        />
                      </p>
                    </section>
                  </section>
                </section>
                <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                  <section className="break-inside-avoid mb-6">
                    <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                      EDUCATION
                    </h2>
                    <section className="mt-2 break-inside-avoid">
                      <header>
                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                          {resumeData.education.schoolName}
                        </h3>
                        <p className="leading-normal text-gray-500 text-md">
                          <span className="text-sm">
                            {formatToMonthYear(resumeData.education.startDate)}
                            <span className="mx-2"> - </span>
                            {formatToMonthYear(resumeData.education.endDate)}
                          </span>
                        </p>
                      </header>
                      <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
                        <li>
                          <span className="font-semibold text-md">Major: </span>
                          {resumeData.education.fieldOfStudy}
                        </li>
                        <li>
                          <span className="font-semibold text-md">GPA: </span>
                          {resumeData.education.GPA}
                        </li>
                      </ul>
                    </section>
                  </section>
                </section>
                <section className="pb-6 mt-2 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                  <section className="break-inside-avoid">
                    <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                      SKILLS
                    </h2>
                    <section className="mb-0 break-inside-avoid">
                      <section className="mt-1 last:pb-1">
                        <ul className="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
                          {resumeData.skills.map((item: any, index: number) => (
                            <li
                              key={index}
                              className="p-1.5 mb-1 leading-relaxed text-white bg-gray-800 mr-1.6 print:bg-white print:border-inset">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </section>
                  </section>
                </section>
                <section className="pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
                  <section className="break-inside-avoid">
                    <h2 className="mb-2 text-xl font-black tracking-widest text-gray-800 print:font-normal">
                      EXPERIENCE
                    </h2>
                    {resumeData.experiences.map((data: any, index: number) => (
                      <section
                        key={index}
                        className="mb-2 break-inside-avoid">
                        <header>
                          <h3 className="font-semibold text-gray-800 text-md leading-snugish">
                            {data.position}
                          </h3>
                          <p className="text-sm leading-normal text-gray-500">
                            <span className="text-sm ">
                              {formatToMonthYear(data.startDate)} -{' '}
                              {formatToMonthYear(data.endDate)}
                            </span>{' '}
                            {''}| Freelance
                          </p>
                        </header>
                        <div className="pl-3 mt-2 font-normal text-gray-700 text-md leading-snugish">
                          <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                              __html: data.description || '',
                            }}
                          />
                        </div>
                      </section>
                    ))}
                  </section>
                </section>

                <section className="pb-6 mt-2 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                  <section className="break-inside-avoid">
                    <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                      LANGUAGES
                    </h2>
                    <section className="mb-0 break-inside-avoid">
                      <section className="mt-1 last:pb-1">
                        <div className="flex flex-col">
                          {resumeData.languages.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex gap-2">
                              <span className="font-medium text">
                                {item.displayName}:
                              </span>
                              <span className="text">{item.level}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </section>
                  </section>
                </section>

                <section className="pb-6 mt-2 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
                  <section className="break-inside-avoid">
                    <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                      CERTIFICATIONS
                    </h2>
                    <section className="mb-0 break-inside-avoid">
                      <section className="mt-1 last:pb-1">
                        <div className="flex flex-col">
                          {resumeData.certificates.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex gap-2">
                              <span className="font-medium">
                                {formatDayVN(item.date)}:
                              </span>
                              <li className="line-clamp-2 break-words">
                                {item.displayName}
                              </li>
                            </div>
                          ))}
                        </div>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </main>
      </div>
    </>
  )
}

export default ClassicTemplate
