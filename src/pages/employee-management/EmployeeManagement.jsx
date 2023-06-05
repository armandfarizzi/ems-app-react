import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import EmployeeTable from "@/features/employee/EmployeeTable";

function EmployeeManagement() {
	const { t } = useTranslation();
	return (
		<div className="grid max-h-screen grid-cols-12 gap-4">
			<div className="col-span-6 col-start-4 min-h-screen bg-gray-700 px-5">
				<div className="py-3 text-gray-200">
					{t("page.form.title")}
				</div>
				<Breadcrumb />
				<EmployeeTable />
			</div>
			<Outlet/>
		</div>
	);
}
export default EmployeeManagement;