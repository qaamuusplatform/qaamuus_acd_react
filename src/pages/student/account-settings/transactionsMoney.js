// import node module libraries
import UpcomingDeadlinesData from 'data/UpcomingDeadlinesData';
import { useContext } from 'react';
import { Card, Table, ProgressBar, Image, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShimmerCategoryItem, ShimmerPostItem, ShimmerTitle } from 'react-shimmer-effects';
import { httpFetcher } from 'services/coursesService';
import { CurrentUserContext } from 'services/currentUserContext';
import useSWR from 'swr';

// import data files
const TransactionsMoney = () => {
	const { currentUser, setCurrentUser, userIsLoading } = useContext(CurrentUserContext);
	const { data: transactionsData, error } = useSWR(`/api/thisUserReferralTransaction-list/${currentUser.id}/`, httpFetcher);
	return (
		<Card>
			<Card.Header>
				<h4 className="mb-0">Dhaqdhaqayada Iibyada</h4>
			</Card.Header>

			{/* table */}
			<div className="table-responsive overflow-y-hidden">
				<Table className="table mb-0 text-nowrap">
					<thead className="table-light">
						<tr>
							<th scope="col" className="border-top-0">
								Koorsada
							</th>
							<th scope="col" className="border-top-0 ">
								Shaqsiga
							</th>
							<th scope="col" className="border-top-0 ">
								Waqtiga{' '}
							</th>
							<th scope="col" className="border-top-0 ">
								Done
							</th>
						</tr>
					</thead>
					<tbody>
						{(!transactionsData && !error) || userIsLoading
							? [1, 2, 3].map((idx) => (
								<div style={{ width: '100%' }} >

									<ShimmerTitle className='container' line={1} variant="secondary" />
								</div>
							))
							: transactionsData.length == 0 ? (<center className='m-2 w-100 text-center'>Majiraan Wax ref oo kuu diiwaangashan</center>) : (transactionsData.map((item, index) => {
								return (
									<tr key={index}>
										<td className="align-middle">
											<div className="d-flex align-items-center">
												<div className="avatar avatar-md">
													<Image
														src={item.theInrollement.theCourse.coverImage}
														alt=""
														className="rounded"
													/>
												</div>
												<div className="ms-2">
													<Link to={`/course/${item.theInrollement.theCourse.slug}/`} ><h5 className="mb-0">{item.theInrollement.theCourse.title.substring(0, 35)}</h5></Link>

													<h5 className="mb-0 fw-normal fs-6 align-middle ">{item.theInrollement.theCourse.simDesc.substring(0, 35)}...</h5>

												</div>
											</div>
										</td>
										<td className="align-middle">
											<div className="d-flex align-items-center">
												<div className="avatar avatar-sm">
													<Image
														src={
															item.theInrollement.theUser.profileImage
																? item.theInrollement.theUser.profileImage
																: `https://ui-avatars.com/api/?name=${item.theInrollement.theUser.fullName}&background=19a9c4&color=fff`
														}
														alt=""
														className="rounded-circle"
													/>
												</div>
												<div className="ms-2">
													<h5 className="mb-0">{item.theInrollement.theUser.fullName.substring(0, 35)}</h5>
													<h5 className="mb-0 fw-normal fs-6 align-middle ">{item.theInrollement.theUser.userTitle?.substring(0, 35)}...</h5>

												</div>
											</div>
										</td>
										<td className="align-middle ">{item.datetime.split('T')[0]}</td>
										<td className="align-middle ">
											<div className="d-flex align-items-center">
												<ProgressBar
													className="flex-auto"
													style={{ height: '6px' }}
												>
													<ProgressBar variant="success" now='100' />
												</ProgressBar>

											</div>
										</td>
									</tr>
								);
							})

							)}

					</tbody>
				</Table>
			</div>
		</Card>
	);
};
export default TransactionsMoney;
