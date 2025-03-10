import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  DataTable,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Button,
  Pagination,
  OverflowMenu,
  OverflowMenuItem,
  Modal,
  ModalBody,
} from "@carbon/react"

import "@carbon/styles/css/styles.min.css"
import { data as initialData } from "../constants/constants"
import "../styles/dataTable.css"
import Header from "./header"

const headers = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

const DataTablePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData); // State to store data
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [markedRows, setMarkedRows] = useState([]);

  const handleFlowButtonClick = () => {
    navigate("/flow");
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const { filteredData, totalItems } = useMemo(() => {
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + rowsPerPage);

    return {
      filteredData: paginatedData,
      totalItems: filtered.length,
    };
  }, [searchQuery, statusFilter, currentPage, rowsPerPage, data]);

  const status = Array.from(new Set(data.map((item) => item.status)));

  const handleMarkAsFinal = (id) => {
    setSelectedRowId(id);
    setIsModalOpen(true);
  };

  const handleConfirmFinal = () => {
    // Update the status of the selected row to 'Final'
    const updatedData = data.map((item) =>
      item.id === selectedRowId ? { ...item, status: 'Final' } : item
    );

    // Update the state with the new data
    setData(updatedData);

    // Mark the row as final in the markedRows state
    setMarkedRows((prevRows) => [...prevRows, selectedRowId]);
    setIsModalOpen(false);
  };

  const handleCancelFinal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header
        headerTitle={"Partner Engagement Manager"}
        title={"Activity Definitions"}
      />
      <div className="data-table-container">
        <Button
          onClick={handleFlowButtonClick}
          className="new-button"
          size="sm"
          kind="primary"
        >
          New
        </Button>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="search-input"
          aria-label="Search by name"
        />

        <select
          id="filter-status"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="filter-status"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          {status.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="table-container">
          <DataTable
            rows={filteredData}
            headers={headers}
            render={({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getRowProps,
            }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader key="actions">Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {totalItems === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={headers.length + 1}
                        style={{ textAlign: "center", color: "red" }}
                      >
                        No data found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <TableRow
                        key={row.id}
                        {...getRowProps({ row })}
                        style={{
                          backgroundColor: markedRows.includes(row.id)
                            ? "#d3f9d8"
                            : "white",
                        }}
                      >
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <OverflowMenu>
                            <OverflowMenuItem
                              itemText="Mark as Final"
                              onClick={() => handleMarkAsFinal(row.id)}
                            />
                          </OverflowMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          />
        </div>

        {totalItems > 0 && (
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
        )}

        <Modal
          open={isModalOpen}
          modalLabel="Confirm Action"
          onRequestClose={handleCancelFinal}
          primaryButtonText="Final"
          secondaryButtonText="Cancel"
          onRequestSubmit={handleConfirmFinal}
        >
          <ModalBody>Are you sure you want to mark this as Final?</ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default DataTablePage;
