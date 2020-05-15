/**
 * This is the main script of the Graphviser application
 */

//Global variables
//JsPlumb instance
var jspNode;
//JQuery elements
var DOMContainer;
var $Document;

//Base and helper functions

/**
 * This function initializes jsPlumb, and sets up it's initial settings
 * @param DOMContainer the DOM element for the container in which the jsPlumb is used
 * @returns {jsPlumbInstance}
 */
function initJsPlumb(DOMContainer) {
    const jspNode = jsPlumb.getInstance();
    //Setting up the container for JsPlumb
    jspNode.setContainer(DOMContainer);

    return jspNode;
}

/**
 * This function adds a new node and sets it up
 * @param top position relative to the top left corner of the document
 * @param left position relative to the top left corner of the document
 */
function addNode(top = "50%", left = "50%") {     /*Inserts new node*/
    //Declarations
    //Init of the JsPlumb Instance
    let insertedBox;

    //Insertion of the box into the container
    $(NODE_HTML).hide().appendTo("#container").fadeIn(150);
    insertedBox = DOMContainer.children(".node").last();

    insertedBox.css({
        top: top,
        left: left
    });

    jspNode.draggable(insertedBox, {
        grid: [10, 10],
        containment: "container"
    });

    jspNode.addEndpoint(insertedBox, {
        isSource: true,
        anchor: [0.2, 1, -1, -1],
        connector: "Straight"
    });
    jspNode.addEndpoint(insertedBox, {
        isSource: true,
        anchor: [0.8, 1, -1, -1],
        connector: "Straight"
    });
    jspNode.addEndpoint(insertedBox, {
        isTarget: true,
        anchor: [
            [0.5, 0, 0, 0],
            [0.2, 0, 0, 0],
            [0.8, 0, 0, 0]
        ],
        endpoint: ["Rectangle", {radius: 10}],
        connector: "Straight"
    });
}

/**
 * Code executes when the Document Object Model is constructed by the browser
 */
$(document).ready(function () {

    //Declarations
    let theme;

    // Light and dark theme switch
    if(matchMedia('(prefers-color-scheme: light)').matches) {
        theme = 'light';
        $("#theme-btn > i").toggleClass("btn-on");
    }
    else theme = 'dark';

    document.documentElement.setAttribute('data-theme', theme);

    $("#theme-btn").click(function () {
        $(this).find("i").toggleClass("btn-on");

        if (theme == 'light') {
            theme = 'dark';
            document.documentElement.classList.add('color-theme-in-transition');
            document.documentElement.setAttribute('data-theme', theme);
        } else {
            theme = 'light';
            document.documentElement.classList.add('color-theme-in-transition');
            document.documentElement.setAttribute('data-theme', theme);
        }
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 1000);
    });


    //Get the DOM elements
    $Document = $(document);
    DOMContainer = $("#container");

    //init JsPlumb
    jspNode = initJsPlumb(DOMContainer);

    //Load the motion controls
    loadMotionControls();

    //Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({delay: { "show": 500}});

    //Set up the Listeners
    /**
     * Node adding listener
     */
    $(".add").click(() => addNode(DOMContainer, "40%", "30%"));

    /**
     * Grid toggler
     */
    $("#grid-btn").click( () => {
        DOMContainer.toggleClass("grid");
        $("#grid-btn > i").toggleClass("btn-on");
    });
    
    /**
     * Edit mode toggler
     */
    $("#edit-btn").click( () => {
        $("#edit-btn").toggleClass("btn-on");
        $("#node-add-btn").fadeToggle(200);
        $("#clear-all-nodes-btn").fadeToggle(200);
    });

    /**
     * Representation body div toggler
     */
    $("#representation > span > div .fa-chevron-down").click( () => {
        $("#representation-body").toggleClass("dropdown-body-closed dropdown-representation-body-open");
        $("#representation > span > div .fa-chevron-down").toggleClass("fa-rotate-180");
        $("#representation").toggleClass("dropdown-border-radius");
        $("#representation").toggleClass("dropdown-open");
    });

    /**
     * Steps body div toggler
     */
    $("#steps > span > div .fa-chevron-down").click( () => {
        $("#steps-body").toggleClass("dropdown-body-closed dropdown-steps-body-open");
        $("#steps > span > div .fa-chevron-down").toggleClass("fa-rotate-180");
        $("#steps").toggleClass("dropdown-border-radius");
        $("#steps").toggleClass("dropdown-open");
    });

    /**
     * Output body div toggler
     */
    $("#output > span > div .fa-stream").click( () => {
        $("#output-body").toggleClass("dropdown-body-closed dropdown-output-body-open");
        $("#output").toggleClass("dropdown-border-radius");
        $("#output").toggleClass("dropdown-open");
    });

    /**
     * Navbar toggler
     */
    $("#navbar-btn").click( () => {
        $(".navbar").toggleClass("navbar-open");
        $("#navbar-btn > i").toggleClass("fa-rotate-180");
        $("#navbar-content").toggleClass("navbar-content-open");
    });

    /**
     * Navbar toggler
     */
    $(".section-header > i").click( (e) => {
        $(e.currentTarget.parentElement.parentElement).find(".table").fadeToggle();
        $(e.currentTarget).toggleClass("fa-plus fa-minus");
    });

    /**
     * Zoom buttons listeners
     */
    $("#zoom-in").click(()=>{
        if (iZoom < MAX_ZOOM_VALUE){
            iZoom += 10;
            setZoom(iZoom / 100);
        }
    });
    $("#zoom-out").click(()=>{
        if (iZoom > MIN_ZOOM_VALUE){
            iZoom -= 10;
            setZoom(iZoom / 100);
        }
    });
    $("#zoom-reset").click(()=>{
        iZoom = 100;
        setZoom(iZoom / 100);
    });
});