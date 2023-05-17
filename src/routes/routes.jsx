import { lazy, Suspense } from "react";

import Home from "@/pages/home/Home";
const Form = lazy(() => import("@/pages/form/Form"));


/** @typedef {import('react-router-dom').RouteObject RouteObject} */
/** @type {RouteObject[]} routesArray a collection of routes defined in the application */
export const routesArray = [
	{
		path: "/",
		name: "Home",
		element: <Home />,
		index: true
	}, {
		path: "/form",
		name: "Employee Management System",
		element: <Suspense fallback={<></>}>
			<Form />
		</Suspense>
	},
];