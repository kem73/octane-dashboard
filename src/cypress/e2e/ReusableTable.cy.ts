
export {}

describe("Generic table display", () => {
    it("Table should be visible", () => {
      cy.visit("/"); 
      cy.get("table").should("be.visible");
    });
  
    it("Table should render the correct table headers", () => {
      cy.visit("/");
      const headers = [
        "user_id", 
        "username",
        "email",
        "role",
        "active",
        "Actions",
      ];
  
      headers.forEach((header, index) => {
        cy.get("table th").eq(index).should("contain.text", header);
      });
    });
  
    it("should render the correct number of rows", () => {
      cy.visit("/");
      cy.get("table tbody tr").should("have.length", 5); 
    });
  
    it("should paginate correctly", () => {
      cy.visit("/");
      cy.get(".mantine-Pagination-root button").contains("2").click(); 
      cy.get("table tbody tr").should("have.length", 3); 
    });
  
    it("should display actions column", () => {
      cy.visit("/");
      cy.get("table tbody tr")
        .first() 
        .find("td")
        .last() 
        .should("contain.text", "Action"); 
    });
  });
  