import { useTranslation } from "react-i18next";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import EmployeeTable from "@/features/employee/EmployeeTable";

function EmployeeManagement() {
	const { t } = useTranslation();
	return <div className="page-form h-screen container mx-auto px-5 bg-gray-700 max-w-3xl">
		<div className="py-3 text-gray-200">
			{t("page.form.title")}
		</div>
		<Breadcrumb />
		<EmployeeTable />
	</div>;
}
export default EmployeeManagement;