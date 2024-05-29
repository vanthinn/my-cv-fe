import { Box, Tab, Tabs } from '@mui/material'
import { FC, useState } from 'react'
import TabPanel from '../../components/TabPanel'
import TabAllCV from './components/TabAllCV'
import TabCVapprove from './components/TabCVApprove'
import TabCVReject from './components/TabCVReject'

interface Props {}

const EmployerCVManager: FC<Props> = (props): JSX.Element => {
  const [value, setValue] = useState(0)

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue)
  }
  return (
    <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h4 className="font-semibold text-xl">CV Management</h4>
      <div className="w-full h-full px-1 overflow-x-hidden">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab
              label="ALL CV APPLY"
              {...a11yProps(0)}
            />
            <Tab
              label="CV APPROVED"
              {...a11yProps(1)}
            />

            <Tab
              label="CV REJECT"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <TabPanel
          value={value}
          index={0}>
          <TabAllCV />
        </TabPanel>

        <TabPanel
          value={value}
          index={1}>
          <TabCVapprove />
        </TabPanel>

        <TabPanel
          value={value}
          index={2}>
          <TabCVReject />
        </TabPanel>
      </div>
    </div>
  )
}

export default EmployerCVManager
