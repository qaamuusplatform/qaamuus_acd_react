import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { mdiSchoolOutline, mdiAccountGroup, mdiFinance } from '@mdi/js';
import FeatureTopIconCard from 'components/elements/common/features/FeatureTopIconCard';

export default function AboutUs() {
  const title = 'Our core values';
  const description = `Our core values are the fundamental beliefs of a person or organization geeks academy. We help
    people understand the difference between right and wrong.`;

  const features = [
    {
      id: 1,
      icon: mdiSchoolOutline,
      title: 'Make Education Accessible',
      description: `Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id
            blanvolutpat nunc.`
    },
    {
      id: 2,
      icon: mdiAccountGroup,
      title: 'Learn and Grow',
      description: `Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id blanvolutpat nunc.`
    },
    {
      id: 3,
      icon: mdiFinance,
      title: 'Make Education Accessible',
      description: `Quis cursus turpis in habitant sagittis amet dolor malesuada ut. Volutpat nunc id
            blanvolutpat nunc.`
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
