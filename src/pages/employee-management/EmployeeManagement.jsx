import { useTranslation } from "react-i18next";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import EmployeeTable from "@/features/employee/EmployeeTable";

function EmployeeManagement() {
	const { t } = useTranslation();
	return <div className="container mx-auto min-h-screen max-w-3xl bg-gray-700 px-5">
		<div className="py-3 text-gray-200">
			{t("page.form.title")}
		</div>
		<Breadcrumb />
		<EmployeeTable />
	</div>;
}
export default EmployeeManagement;