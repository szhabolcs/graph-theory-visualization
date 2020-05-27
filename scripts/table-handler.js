/**
 * DOM Table Handler model
 * This class's responsibility is to ensure manipulating
 * the DOM Table with data from generic graph models.
 */
class TableHandler {
    //Variables
    DOMTable;
    
    constructor(sectionId,sectionName){
        this.addSectionToDOM(sectionId,sectionName);
        this.DOMTable = $("#"+sectionId+"> table tbody");
    }
    

    //Base operations
    /**
     * Adds a row to the DOM table
     * @param {string} i Id of the row
     * @param {string} value Value of the row header
     */
    addRow(i,value){
        let firstRow = this.DOMTable.children("tr").first().children().clone();
        firstRow.each((td)=>{
            $(firstRow[td]).text("0");
        });
        this.DOMTable.append("<tr data-i="+i+"></tr>");
        this.DOMTable.children("tr[data-i="+i+"]").append(firstRow);
        this.updateTable(i,0,value);
    }

    /**
     * Adds a column to the DOM table
     * @param {string} j Id of the column
     * @param {string} value Value of the column header
     */
    addColumn(j,value){
        this.DOMTable.children("tr").append("<td data-j="+j+">0</td>");
        this.updateTable(0,j,value);
    }

    /**
     * Removes a row from the DOM table
     * @param {string} i Id of the row
     */
    removeRow(i){
        this.DOMTable.children("tr[data-i="+i+"]").remove();
    }

    /**
     * Removes a column from the DOM table
     * @param {string} j Id of the column
     */
    removeColumn(j){
        this.DOMTable.find("td[data-j="+j+"]").remove();
    }

    /**
     * Updates a specific value in the table
     * @param {string} i Number of the row
     * @param {string} j Number of the column
     * @param {string} value Value to be set
     */
    updateTable(i,j,value){
        this.DOMTable.find("tr[data-i="+i+"]"+">"+"td[data-j="+j+"]").text(value);
    }

    /**
     * Adds a DOM section container for the table
     * @param {string} id The id of the inserted section
     * @param {string} name The name of the section
     */
    addSectionToDOM(id,name){
        let sectionHTML = $(TABLE_SECTION);

        sectionHTML.attr("id",id);
        sectionHTML.children(".section-header").append(name+" <i class='fas fa-plus'></i>");
        sectionHTML.find(".section-header > i").click((e) => {
            $(e.currentTarget.parentElement.parentElement).find(".table").fadeToggle();
            $(e.currentTarget).toggleClass("fa-plus fa-minus");
        });

        $("#representation-body").append(sectionHTML);
    }
}