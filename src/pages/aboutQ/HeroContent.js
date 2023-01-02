// import node module libraries
import { Col, Row } from 'react-bootstrap';

const HeroContent = () => {
	return (
		<Row>
			<Col lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mb-12">
				{/* caption */}
				<h2 className="display-4 fw-bold mb-3">
				Akaademiyadda <span className="text-primary">QAAMUUS</span>
				</h2>
				{/* para  */}
				<p className="h2 mb-3 ">
				Akaademiyadda Qaamuus: waa goob waxbarasho oo ku shaqaysa hab elektarooni ah, kuna baxaysa si fogaan dhigad ah (Elearning), taas oo loo gu talogalay,  kobcinta iyo kor u qaadista aqoonta ardayda iyo barayaasha labadaba.
				</p>
				<p className="mb-0 h4 text-body lh-lg">
				Iyo sidoo kale u carbinta iyo u diyaarinta ardayda jaamacaddaha ka qalinjebisa sidii ay u abuuran lahaayeen shaqo ama loogu heli lahaa shaqo.<br></br>
				Si taas loo gaadho wax ay akaademiyadda Qaamuus bixinaysaa casharro iyo tababarro ay fulinayaan khubaro iyo barayaal sare (Professors) kuwaas oo ka kala socda dalal ka la duwan,  aqoon xeeldheer na u leh, laamaha cilmiga ay ee ay bixinayaan. 
				</p>
			</Col>
		</Row>
	);
};
export default HeroContent;
