import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import { fetchEmployeeReview, getEmployeeReviewById, getEmployeeReviewLoadingById } from './employeeSlice';

function CommentBox({data}) {
	if (!data) {
		return <div>Empty..</div>;
	}
	return (
		<div>
			{data.map((c) => {
				return (
					<div key={c.id} className='p-3'>
						<div>
							<p className='font-bold capitalize'>
								{c.comment}
							</p>
							<p className='font-light capitalize'>
								{format(c.created_at, "en_US")}
							</p>
						</div>
						<div className="divider my-1" />
					</div>
				);
			})}
		</div>
	);
}


function EmployeeExpandCell({row}) {
	const dispatch = useDispatch();
	const userId = row.getValue("id");
	const name = row.getValue("name");
	const isLoading = useSelector(getEmployeeReviewLoadingById(userId));
	const reviews = useSelector(getEmployeeReviewById(userId)) || [];

	useEffect(()=> {
		dispatch(fetchEmployeeReview(userId));
	}, []);
	if (isLoading) {
		return <tr>
			<td colSpan={4}>
				<div>loading...</div>
			</td>
		</tr>;
	}
    
	return (
		<tr>
			<td colSpan={4}>
				<div className='flex justify-between'>
					<p className='px-3 text-lg'>
						<Link to={userId} className='text-slate-200 hover:underline hover:underline-offset-4'>{name}</Link> has {reviews.length} {pluralize('comment', reviews.length)}
					</p>
				</div>
				<CommentBox data={reviews} />
			</td>
		</tr>
	);
}

CommentBox.propTypes = {
	data: PropTypes.array
};
EmployeeExpandCell.propTypes = {
	row: PropTypes.object
};
export default EmployeeExpandCell;