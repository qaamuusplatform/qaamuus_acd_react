// import node module libraries
import { Fragment } from 'react';
import { Col, Row, ListGroup } from 'react-bootstrap';
import parse from 'html-react-parser';

const DescriptionTab = ({description,learn}) => {
	return (
		<Fragment>
			<div className="mb-4">
				{parse(description ?? '')}
			</div>
			{/* <h4 className="mb-3">What you’ll learn</h4> */}
			{parse(learn ?? '')}	
		</Fragment>
	);
};
export default DescriptionTab;
