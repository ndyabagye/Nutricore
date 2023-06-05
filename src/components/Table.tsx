import React from 'react';
import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
}


export const Table: FC<TableProps> = ({ data, columns }) => {
        const { getHeaderGroups, getRowModel } = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className='bg-gray-50'>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id} className='hover:bg-gray-50'>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
    );
};

export default Table;