//ListPage.js
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataTable,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Button,
  Pagination
} from '@carbon/react';

import '@carbon/styles/css/styles.min.css';
import { data } from './constants/activity-data';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'type', header: 'Type' },
];

const DataTablePage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);  // Default page size to 10
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedData, setSortedData] = useState(data);

  const handleFlowButtonClick = () => {
    navigate('/flow');
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedData(filteredData);
    setCurrentPage(1); // Reset to page 1 when search query changes
  };

  const handleSort = (headerKey) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[headerKey] < b[headerKey]) return -1;
      if (a[headerKey] > b[headerKey]) return 1;
      return 0;
    });
    setSortedData(sorted);
  };

  const filteredData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalItems = sortedData.length;

  return (
    <div style={{ padding: '20px' }}>
      <h3>Activity List</h3>

      <Button
        onClick={handleFlowButtonClick}
        style={{ marginTop: '20px', padding: '10px 20px' }}
        kind="primary"
      >
        New
      </Button>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name..."
        style={{ marginTop: '20px', padding: '8px', width: '200px' }}
      />

      <DataTable
        rows={filteredData}
        headers={headers}
        render={({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader
                    key={header.key}
                    {...getHeaderProps({ header })}
                    onClick={() => handleSort(header.key)}
                  >
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      />

      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={currentPage}
        pageSize={rowsPerPage}
        pageSizes={[10, 20, 30, 40, 50]}
        size="md"
        totalItems={totalItems}
        onChange={({ page, pageSize }) => {
          setCurrentPage(page);
          setRowsPerPage(pageSize);
        }}
      />
    </div>
  );
};

export default DataTablePage;
 