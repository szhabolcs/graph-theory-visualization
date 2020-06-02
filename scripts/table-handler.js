/**
 * DOM Table Handler model
 * This class's responsibility is to ensure manipulating
 * the DOM Table with data from generic graph models.
 */
class TableHandler {
    //Variables
    DOMTable;
    numberOfRows = 0;
    numberOfColumns = 0;

    constructor(sectionId, sectionName) {
        this.sectionId = sectionId;
        this.addSectionToDOM(sectionId, sectionName);
        this.DOMTable = $("#" + sectionId + "> table tbody");
    }


    //Base operations
    /**
     * Removes an element from the table
     * At this point we manage the table as a crossword table
     * @param i
     * @param j
     */
    removeElement(i, j) {
        this.DOMTable.children("tr[data-i=" + i + "]").children("td[data-j=" + j + "]").remove();
    }

    /**
     * Pushes a single element to a row
     * At this point we manage the table as a crossword table
     * @param {string} i Id of the row to add to
     * @param {string} j Id of the column
     * @param {string} value Value of the column header
     */
    pushElementToRow(i, j, value) {
        this.DOMTable.children("tr[data-i='" + i + "']").append("<td data-j=" + j + ">0</td>");
        this.updateTable(i, j, value);
        this.numberOfColumns++;
    }

    /**
     * Pushes a column to the table with automatic indexing
     * @param {string} j Id of the column
     */
    pushColumn(j) {
        this.addColumn(j, (this.numberOfColumns + 1).toString());
    }

    /**
     * Pushes a row to the table with automatic indexing
     * @param {string} i Id of the row
     */
    pushRow(i) {
        this.addRow(i, (this.numberOfRows + 1).toString());
    }

    /**
     * Adds a row to the DOM table
     * @param {string} i Id of the row
     * @param {string} value Value of the row header
     */
    addRow(i, value) {
        let firstRow = this.DOMTable.children("tr").first().children().clone();
        firstRow.each((td) => {
            $(firstRow[td]).text("0");
        });
        this.DOMTable.append("<tr data-i=" + i + "></tr>");
        this.DOMTable.children("tr[data-i=" + i + "]").append(firstRow);
        this.updateTable(i, 0, value);
        this.numberOfRows++;
    }

    /**
     * Adds a column to the DOM table
     * @param {string} j Id of the column
     * @param {string} value Value of the column header
     */
    addColumn(j, value) {
        this.DOMTable.children("tr").append("<td data-j=" + j + ">0</td>");
        this.updateTable(0, j, value);
        this.numberOfColumns++;
    }

    /**
     * Removes a row from the DOM table
     * @param {string} i Id of the row
     */
    removeRow(i) {
        this.DOMTable.children("tr[data-i=" + i + "]").remove();
        this.numberOfRows--;
    }

    /**
     * Removes a column from the DOM table
     * @param {string} j Id of the column
     */
    removeColumn(j) {
        this.DOMTable.find("td[data-j=" + j + "]").remove();
        this.numberOfColumns--;
    }

    /**
     * Updates a specific value in the table
     * @param {string} i Number of the row
     * @param {string} j Number of the column
     * @param {string} value Value to be set
     */
    updateTable(i, j, value) {
        this.DOMTable.find("tr[data-i=" + i + "]" + ">" + "td[data-j=" + j + "]").text(value);
    }

    /**
     * Deletes the table from the DOM
     */
    drop() {
        $("#" + this.sectionId).remove();
    }

    /**
     * Adds a DOM section container for the table
     * @param {string} id The id of the inserted section
     * @param {string} name The name of the section
     */
    addSectionToDOM(id, name) {
        let sectionHTML = $(TABLE_SECTION);

        sectionHTML.attr("id", id);
        sectionHTML.children(".section-header").append(name + " <i class='fas fa-plus'></i>");
        sectionHTML.find(".section-header > i").click((e) => {
            $(e.currentTarget.parentElement.parentElement).find(".table").fadeToggle();
            $(e.currentTarget).toggleClass("fa-plus fa-minus");
        });

        $("#representation-body").append(sectionHTML);
    }
}