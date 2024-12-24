import { Table, Group, Box, Pagination } from "@mantine/core";
import { ReusableTableProps, TableData } from "../../types/generic-table-types";
import { useState } from "react";

export const ReusableTable = <T extends TableData>({
  data,
  columns,
  actions,
}: ReusableTableProps<T>) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentPageData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Table highlightOnHover striped withBorder>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor as string}>{col.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.accessor as string}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              {actions && (
                <td>
                  <Group spacing="xs">
                    {actions.map((action, actionIndex) => (
                      <Box key={actionIndex}>{action.content(row)}</Box>
                    ))}
                  </Group>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        value={page}
        onChange={setPage}
        total={totalPages}
        radius="sm"
        size="sm"
        position="center"
        mt="xl"
      />
    </div>
  );
};
