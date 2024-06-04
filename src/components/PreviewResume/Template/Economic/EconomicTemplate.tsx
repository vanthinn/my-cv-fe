import { FC } from 'react'
import { formatDayVN, formatToMonthYear } from '../../../../utils/functions/formatDay'
import { fonts } from '../../../../common/constants'

interface Props {
  resumeData: any
}

const EconomicTemplate: FC<Props> = ({ resumeData }: Props): JSX.Element => {
  return (
    <div
      id="economic-template"
      style={{ fontFamily: resumeData.fontStyle || fonts[0].value }}
      className="flex flex-1 w-full">
      <div className="border border-slate-300 rounded-sm shadow-lg py-10 px-10 w-full">
        <header>
          <ul className="flex flex-wrap justify-end gap-2">
            <li>
              <a
                href={resumeData.profile.linkedin}
                className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                target="”_blank”">
                <svg
                  className="w-5 h-5 fill-current"
                  role="img"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path>
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                className="bg-gray-700 p-2 font-medium text-white inline-flex items-center space-x-2 rounded"
                target="”_blank”">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-5"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </a>
            </li>
          </ul>
          <div className="flex justify-between items-center">
            <div>
              <div
                className="bg-cover bg-no-repeat rounded-full h-52 w-52"
                style={{ backgroundImage: `url(${resumeData.profile.avatarUrl})` }}></div>
            </div>
            <div className="grid justify-items-end ml-4">
              <h1 className="text-6xl font-extrabold">
                {resumeData.profile.firstName + ' ' + resumeData.profile.lastName}
              </h1>
              <p className="text-xl mt-5">{resumeData.title}</p>
            </div>
          </div>
        </header>
        <main className="flex gap-x-10 mt-10">
          <div className="w-2/6">
            <strong className="text-xl font-medium">Contact Details</strong>
            <ul className="mt-2 mb-10">
              <li className="px-2 mt-1">
                <strong className="mr-1">Phone </strong>
                <a
                  href="tel:+821023456789"
                  className="block">
                  {resumeData.profile.phoneNumber}
                </a>
              </li>
              <li className="px-2 mt-1">
                <strong className="mr-1">E-mail </strong>
                <a
                  href="mailto:"
                  className="block">
                  {resumeData.profile.email}
                </a>
              </li>
              <li className="px-2 mt-1">
                <strong className="mr-1">Location</strong>
                <span className="block">{resumeData.profile.address}</span>
              </li>
            </ul>
            <strong className="text-xl font-medium ">Github Stats</strong>
            <ul className="flex w-full mt-2 mb-10">
              <li className="px-2 mt-2 w-4/12 bg-pink-600 text-white text-center rounded-tl-lg rounded-bl-lg">
                HTML
              </li>
              <li className="px-2 mt-2 w-4/12 bg-blue-600 text-white text-center">CSS</li>
              <li className="px-2 mt-2 w-5/12 bg-yellow-500 text-white text-center rounded-tr-lg rounded-br-lg">
                JS
              </li>
            </ul>
            {resumeData.skills && resumeData.skills.length > 0 && (
              <>
                <strong className="text-xl font-medium">Skills</strong>
                <ul className="mt-2 mb-10">
                  {resumeData.skills.map((sk: any, index: number) => (
                    <li
                      key={index}
                      className="px-2 mt-1">
                      {sk}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {resumeData.languages && resumeData.languages.length > 0 && (
              <>
                <strong className="text-xl font-medium">Languages</strong>
                <ul className="mt-2 mb-10">
                  {resumeData.languages.map((lang: any, index: number) => (
                    <div
                      key={index}
                      className="px-2 flex gap-2">
                      <span className="font-medium ">{lang.displayName}:</span>
                      <span className="">{lang.level}</span>
                    </div>
                  ))}
                </ul>
              </>
            )}

            {resumeData.certificates && resumeData.certificates.length > 0 && (
              <>
                <strong className="text-xl font-medium">Certificates</strong>
                <ul className="mt-2 mb-10 px-2">
                  {resumeData.certificates.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-2">
                      <span className="font-medium text-sm">
                        {formatDayVN(item.date)}:
                      </span>
                      <li className="line-clamp-2 break-words text-sm">
                        {item.displayName}
                      </li>
                    </div>
                  ))}
                </ul>
              </>
            )}

            {resumeData.interests && resumeData.interests.length > 0 && (
              <>
                <strong className="text-xl font-medium">Interests &amp; Hobbies</strong>
                <ul className="mt-2">
                  <li className="px-2 mt-1 line-clamp-3 break-words">
                    {resumeData.interests.join(', ')}
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="w-4/6">
            <section>
              <h2 className="text-2xl pb-1 border-b font-semibold">About</h2>
              <p className="mt-4 text-xs">
                <div
                  dangerouslySetInnerHTML={{
                    __html: resumeData.summary || '',
                  }}
                />
              </p>
            </section>
            {/* <section>
              <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Projects</h2>
              <ul className="mt-1">
                <li className="py-2">
                  <div className="flex justify-between my-1">
                    <strong>Rules of 10000 hours</strong>
                    <p className="flex">
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        HTML
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        CSS
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        JS
                      </span>
                    </p>
                  </div>
                  <ul className="flex mb-2">
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Live
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Code
                      </a>
                    </li>
                  </ul>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                    delectus labore enim in minus quod vero dignissimos et, ratione
                    obcaecati quis maiores? Voluptatem, natus cupiditate perferendis omnis
                    ex hic incidunt! Earum dolore cupiditate sed et maxime distinctio iure
                    fugiat aspernatur at veniam laudantium eveniet corporis dicta
                    reiciendis quod consequatur, labore perferendis dolorum velit
                    quibusdam minus iste dolorem! Officiis, obcaecati maxime
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex justify-between my-1">
                    <strong>Vending Machine</strong>
                    <p className="flex">
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        HTML
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        CSS
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        JS
                      </span>
                    </p>
                  </div>
                  <ul className="flex mb-2">
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Live
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Code
                      </a>
                    </li>
                  </ul>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                    expedita illum optio porro suscipit rerum labore veritatis autem eum
                    totam veniam repudiandae repellendus perspiciatis eligendi sequi
                    maiores, cum ipsa ut! Dolorum aliquid quaerat, dolore nemo, vero alias
                    non porro quam totam impedit repellat voluptas, nobis harum quae
                    dolorem accusantium consequatur. Recusandae cupiditate possimus natus
                    consequuntur aliquid, molestias provident saepe nobis.
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex justify-between my-1">
                    <strong>Landing Page</strong>
                    <p className="flex">
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        HTML
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        CSS
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        React
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        Node.js
                      </span>
                    </p>
                  </div>
                  <ul className="flex mb-2">
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Live
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Code
                      </a>
                    </li>
                  </ul>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, odio
                    autem non possimus adipisci, sed sequi culpa ipsa necessitatibus
                    repellat rerum. Obcaecati nobis modi voluptate nam minus praesentium
                    soluta voluptatibus! Minima temporibus deserunt laborum, expedita ad
                    molestiae perferendis? Ipsa aut, necessitatibus expedita rem iure
                    minus sit voluptates magni, sequi eum architecto excepturi tempora
                    dolorum soluta quam odit amet nobis incidunt.
                  </p>
                </li>
                <li className="py-2">
                  <div className="flex justify-between my-1">
                    <strong>Gamgyul Market</strong>
                    <p className="flex">
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        HTML
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        CSS
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        React
                      </span>
                      <span className="bg-gray-600 text-white px-2 py-1 ml-1 text-xs rounded">
                        Node.js
                      </span>
                    </p>
                  </div>
                  <ul className="flex mb-2">
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Live
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="bg-blue-600 text-white px-2 py-1 mr-1 text-sm rounded">
                        Code
                      </a>
                    </li>
                  </ul>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
                    suscipit soluta at doloremque ipsa unde, doloribus beatae delectus
                    odio dolorum consequatur libero esse ratione nostrum nihil quaerat
                    alias cupiditate assumenda? Nesciunt unde aliquid quam quisquam
                    excepturi deserunt ipsa doloremque culpa itaque. Esse consectetur odit
                    est laboriosam facilis! Accusamus inventore vel magni sed aliquid!
                    Aspernatur dolores, nam id fugit ad aliquam.
                  </p>
                </li>
              </ul>
            </section> */}
            <section>
              {/* education */}
              <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Education</h2>
              <ul className="mt-2">
                <li className="pt-2">
                  <p className="flex flex-col   text-sm">
                    <strong className="text-base">
                      {resumeData.education.schoolName}
                    </strong>
                    <span className="text-sm my-1">
                      {formatToMonthYear(resumeData.education.startDate)}
                      <span className="mx-2"> - </span>
                      {formatToMonthYear(resumeData.education.endDate)}
                    </span>
                  </p>
                  <p className="flex justify-between text-sm">
                    {resumeData.education.fieldOfStudy}
                    <small>GPA {resumeData.education.GPA}</small>
                  </p>
                </li>
              </ul>
            </section>
            {resumeData.experiences && resumeData.experiences.length > 0 && (
              <section>
                <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">
                  Work Experiences
                </h2>
                <ul className="mt-2">
                  {resumeData.experiences.map((data: any, index: number) => (
                    <li
                      key={index}
                      className="pt-2">
                      <p className="flex justify-between text-sm">
                        <strong className="text-base">{data.company}</strong>
                        <p className="">
                          {formatToMonthYear(data.startDate)} -{' '}
                          {formatToMonthYear(data.endDate)}
                        </p>
                      </p>
                      <p className="flex justify-between text-base">
                        {data.position}
                        <small>{data.location}</small>
                      </p>
                      <p className="text-justify text-xs">
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: data.description || '',
                          }}
                        />
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default EconomicTemplate
