/**
 * DOM Dynamic Text Handler model
 * This class's responsibility is to ensure manipulating
 * the DOM section with dynamic text data from generic graph models.
 */
class DynamicTextHandler {
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