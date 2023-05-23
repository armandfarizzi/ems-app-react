import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const EmployeeManagement = lazy(() => import("@/pages/employee-management/EmployeeManagement"));

/** @typedef {import('react-router-dom').RouteObject RouteObject} */
/** @type {RouteObject[]} routesArray a collection of routes defined in the application */
export const routesArray = [
	{
		path: "/",
		name: "Home",
		element: <Navigate to="/employee-management" replace={true} />,
		index: true
	}, {
		path: "/employee-management",
		name: "Employee Management",
		element: <Suspense fallback={<></>}>
			<EmployeeManagement />
		</Suspense>
	},
];