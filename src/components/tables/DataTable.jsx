import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../common/EmptyState";
import { titleCase } from "../../utils/format";

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const statusStyles = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  approved:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  completed: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  review:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  blocked: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  archived: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  inactive: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

const formatCellValue = (field, value) => {
  if (value === null || value === undefined || value === "") return "-";

  if (String(field).toLowerCase().includes("status")) {
    const status = String(value).toLowerCase();
    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyles[status] || statusStyles.archived}`}
      >
        {status}
      </span>
    );
  }

if (typeof value === "boolean") {
  return value ? (
    <span className="rounded-xl px-3 py-1 text-xs font-semibold text-brand dark:bg-brand/10">
      true
    </span>
  ) : (
    <span className="rounded-xl  px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10">
      false
    </span>
  );
}
  if (
    String(field).includes("_at") ||
    String(field).includes("date") ||
    String(field).includes("birthday")
  ) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 80);
};

export default function DataTable({
  data,
  fields,
  resourceName = "records",
  onEdit,
  onDelete,
  onBulkDelete,
  onCreate,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        enableSorting: false,
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-brand accent-brand focus:ring-brand dark:border-slate-600"
            checked={table.getIsAllPageRowsSelected()}
            ref={(input) => {
              if (input)
                input.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all rows on this page"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-brand accent-brand focus:ring-brand dark:border-slate-600"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        ),
      },
      ...fields.slice(0, 8).map((field) => ({
        accessorKey: field,
        header: titleCase(field),
        cell: ({ getValue }) => formatCellValue(field, getValue()),
      })),
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(row.original)}
              className="rounded-xl bg-brand/10 px-3 py-1 text-xs font-semibold text-brand dark:bg-brand/10"
            >
              Edit
            </button>
            <button
              onClick={() =>
                setConfirmDelete({ type: "single", rows: [row.original] })
              }
              className="rounded-xl bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [fields, onEdit],
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row, index) =>
      String(row.id ?? `${index}-${JSON.stringify(row)}`),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const selectedCount = selectedRows.length;

  const exportCsv = () => {
    const rowsToExport = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    const csv = [
      fields.map(csvEscape).join(","),
      ...rowsToExport.map((row) =>
        fields.map((field) => csvEscape(row[field])).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resourceName.toLowerCase().replaceAll(" ", "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const confirmAndDelete = async () => {
    if (!confirmDelete?.rows?.length) return;
    if (confirmDelete.type === "bulk") await onBulkDelete?.(confirmDelete.rows);
    if (confirmDelete.type === "single")
      await onDelete?.(confirmDelete.rows[0]);
    setConfirmDelete(null);
    setRowSelection({});
  };

  return (
    <>
      <div className="glass overflow-hidden rounded-3xl">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <input
            className="input max-w-md"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search records..."
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportCsv}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            {selectedCount > 0 && (
              <button
                onClick={() =>
                  setConfirmDelete({ type: "bulk", rows: selectedRows })
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]"
              >
                <Trash2 className="h-4 w-4" />
                Delete {selectedCount}
              </button>
            )}
            {onCreate && (
              <button
                onClick={onCreate}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New
              </button>
            )}
          </div>
        </div>

        {data.length === 0 ? (
          <div className="p-6">
            <EmptyState />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 text-xs uppercase text-slate-500 dark:bg-slate-900/80">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3"
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-slate-100 transition dark:border-slate-800 ${row.getIsSelected() ? "bg-brand/5 dark:bg-brand/10" : "hover:bg-slate-50/80 dark:hover:bg-slate-900/60"}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="btn-secondary disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-slate-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="btn-secondary disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Confirm delete
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Are you sure you want to delete {confirmDelete.rows.length}{" "}
                    selected record{confirmDelete.rows.length > 1 ? "s" : ""}?
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAndDelete}
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]"
              >
                <Trash2 className="h-4 w-4" />
                OK, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
