import { useTranslation } from "react-i18next";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { DataTable } from "@/components/Table/DataTable";

import { columns } from "./columns";
function Form() {
	const { t } = useTranslation();

	return <div className="page-form h-screen container mx-auto px-5 bg-gray-700 max-w-3xl">
		<div className="py-3 text-gray-200">
			{t("page.form.title")}
		</div>
		<Breadcrumb />
		<DataTable columns={columns} data={[{ id:"abcd", name:"armand", email:"armandfarizzi@gmail.com", role:"SENIOR_STAFF" }]} />
	</div>;
}

export default Form;