// import node module libraries
import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';

// import sub components
import SectionHeading from './SectionHeading';

const Stat = () => {
	const title = 'Qaamuus Academy ';
	const description = `waxa kale  oo uu ka shaqeeyaa  la talinta, hagidda  iyo u tilmaamidda qaababka ku habboon ee qofku ku gaari karo hankiisa iyo higsigiisa,  iyada oo loo marayo dariiq aqooni ku dheehan tahay, lana adeegsanayo aaladaha casriga ah ee maanta ay dunidu ku tatalaabsatay.`;

	const counters = [
		{
			id: 1,
			title: 'tayo leh oo kaabayana  bartaha',
			value: 'Bixinta koorsooyin gaagaaban '
		},
		{
			id: 2,
			title: 'iyada oo la adeegsanayo aaladaha casriga ah.',
			value: 'Fududeynta qaabka waxbarashada'
		},
		{
			id: 3,
			title: 'oo laamo kala duwan ah',
			value: 'Bixinta diploma courses'
		},
		{
			id: 4,
			title: 'xirfada bartaha(Online – webinar - events )',
			value: 'Samaynta tababaro kaabaya '
		}
	];
	return (
		<Fragment>
			<SectionHeading title={title} description={description} />
			<Row>
				{counters.map((item, index) => {
					return (
						<Col lg={3} md={6} sm={6} xs={6} key={index}>
							{/* Counter */}
							<div className="border-top pt-4 mt-6 mb-5">
								<h1 className="display-6 fw-bold mb-0">{item.value}</h1>
								<p className="text-uppercase text-muted">{item.title}</p>
							</div>
						</Col>
					);
				})}
			</Row>
		</Fragment>
	);
};

export default Stat;
