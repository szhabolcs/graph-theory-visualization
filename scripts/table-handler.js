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

    /**
     *
     * @param {String} sectionId the id of the section to be created
     * @param {String} sectionName the name to be displayed at the section
     */
    constructor(sectionId, sectionName) {
        this.sectionId = sectionId;
        this.addSectionToDOM(sectionId, sectionName);
        this.DOMTable = $("#" + sectionId + "> table tbody");
    }


    //Base operations
    /**
     * Removes an element from the table
     * At this point we manage the table as a crossword table
     * @param i Id of the row
     * @param j Id of the column
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
        const lastNumber = Number.parseInt(this.DOMTable.find("tr:first > td:last").attr("data-j"));
        this.addColumn(j, (lastNumber + 1).toString());
    }

    /**
     * Pushes a row to the table with automatic indexing
     * @param {string} i Id of the row
     */
    pushRow(i) {
        const lastNumber = Number.parseInt(this.DOMTable.find("tr:last").attr("data-i"));
        this.addRow(i, (lastNumber + 1).toString());
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
     * @param {boolean} hidden Set this to HIDDEN if you want to hide the column
     */
    addColumn(j, value, hidden = false) {
        this.DOMTable.children("tr").append("<td data-j=" + j + ">0</td>");
        if (hidden === HIDDEN) {
            this.addTableClass(0, j, CLASS_HIDDEN);
        }
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
     * @param {string} i Id of the row
     * @param {string} j Id of the column
     * @param {string} value Value to be set
     */
    updateTable(i, j, value) {
        this.DOMTable.find("tr[data-i=" + i + "]" + ">" + "td[data-j=" + j + "]").text(value);
    }

    /**
     * Adds a CSS Class to a specific entry in the table
     * @param {string} i Id of the row
     * @param {string} j Id of the column
     * @param {string} cssClass CSS Class to be added
     */
    addTableClass(i, j, cssClass) {
        this.DOMTable.find("tr[data-i=" + i + "]" + ">" + "td[data-j=" + j + "]").addClass(cssClass);
    }

    /**
     * Shows a hidden column
     * @param {string} j Id of the column
     */
    showColumn(j) {
        $('td[data-j=' + j + ']').removeClass(CLASS_HIDDEN);
    }

    /**
     * Hides a hidden column
     * @param {string} j Id of the column
     */
    hideColumn(j) {
        $('td[data-j=' + j + ']').addClass(CLASS_HIDDEN);
    }

    /**
     * Removes a CSS Class from a specific entry in the table
     * @param {string} i Id of the row
     * @param {string} j Id of the column
     * @param {string} cssClass CSS Class to be removed
     */
    removeTableClass(i, j, cssClass) {
        this.DOMTable.find("tr[data-i=" + i + "]" + ">" + "td[data-j=" + j + "]").removeClass(cssClass);
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