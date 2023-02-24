import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
        <label className="flex gap-x-2 items-baseline">
          <span className="text-gray-700">Search: </span>
          <input
            type="text"
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`${count} records...`}
          />
        </label>
      )
    }

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow ,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    } = useTable({
      columns,
      data,
    }, 
        useGlobalFilter
    );

  // Render the UI for your table
  return (
    <>
        <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
        />

        <table {...getTableProps()} border="1" className=" min-w-full divide-y divide-gray-200">
        <thead className='p-8 grid w-full tracking-wider bg-slate-200 text-sm font-medium uppercase sticky top-0'>
            {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >{column.render("Header")}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()} className=" bg-slate-50  border-x-2 border-y-2  border-y-gray-100 hover:text-orange-700 hover:cursor-pointer  hover:border-amber-500 hover:bg-amber-50 text-base ">
                {row.cells.map((cell) => {
                    // return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    console.log('cell', cell)
                    if ((cell.column.id == 'avatar') || (cell.column.id == 'photoURL')){
                    return <td {...cell.getCellProps()} > <img src={cell.value} className='w-10 rounded-full'/> </td>
                    } else {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    }
                })}
                </tr>
            );
            })}
        </tbody>
        </table>
    </>
  );
}

export default Table;