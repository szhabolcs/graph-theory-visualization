/**
 * This is the main script of the Graphviser application
 */

//Global variables
//JsPlumb instance
var jspNode;

//JQuery elements
var DOMContainer;
var $Document;

//Graph in memory object
var graph;

//Base and helper functions
/**
 * Deletes all instances and objects needed for graph visualization
 */
function wipeGraph() {
    delete graph;
    delete jspNode;
}

/**
 * This function initializes all instances and objects needed for graph visualization
 * @param DOMContainer the DOM element for the container in which the jsPlumb is used
 * @returns {VisualNode} object
 */
function initGraph(DOMContainer) {
    if (menuItems.graphType === BINARY_TREE) {
        graph = new BinaryTree();
        jspNode = new BinaryNode(DOMContainer);
    } else if (menuItems.graphType === GENERIC_GRAPH) {
        if (menuItems.directed === true) {
            graph = new DirectedGraph();
            jspNode = new DirectedNode(DOMContainer);
        } else {
            graph = new UndirectedGraph();
            jspNode = new UnDirectedNode(DOMContainer);
        }
    }
    jspNode.setGraph(graph);
    graph.setVisualNode(jspNode);
}


/**
 * Code executes when the Document Object Model is constructed by the browser
 */
$(document).ready(function () {

    //Declarations
    let theme;

    // Light and dark theme switch
    if (matchMedia('(prefers-color-scheme: light)').matches) {
        theme = 'light';
        $("#theme-btn > i").toggleClass("btn-on");
    } else theme = 'dark';

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

    //Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip({delay: {"show": 500}});

    //Set up the Listeners
    /**
     * Node adding
     */
    $("#node-add-btn").on("click", () => {
        jspNode.addNode();
    });

    /**
     * Remove all nodes
     */
    $("#reset-graph-btn").on("click", () => {
        graph.deleteGraph();
    });

    /**
     * Grid toggler
     */
    $("#grid-btn").click(() => {
        DOMContainer.toggleClass("grid");
        $("#grid-btn > i").toggleClass("btn-on");
    });

    /**
     * Edit mode toggler
     */
    $("#edit-btn").click(() => {
        $("#edit-btn").toggleClass("btn-on");
        $("#node-add-btn").fadeToggle(200);
        $("#reset-graph-btn").fadeToggle(200);

        jspNode.toggleEditMode();
    });

    /**
     * Representation body div toggler
     */
    $("#representation > div .fa-chevron-right").click(() => {
        $("#representation-body").toggleClass("display-none");
        $("#representation").toggleClass("dropdown-open");
        $("#representation > div .fa-chevron-right").toggleClass("fa-rotate-180");

        if(!$("#representation").hasClass("dropdown-open")){
            $("#representation").css("width","55px");
        }
        $("#left-splitter").toggleClass("display-none");
        // $("#representation-icon").toggleClass("display-none");
    });
    $("#representation").resizable({
        handleSelector: "#left-splitter",
        resizeHeight: false
    });

    /**
     * Steps body div toggler
     */
    $("#steps > span > div .fa-chevron-down").click(() => {
        $("#steps-body").toggleClass("dropdown-body-closed dropdown-steps-body-open");
        $("#steps > span > div .fa-chevron-down").toggleClass("fa-rotate-180");
        $("#steps").toggleClass("dropdown-border-radius");
        $("#steps").toggleClass("dropdown-open");
    });

    /**
     * Output body div toggler
     */
    $("#output > span > div .fa-stream").click(() => {
        $("#output-body").toggleClass("dropdown-body-closed dropdown-output-body-open");
        $("#output").toggleClass("dropdown-border-radius");
        $("#output").toggleClass("dropdown-open");
    });

    /**
     * Navbar toggler
     */
    $("#navbar-btn").click(() => {
        $(".navbar").toggleClass("navbar-open");
        $("#navbar-btn > i").toggleClass("fa-rotate-180");
        $("#navbar-content").toggleClass("navbar-content-open");
    });

    /**
     * Table section toggler
     */
    $(".section-header > i").click((e) => {
        $(e.currentTarget.parentElement.parentElement).find(".table").fadeToggle();
        $(e.currentTarget).toggleClass("fa-plus fa-minus");
    });

    /**
     * Zoom buttons listeners
     */
    $("#zoom-in").click(() => {
        if (iZoom < MAX_ZOOM_VALUE) {
            iZoom += 10;
            setZoom(iZoom / 100);
        }
    });
    $("#zoom-out").click(() => {
        if (iZoom > MIN_ZOOM_VALUE) {
            iZoom -= 10;
            setZoom(iZoom / 100);
        }
    });
    $("#zoom-reset").click(() => {
        iZoom = 100;
        setZoom(iZoom / 100);
    });
});