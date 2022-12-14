// import node module libraries
import { Link, withRouter } from 'react-router-dom';
import { Badge, Card, Col, Row, Table } from 'react-bootstrap';

// import custom components
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext, useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import StatTopIcon from 'components/marketing/common/stats/StatTopIcon';

const ReferralData = (props) => {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);

	return (
		<ProfileLayout>
			<Card className="mb-4 pb-1">
				<Card.Header className="border-0 ">
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Earnings</h3>
						<p className="mb-0">
							You have full control to manage your own account setting.
						</p>
					</div>
				</Card.Header>
			
			</Card>
		
			<Row>
				<Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
					<StatTopIcon
						title="Earning this month"
						value="$3,210"
						iconName="folder"
						colorVariant="primary"
						progress={65}
					/>
				</Col>
				<Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
					<StatTopIcon
						title="Account Balance"
						value="$3,800"
						iconName="shopping-bag"
						colorVariant="danger"
						progress={65}
					/>
				</Col>
				<Col lg={4} md={12} sm={12}>
					<StatTopIcon
						title="Life Time Sales"
						value="$10,800"
						iconName="send"
						colorVariant="warning"
						progress={65}
					/>
				</Col>
			</Row>

			<Card className="mt-4">
				<Card.Header>
					<h3 className="mb-0 h4">Koorsoyinka For Marketing</h3>
				</Card.Header>
				<Card.Body className="p-0">
					<div className="table-responsive border-0">
						<Table className="mb-0 text-nowrap">
							<thead className="table-light">
								<tr>
									<th scope="col" className="border-0">
										COURSES
									</th>
									<th scope="col" className="border-0">
										SALES
									</th>
									<th scope="col" className="border-0">
										AMOUNT
									</th>
									<th scope="col" className="border-0"></th>
								</tr>
							</thead>
							<tbody>
								{/* {BestSellingCoursesData.map((item, index) => {
									return (
										<tr key={item.id + index}>
											<td className="align-middle border-top-0">
												<Link to="#">
													<div className="d-lg-flex align-items-center">
														<Image
															src={item.image}
															alt=""
															className="rounded img-4by3-lg"
														/>
														<h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
															{item.title}
														</h5>
													</div>
												</Link>
											</td>
											<td className="align-middle border-top-0">
												{item.sales}
											</td>
											<td className="align-middle border-top-0">
												${item.amount}{' '}
											</td>
											<td className="align-middle border-top-0">
												<ActionMenu />
											</td>
										</tr>
									);
								})} */}
							</tbody>
						</Table>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default withRouter(ReferralData);
