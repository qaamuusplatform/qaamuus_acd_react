// Section : Features
// Style : Three Columns Features Section

// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import MDI icons
import { mdiSchoolOutline, mdiAccountGroup, mdiFinance } from '@mdi/js';
import FeatureTopIconCard from 'components/elements/common/features/FeatureTopIconCard';
import SectionHeading from './SectionHeading';

// // import custom components

// // import sub components

const Features3Columns = () => {
	const title = 'Adeegyada Akaademiyadda Qaamuus';
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
			title: 'Wadashaqayn iyo xiriiro caalami',
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
		<div className="py-lg-10 py-10">
			<Container>
				<SectionHeading title={title} description={description} />
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
	);
};

export default Features3Columns;
