import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { mdiSchoolOutline, mdiAccountGroup, mdiFinance } from '@mdi/js';
import FeatureTopIconCard from 'components/elements/common/features/FeatureTopIconCard';

export default function HomeFeaturesList() {
  const title = 'Our core values';
  const description = `Our core values are the fundamental beliefs of a person or organization geeks academy. We help
    people understand the difference between right and wrong.`;

    const features = [
      {
        id: 1,
        icon: mdiSchoolOutline,
        title: 'Bixinta Koorsooyin gaagaaban',
        description: `Khubaro iyo barayaal aqoon xeeldheer u leh maadooyinka ay dhigayaan `
      },
      {
        id: 2,
        icon: mdiAccountGroup,
        title: 'Wadashaqayn, xiriiro caalami',
        description: `Iskuxidhka bulshada iyo aqoonyahankeeda U carbinta iy fahanka shaqada suuqa`
      },
      {
        id: 3,
        icon: mdiFinance,
        title: 'Bixinta Shahaadooyin rasmi',
        description: `iskudiyaarinta imtixaanaadka caalamiga ah iyo shahaadooyinkooda .`
      }
    ];
  return (
    <div>
      <Container>
        <br/>
        <Row>
          {features.map((item, index) => {
            return (
              <Col md={4} sm={12} key={index}>
                <FeatureTopIconCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  )
}
