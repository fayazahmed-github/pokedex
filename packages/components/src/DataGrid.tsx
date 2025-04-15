import { DataGrid as MuiDataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import type { FC } from 'react';

interface DataGridProps {
  rows: Array<{ id: string | number }>;
  columns: GridColDef[];
  loading?: boolean;
  onRowClick?: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  pageSize?: number;
}

export const DataGrid = ({
  rows,
  columns,
  loading,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 20
}:DataGridProps) => {
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <MuiDataGrid
        rows={paginatedRows}
        columns={columns}
        loading={loading}
        onRowClick={(params) => onRowClick?.(params.id.toString())}
        hideFooter
      />
      
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button 
          variant="contained" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>

        <Button 
          variant="contained" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};