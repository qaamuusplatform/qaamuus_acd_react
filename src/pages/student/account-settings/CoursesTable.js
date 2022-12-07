// import node module libraries
import React, { Fragment, useMemo } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Image, Dropdown, Table } from 'react-bootstrap';
import { XCircle, MoreVertical } from 'react-feather';
import _const from 'services/baseUrl';
// import custom components
import GlobalFilter from 'components/elements/advance-table/GlobalFilter';
import Pagination from 'components/elements/advance-table/Pagination';
import DotBadge from 'components/elements/bootstrap/DotBadge';
import { END_POINT } from 'helper/constants';

const CoursesTable = ({ courses_data }) => {
	console.log(courses_data);
	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link
			to="#"
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</Link>
	));



	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'theCourse.title',
				Header: 'COURSES',
				Cell: ({ value, row }) => {
					console.log(value);

					return (
						<Link className="text-inherit" to="#">
							<div className="d-lg-flex align-items-center">
								<div>
									<Image
										src={END_POINT+row.original.prevImage}
										alt=""
										className="img-4by3-lg rounded"
									/>
								</div>
								<div className="ms-lg-3 mt-2 mt-lg-0">
									<h4 className="mb-1 text-primary-hover">{value}...</h4>
									<span className="text-inherit">Diiwaangalisay 
										<strong> {row.original.dateInrolled.split('T')[0]}</strong>
									</span>
								</div>
							</div>
						</Link>
					);
				}
			},
			// { accessor: 'date_added', Header: '', show: false },
			{
				accessor: 'startDate',
				Header: 'Ka-Bi',
				Cell: ({ value, row }) => {
					return (
						<div className="d-flex align-items-center">
							
							<h5 className="mb-0">{value.split('T')[0]}</h5>
						</div>
					);
				}
			},
			{
				accessor: 'endDate',
				Header: 'Ku Eg',
				Cell: ({ value, row }) => {
					return (
						<div className="d-flex align-items-center">
							
							<h5 className="mb-0">{value.split('T')[0]}</h5>
						</div>
					);
				}
			},
			{
				accessor: 'status',
				Header: 'STATUS',

				Cell: ({ value, row }) => {
					return (
						<Fragment>
							<DotBadge
								bg={
									value ? 'warning' :  'success'
								}
							></DotBadge>
							{/* {value.charAt(0).toUpperCase() + value.slice(1)} */}
						</Fragment>
					);
				}
			},
			{
				accessor: 'stayedSeconds',
				Header: 'ACTION',
				Cell: ({ value }) => {
					if (value === "2") {
						return (
							<Fragment>
								<Button
									href="#"
									variant="outline"
									className="btn-outline-white btn-sm"
								>
									Reject
								</Button>{' '}
								<Button href="#" variant="success" className="btn-sm">
									Approved
								</Button>
							</Fragment>
						);
					}
					if (value === "0") {
						return (
							<Button href="#" variant="secondary" className="btn-sm">
								Change Status
							</Button>
						);
					}
				}
			},
			
		],
		[]
	);

	const data = useMemo(() => courses_data, [courses_data]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		state,
		gotoPage,
		pageCount,
		prepareRow,
		setGlobalFilter
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 10,
				hiddenColumns: columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
					else return false;
				})
			}
		},
		useFilters,
		useGlobalFilter,
		usePagination
	);

	const { pageIndex, globalFilter } = state;

	return (
		<Fragment>
			<div className=" overflow-hidden">
				<Row>
					<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
						<GlobalFilter
							filter={globalFilter}
							setFilter={setGlobalFilter}
							placeholder="Search Course"
						/>
					</Col>
				</Row>
			</div>

			<div className="table-responsive border-0 overflow-y-hidden">
				<Table {...getTableProps()} className="text-nowrap">
					<thead className="table-light">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

			{/* Pagination @ Footer */}
			<Pagination
				previousPage={previousPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				gotoPage={gotoPage}
				nextPage={nextPage}
			/>
		</Fragment>
	);
};

export default CoursesTable;
