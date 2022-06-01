import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import InfoTabContent from './InfoTabContent'
import Breadcrumbs from '@components/breadcrumbs'
import AddressCorrespondence from './AddressCorrespondence'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import PermanentAddress from './PermanentAddress'
import MembershipProfile from './MembershipProfile'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    axios.get('/account-setting/data').then(response => setData(response.data))
  }, [])
  
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Account Settings' breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      {data !== null ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralTabContent data={data.general} />
                  </TabPane>
                  <TabPane tabId='2'>
                    <PasswordTabContent />
                  </TabPane>
                  <TabPane tabId='3'>
                    <InfoTabContent data={data.info} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <AddressCorrespondence data={data.social} />
                  </TabPane>
                  <TabPane tabId='5'>
                    <PermanentAddress data={data.notification} />
                  </TabPane>
                  <TabPane tabId='6'>
                    <MembershipProfile data={data.membership} />
                  </TabPane>
                  
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
