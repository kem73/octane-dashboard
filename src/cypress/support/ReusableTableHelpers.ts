
export const checkColumnHeaders = (columns: Array<{ header: string }>) => {
    columns.forEach((col, index) => {
      cy.get('th').eq(index).should('contain.text', col.header);
    });
  };
  
  export const checkTableRows = (data: any[], columns: Array<{ accessor: string }>, rowsToCheck: number = 5) => {
    cy.get('tbody tr').should('have.length', rowsToCheck);
    data.slice(0, rowsToCheck).forEach((row, rowIndex) => {
      columns.forEach((col, colIndex) => {
        cy.get('tbody tr').eq(rowIndex).find('td').eq(colIndex).should('contain.text', row[col.accessor]);
      });
    });
  };
  
  export const checkPagination = (data: any[], itemsPerPage: number = 5) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    cy.get('.mantine-Pagination-next').should('be.visible');
    cy.get('.mantine-Pagination-prev').should('be.visible');
  
    cy.get('tbody tr').should('have.length', itemsPerPage);
  
    cy.get('.mantine-Pagination-next').click();
    const nextPageStartIndex = itemsPerPage;
    cy.get('tbody tr').eq(0).find('td').eq(0).should('contain.text', data[nextPageStartIndex].id);
  
    cy.get('.mantine-Pagination-next').click();
    cy.get('.mantine-Pagination-item[aria-current="true"]').should('have.text', totalPages.toString());
  };
  
  export const checkActionsColumn = (actions: any[], rows: number) => {
    cy.get('th').contains('Actions').should('be.visible');
  
    cy.get('button').should('have.length', actions.length * rows);
    actions.forEach((action, index) => {
      cy.get('button').eq(index).should('contain.text', `Delete ${action.row.id}`); 
    });
  };
  