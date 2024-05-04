import { FC } from 'react'
import logo from '../../../../assets/images/logo.png'

interface Props {
  resumeData: any
}

const BasicTemplate: FC<Props> = ({ resumeData }: Props): JSX.Element => {
  // const resumeData = r
  return (
    <div className="bg-slate-200  flex justify-center items-center w-full flex-1">
      <main className="relative bg-white shadow-lg shadow-black/30 w-full h-auto">
        <div className="flex flex-row flex-1 h-auto items-stretch">
          <div className="w-1/3  bg-gray-800/90 flex flex-col gap-4 text-white">
            <img
              className="object-cover h-60 bg-white"
              src={logo}
            />

            <div className="flex flex-col justify-evenly flex-1 pt-8 pb-16">
              <div
                id="Education"
                className="pt-4 pl-6 flex-1">
                <h1 className="uppercase pb-2 border-b-2 border-gbg-yellow-400 text-lg font-bold">
                  Education
                </h1>
                <ul className="pt-4 pl-2">
                  <li>
                    <h1 className="uppercase font-semibold">Enter your mayor</h1>
                    <h2 className="text-sm">Name of Your University</h2>
                    <h2 className="text-sm">2005-2009</h2>
                  </li>
                </ul>
              </div>
              <div
                id="Reference"
                className="pl-6">
                <h1 className="uppercase pb-2 border-b-2 border-gbg-yellow-400 text-lg font-bold">
                  Reference
                </h1>
                <ul className="pt-4 pl-2">
                  <li>
                    <h1 className="uppercase font-semibold">Sara Taylore</h1>
                    <h2 className="text-sm">Director | Company Name</h2>
                    <h2 className="text-sm">T: +1 234 56789</h2>
                  </li>
                </ul>
                <ul className="pt-4 pl-2">
                  <li>
                    <h1 className="uppercase font-semibold">Micke Anderson</h1>
                    <h2 className="text-sm">Webdeveloper</h2>
                    <h2 className="text-sm">T: +1 234 56789</h2>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4">Phone</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">+000 123 456 789</div>
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
                  <div className="w-3/4 pl-4 text-sm">urname@gmail.com</div>
                </div>
                <div className="flex flex-row h-6">
                  <div
                    style={{ backgroundColor: resumeData?.color }}
                    className="w-1/4 bg-yellow-400"
                  />
                  <div className="w-3/4 bg-gray-600 font-bold pl-4 text-sm">Website</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">urwebsitename.com</div>
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
                  <div className="w-3/4 pl-4 text-sm">your street address</div>
                </div>
                <div className="flex flex-row h-6">
                  <div className="w-1/4" />
                  <div className="w-3/4 pl-4 text-sm">SS sterrt City/Zip Code - 456</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 h-full bg-gray-400/20 flex flex-col">
            <div className="w-full">
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
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-xl uppercase border-b-4 border-gray-400">
                    Work Experience
                  </h1>
                  <div
                    id="exp_blocks"
                    className="flex flex-col gap-4">
                    <div className="flex">
                      <div className="w-1/3">
                        <p>2012-2014</p>
                      </div>
                      <div className="w-2/3">
                        <h1 className="text-md font-semibold uppercase">job position</h1>
                        <h2 className="text-sm font-semibold">
                          Company Name/ California USA
                        </h2>
                        <p className="text-sm pt-3">
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et dolore magna
                          aliquyam erat, sed diam voluptua.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3">
                        <p>2012-2014</p>
                      </div>
                      <div className="w-2/3">
                        <h1 className="text-md font-semibold uppercase">job position</h1>
                        <h2 className="text-sm font-semibold">
                          Company Name/ California USA
                        </h2>
                        <p className="text-sm pt-3">
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et dolore magna
                          aliquyam erat, sed diam voluptua.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/3">
                        <p>2012-2014</p>
                      </div>
                      <div className="w-2/3">
                        <h1 className="text-md font-semibold uppercase">job position</h1>
                        <h2 className="text-sm font-semibold">
                          Company Name/ California USA
                        </h2>
                        <p className="text-sm pt-3">
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et dolore magna
                          aliquyam erat, sed diam voluptua.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col flex gap-3">
                  <h1 className="text-xl uppercase border-b-4 border-gray-400">
                    Software Skills
                  </h1>
                  <div className="flex">
                    <div className="w-1/3" />
                    <div className="flex flex-row w-2/3 text-sm">
                      <div className="w-1/2">
                        <ul className="py-2">
                          <li>Adobe Photoshop</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                        <ul className="py-2">
                          <li>Adobe Illustrator</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                        <ul className="py-2">
                          <li>Adobe Indesign</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                      </div>
                      <div className="w-1/2">
                        <ul className="py-2">
                          <li>Microsoft Word</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                        <ul className="py-2">
                          <li>Microsoft Powerpoint</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                        <ul className="py-2">
                          <li>HTML/CSS</li>
                          <li className="flex w-full h-1 pr-6 mt-2">
                            <div className="w-3/4 bg-gray-500" />
                            <div className="w-1/4 bg-gray-300" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BasicTemplate
