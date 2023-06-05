import { defaults, mande } from "mande";
defaults.headers = {
	"Content-Type": "application/json"
};

const API_HOST = import.meta.env.VITE_API_HOST;

export const postSubmitAddEmployee = async (body) => {
	return await mande(`${API_HOST}/employees/bulk`).post(body);
};

export const getEmployeeList = () => {
	return mande(`${API_HOST}/employees`).get();
};

export const getEmployeeReviews = (employeeId) => {
	return mande(`${API_HOST}/reviews`).get({query: {"employee_id": employeeId}});
};

export const getDepartment = () => {
	return mande(`${API_HOST}/department`).get();
};