/**
 * DOM Dynamic Text Handler model
 * This class's responsibility is to ensure manipulating
 * the DOM section with dynamic text data from generic graph models.
 */
class DynamicTextHandler {
    //Variables

    DOMContainer;
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
        let sectionHTML = $(DYNAMIC_TEXT_SECTION);

        sectionHTML.attr("id", id);
        sectionHTML.children(".section-header").append(name + " <i class='fas fa-plus'></i>");
        sectionHTML.find(".section-header > i").click((e) => {
            $(e.currentTarget.parentElement.parentElement).find(".dt-content").fadeToggle();
            $(e.currentTarget).toggleClass("fa-plus fa-minus");
        });

        $("#representation-body").append(sectionHTML);
    }

    /**
     * This function inserts a new element to the dynamic text section
     * @param id {string} The id of the new element to be inserted
     * @param value {string} The text value of the new element to be inserted
     * @param parentId {string} The id of the parent element where the insertion will occur
     */
    insert(id, value, parentId = DT_CONTENT) {
        let $element = $(DYNAMIC_TEXT_ELEMENT);
        $element.find(DT_VALUE).text(value);
        $element.addClass(id);
        $("." + parentId).append($element);
    }


    /**
     * Moves a dynamic text element to another position
     * @param id {string} The id of the element to be moved
     * @param parentId {string} The id of the parent element where the given element will be moved
     * @param position {int} The position of the element
     */
    moveElement(id, parentId, position) {
        let $element = $("." + id);
        let $targetElement, $parentElement;
        $parentElement = $element.parent();
        if (!$parentElement.hasClass(DT_CONTENT))
            this.setEmptyValue($parentElement);
        $element.detach();
        if (position === TYPE_LEFT)
            $targetElement = $("." + parentId + " > .dt-left");
        else if (position === TYPE_RIGHT)
            $targetElement = $("." + parentId + " > .dt-right");

        $targetElement.html($element);
        this.showChildren(parentId);

    }

    /**
     * Moves a given element to the root
     * @param id {string} The id of the given element
     */
    moveToRoot(id) {
        let $element = $("." + id);
        let $targetElement, $parentElement;
        $parentElement = $element.parent();
        if (!$parentElement.hasClass(DT_CONTENT))
            this.setEmptyValue($parentElement);
        $targetElement = $('.' + DT_CONTENT);
        $element.detach();
        $targetElement.append($element);

    }

    /**
     * Deletes a given element from the DOM
     * @param id {string} The id of the element to be deleted
     */
    delete(id) {
        let $element = $("." + id);
        $element.detach();
    }

    /**
     * Updates the value of a given element
     * @param id {string} The id of the element to be updated
     * @param value {string} The new value of the element
     */
    updateValue(id, value) {
        let $element = $("." + id + " > .dt-value");
        $element.text(value);
    }

    //Helper functions

    /**
     * Sets the empty value ('*') to a given element
     * @param $element {Object} The JQuery element to be set
     */
    setEmptyValue($element) {
        $element.text(DT_EMPTY);
    }

    /**
     * Shows the brackets and the child elements of a given element
     * @param id {string} The id of the element
     */
    showChildren(id) {
        let $leftChild = $('.' + id + '> .dt-left');
        let $rightChild = $('.' + id + '> .dt-right');
        $leftChild.removeClass('hidden');
        $rightChild.removeClass('hidden');
    }

    /**
     * Hides the brackets and the child elements of a given element
     * @param id {string} The id of the element
     */
    hideChildren(id) {
        let $leftChild = $('.' + id + '> .dt-left');
        let $rightChild = $('.' + id + '> .dt-right');
        $leftChild.addClass('hidden');
        $rightChild.addClass('hidden');
    }


}