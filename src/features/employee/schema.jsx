import {array, object, string} from "yup";
export const submitEmployeeSchema = array(object({
	name: string().required("field name is required"),
	email: string().email("field email should be a valid email").required("field email is required"),
	role: string().required("field role is required"),
	department_id: string().required("field department is required"),
}));