//Variables

let menuItems = {
    graphType: "none",
    directed: false,
    selectedAlgorithm: "none",
    root: [
        {
            text: "Általános gráfok",
            id: "altalanos",
            img: "https://via.placeholder.com/150x100.png?text=Graph+img",
            sectionId: "../#sub-content"
        },
        {
            text: "Bináris fák",
            id: "binaris",
            img: "https://via.placeholder.com/150x100.png?text=Graph+img",
            sectionId: "../#section-9"
        }
        ],

    altalanos: {
        choice:[
            {
                text: "Irányított",
                id: "directed",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-3"
            },
            {
                text: "Irányitatlan",
                id: "undirected",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-3"
            }
        ],
        children: [
            {
                text: "Szélességi bejárás",
                id: "szelessegi-bejaras",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-6-1"
            },
            {
                text: "Mélységi bejárás",
                id: "melysegi-bejaras",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-6-2"
            },
            {
                text: "Dijkstra algoritmus",
                id: "dijkstra-algoritmus",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-7-1"
            },
            {
                text: "Kruskal algoritmus",
                id: "kruskal-algoritmus",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-8-1"
            }
            ]
    },
    binaris: {
        children: [
            {
                text: "Preorder bejárás",
                id: "preorder-bejaras",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-12"
            
            },
            {
                text: "Inorder bejárás",
                id: "inorder-bejaras",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-12"
            },
            {
                text: "Postorder bejárás",
                id: "postorder-bejaras",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-12"
            },
            {   
                text: "Fa magassága",
                id: "fa-magassaga",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-9"
            },
            {
                text: "Fa levelei",
                id: "fa-levelei",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-9"
            },
            {
                text: "Közvetlen leszármazott",
                id: "kozvetlen-leszarmazott",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-9"
            },
            {
                text: "Közvetett leszármazottak",
                id: "kozvetett-leszarmazott",
                img: "https://via.placeholder.com/150x100.png?text=Graph+img",
                sectionId: "../#section-9"
            }
        ]
    }
};
let selected = MENU_ROOT;
let group = MENU_ROOT;
let container = "#start-modal-holder";

/**
 * @param {string} selected the selected group name
 * @returns {Array} the elements of the selected group
 */
function getSelectedItems(selected){
    let items = [];

    for(let i in menuItems[selected]){
        if(selected == MENU_ROOT){
            items.push(menuItems[selected][i]);
        }
        else if(selected == GENERIC_GRAPH){
            menuItems.graphType = GENERIC_GRAPH;
            for(let j in menuItems[selected]["choice"]){
                items.push(menuItems[selected]["choice"][j]);
            }
            return items;
        }
        else{
            menuItems.graphType = BINARY_TREE;
            for(let j in menuItems[selected][i]){
                items.push(menuItems[selected][i][j]);
            }
        }
    }

    if(selected == DIRECTED_GRAPH || selected == UNDIRECTED_GRAPH){
        if(selected == DIRECTED_GRAPH) menuItems.directed = true;
            else menuItems.directed = false;

        for(let i in menuItems["altalanos"]["children"]){
            items.push(menuItems["altalanos"]["children"][i]);
        }
    }

    return items;
}

/**
 * @param {string} id the id to set for the card
 * @param {string} img the imgage link to set for the card
 * @param {string} text the text to set for the card
 * @param {string} sectionId the sectioin id link to set for the card
 * @returns {string} the HTML code of the generated card
 */
function makeCard(id, img, text, sectionId){
    let menuCardAppend = $(MENU_CARD);
    
    menuCardAppend = $(menuCardAppend).attr("id",id);
    menuCardAppend = $(menuCardAppend).find("img").attr("src",img).end()[0].outerHTML;
    menuCardAppend = $(menuCardAppend).find(".navbar-card-text").text(text).end()[0].outerHTML;
    menuCardAppend = $(menuCardAppend).find(".read-more-link").attr("href",sectionId).end()[0].outerHTML;
    
    return menuCardAppend;
}

/**
 * Loads the cards into the card holder
 */
function loadCards(){
    $.when($(container).fadeOut(200)).then(() => {$(container).text("");

    let cards = getSelectedItems(selected);
    let card;

    for(let i in cards){
        card = cards[i];
        $(container).append(makeCard(card.id, card.img, card.text, card.sectionId))
    }
    
    if (!$("#start-modal").length && selected == MENU_ROOT) {
        $(".menu-back").fadeOut(200);
    }
    else{
        $(".menu-back").fadeIn(200);
    }
    
    $(container).fadeIn(200);

    $("#"+menuItems.selectedAlgorithm).addClass("selected-menu-item");
});
}


//Listeners

$("#card-holder").on("click", ".navbar-card", function(e){
    let targetCard = e.currentTarget;
    selected = $(targetCard).attr("id");

    if(selected == BINARY_TREE || selected == GENERIC_GRAPH || selected == MENU_ROOT || selected == DIRECTED_GRAPH || selected == UNDIRECTED_GRAPH){
        loadCards();
        group = selected;
    }
    else{
        menuItems.selectedAlgorithm = selected;
        $(".selected-menu-item").removeClass("selected-menu-item");
        $("#"+menuItems.selectedAlgorithm).addClass("selected-menu-item");
        $("#current-operation").text($("#"+menuItems.selectedAlgorithm).find(".navbar-card-text").text());
    }
});
$("#start-modal-holder").on("click", ".navbar-card", function(e){
    let targetCard = e.currentTarget;
    selected = $(targetCard).attr("id");

    if(selected == BINARY_TREE || selected == GENERIC_GRAPH || selected == MENU_ROOT || selected == DIRECTED_GRAPH || selected == UNDIRECTED_GRAPH){
        loadCards();
        group = selected;
    }
    else{
        menuItems.selectedAlgorithm = selected;
        $(".selected-menu-item").removeClass("selected-menu-item");
        $("#"+menuItems.selectedAlgorithm).addClass("selected-menu-item");
        $("#current-operation").text($("#"+menuItems.selectedAlgorithm).find(".navbar-card-text").text());
    }
});
$(".menu-back").on("click", () => {
    if(group == BINARY_TREE || group == GENERIC_GRAPH){
        selected = MENU_ROOT;
        group = selected;
        loadCards();
    }
    else if(group == DIRECTED_GRAPH || group == UNDIRECTED_GRAPH){
        selected = GENERIC_GRAPH;
        group = selected;
        loadCards();
    }
    else if(group == MENU_ROOT) {
        $.when($("#modal-menu").fadeOut(200)).then(() => {
            $("#modal-intro").css("display","block");
            $("#start-modal-holder").empty();
        });
    }
});

$("#start-btn").on("click", () => {
    if(menuItems.selectedAlgorithm == "none") alert("Nincs semmi kivalasztva");
    else{
        initGraph(DOMContainer);
        $.when($("#start-modal").fadeOut(200)).then(() => {
            $("#start-modal").remove();
            container = "#card-holder";
            selected = MENU_ROOT;
            group = MENU_ROOT;
            loadCards();
        });
    }
});

$("#open-menu").on("click", () =>{
    $.when($("#modal-intro").fadeOut(200)).then(() => {
        $("#modal-menu").css("display","block");
        loadCards();
    });
});