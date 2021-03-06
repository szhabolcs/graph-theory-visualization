//CONSTANTS
const MIN_ZOOM_VALUE = 50;
const MAX_ZOOM_VALUE = 300;
const STEP_TIME = 500;
const NODE_RADIUS = 40;

//MESSAGES
const STARTUP_NODE_MSG = "choose-node";
const ROOT_NODE_MSG = "choose-root";
const EDIT_MODE_ON_WARNING_MSG = "disable-edit-mode-warning";
const EMPTY_GRAPH_WARNING_MSG = "create-graph-warning";
const NO_MORE_STEPS_MSG = "no-more-steps-warning";
const NO_PREVIOUS_STEPS_MSG = "no-previous-steps-warning";
const ALGORITHM_NOT_STARTED_MSG = "algorithm-not-started-warning";
const GRAPH_ROOT_SELECTED_MSG = "graph-root-selected"
const EDGE_LIST_SORT = "edge-list-sort";
const NOT_A_NUMBER_WARNING_MSG = "nan-warning";
const NOT_ROOT_SELECTED_WARNING = "not-root-warning";

//CONSTANT STRINGS
const BINARY_TREE = "binaris";
const GENERIC_GRAPH = "altalanos";
const DIRECTED_GRAPH = "directed";
const UNDIRECTED_GRAPH = "undirected";
const MENU_ROOT = "root";
const SOURCE = "source";
const TARGET = "target";
const WEIGHT = "weight";
const EDGE_SEPARATOR = " ";
const NEW_LINE = "<br>";

//IDS
const ID_BOOLE_MATRIX = "pont-pont-matrix";
const ID_INCIDENCE_MATRIX = "pont-el-matrix";
const ID_ADJACENCY_LIST = "szomszedsagi-lista";
const ID_EDGE_LIST = "el-lista";
const ID_PARENT_ARRAY = "apa-tomb";
const ID_BRACKET_REPRESENTATION = "teljes-zarojeles-alak";
const ID_STANDARD_FORM = "standard-alak";
const ID_BINARY_FORM = "binaris-alak";
const ID_BREADTH_FIRST_SEARCH = "szelessegi-bejaras";
const ID_DEPTH_FIRST_SEARCH = "melysegi-bejaras";
const ID_DIJKSTRA = "dijkstra-algoritmus";
const ID_KRUSKAL = "kruskal-algoritmus";
const ID_PREORDER = "preorder-bejaras";
const ID_POSTORDER = "postorder-bejaras";
const ID_INORDER = "inorder-bejaras";
const ID_GET_HEIGHT = "fa-magassaga";
const ID_GET_LEAVES = "fa-levelei";
const ID_GET_DIRECT_CHILDS = "kozvetlen-leszarmazott";
const ID_GET_INDIRECT_CHILDS = "kozvetett-leszarmazott";

//CONSTANT TYPES
const TYPE_LEFT = 0;
const TYPE_RIGHT = 1;

//CONSTANT VALUES
const VALUE_NONE = '0';


//CONSTANTS FOR BINARY FORM BUILDING
const BINARY_ROOT = "1";
const BINARY_LEFT = "0";
const BINARY_RIGHT = "1";

//TABLE ROWS
const ROW_LEFT = '1';
const ROW_RIGHT = '2';

//TABLE COLUMNS
const COLUMN_BINARY_FORM = '1';

//CSS CLASS
const CLASS_HIDDEN = "hidden";

//BOOLEANS
const HIDDEN = true;

//DYNAMIC TEXT
const DT_VALUE = ".dt-value";
const DT_EMPTY = "*";
const DT_CONTENT = "dt-content";

//CONSTANT HTML
const REMOVE_BTN_HTML = "<div class='remove-btn'>" +
    "<i class='fas fa-minus-circle'></i>" +
    "</div>";
const NODE_HTML = "<div class='node'>" +
    "<div class='remove-btn'><i class='fas fa-minus-circle'></i></div>" +
    "<div class='input-group mx-auto'>" +
    "<input type='text' class='node-text text-center node-text-border'>" +
    "</div>" +
    "</div>";

const MENU_CARD = '<div class="container navbar-card my-auto">' +
    '      <div class="row">' +
    '          <div class="col-sm">' +
    '            <img src="">' +
    '          </div>' +
    '          <div class="col-sm navbar-card-text text-center my-auto">' +
    '            ' +
    '          </div>' +
    '      </div>' +
    '      <a href="" class="read-more-link"><div class="read-more"><i class="fas fa-info-circle"></i></div></a>' +
    '    </div>';

const WEIGHT_INPUT_HTML = "<div class='input-group mx-auto'>" +
    "<input type='text' value='1' class='weight-text text-center node-text-border'>" +
    "</div>";

const TABLE_SECTION = "<div class='representation-section'>" +
    "<span class='section-header'></span>" +
    "<div class='divider-line'></div>" +
    "<table class='table table-bordered'>" +
    "<tr data-i='0'><td data-j='0'>&nbsp;</td></tr>" +
    "</table>" +
    "</div>";

const DYNAMIC_TEXT_SECTION = "<div class='representation-section'>" +
    "<span class='section-header'></span>" +
    "<div class='divider-line'></div>" +
    "<div class='dt-content'></div>" +
    "</div>";

const DYNAMIC_TEXT_ELEMENT = "<span><span class='dt-value'></span><span class='dt-left hidden'>*</span><span class='dt-right hidden'>*</span></span>";