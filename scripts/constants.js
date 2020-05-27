//CONSTANTS
const MIN_ZOOM_VALUE = 50;
const MAX_ZOOM_VALUE = 300;

//CONSTANT STRINGS
const BINARY_TREE = "binaris";
const GENERIC_GRAPH = "altalanos";
const DIRECTED_GRAPH = "directed";
const UNDIRECTED_GRAPH = "undirected";
const MENU_ROOT = "root";

//CONSTANT HTML
const REMOVE_BTN_HTML = "<div class='remove-btn'>" +
                            "<i class='fas fa-minus-circle'></i>" +
                        "</div>";
const NODE_HTML = "<div class='node'>"+
                        "<div class='remove-btn'><i class='fas fa-minus-circle'></i></div>"+
                        "<div class='input-group mx-auto'>"+
                            "<input type='text' class='node-text text-center node-text-border'>"+
                        "</div>"+
                   "</div>";

const MENU_CARD = '<div class="container navbar-card my-auto">'+
    '      <div class="row">'+
    '          <div class="col-sm">'+
    '            <img src="">'+
    '          </div>'+
    '          <div class="col-sm navbar-card-text text-center my-auto">'+
    '            '+
    '          </div>'+
    '      </div>'+
    '      <a href="" class="read-more-link"><div class="read-more"><i class="fas fa-info-circle"></i></div></a>'+
    '    </div>';
        
const TABLE_SECTION = "<div class='representation-section'>"+
                        "<span class='section-header'></span>"+
                        "<div class='divider-line'></div>"+
                        "<table class='table table-bordered'>"+
                            "<tr data-i='0'><td data-j='0'>&nbsp;</td></tr>"+
                        "</table>"+
                      "</div>"