import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation,useParams } from "react-router-dom";
import {  } from "react-router-dom";

import { routesArray } from "@/routes/routes";

function Breadcrumb() {
	const location = useLocation();
	const params = useParams();
	const [crumbs, setCrumbs] = useState([]);
	useEffect(() => {
		const c = routesArray
			.filter(({ path }) => location.pathname.includes(path))
			.map(({ path, ...rest }) => ({
				path: Object.keys(params).length
					? Object.keys(params).reduce(
						(path, param) => path.replace(
							`:${param}`, params[param]
						), path
					)
					: path,
				...rest
			}));

		setCrumbs(() => c);
	}, [location.pathname, params]);

	return (
		<nav className="flex" aria-label="Breadcrumb">
			<ol className="inline-flex items-start space-x-1 md:space-x-3 font-medium text-gray-200">
				{
					crumbs.map(({path, name}) => {
						return (<li key={path}>
							<Link to={path} className="inline-flex items-center hover:text-gray-600">
								{
									path == "/"
										? <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
										: <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> }
								<span>{name}</span>
							</Link>
						</li>);
					})
				}
			</ol>
		</nav>
	);
}

export default Breadcrumb;