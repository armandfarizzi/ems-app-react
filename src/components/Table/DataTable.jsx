import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import PropType from "prop-types";
import { useEffect, useMemo,useState } from "react";

import { Table, TableBody, TableHeader } from "./Table";

export function DataTable({
	columns,
	buttonGroup,
	data,
	className,
	tabSelected,
	initialSort = [],
	isLoading,
	tabColumnFilter,
	tabs,
	...props
}) {
	const [sorting, setSorting] = useState(initialSort);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const columnTotal = useMemo(() => {
		return table.getHeaderGroups()[0].headers.length;
	}, [table]);

	useEffect(() => {
		if(!tabColumnFilter) {
			return;
		}
		table.getColumn(tabColumnFilter).setFilterValue(tabSelected);
	}, [tabSelected, tabColumnFilter, table]);

	return (
		<div className="w-full">
			<div className="flex flex-wrap items-start justify-between pb-4 pt-2">
				<div>
					<input
						placeholder="Filter emails..."
						value={(table.getColumn("email").getFilterValue()) ?? ""}
						onChange={(event) =>
							table.getColumn("email").setFilterValue(event.target.value)
						}
						className="input input-sm mb-3 max-w-sm md:mb-0"
					/>
					{buttonGroup}
				</div>
				{tabs}
			</div>
			<div className="rounded-md">
				<Table className={className} {...props}>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</th>
									);
								})}
							</tr>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? <tr><td colSpan={columnTotal}>
							<div className="flex justify-center">
								<button className="loading btn">loading</button>
							</div>
						</td></tr> :
							table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</td>
								</tr>
							)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				{/* <div className="flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div> */}
				<div className="space-x-2">
					<button
						className="btn-primary btn-sm btn"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</button>
					<button
						className="btn-primary btn-sm btn"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

DataTable.propTypes = {
	buttonGroup: PropType.element,
	columns: PropType.any,
	data: PropType.any,
	className: PropType.string,
	tabs: PropType.element,
	tabColumnFilter: PropType.string,
	tabSelected: PropType.string,
	isLoading: PropType.bool,
	initialSort: PropType.array,
};