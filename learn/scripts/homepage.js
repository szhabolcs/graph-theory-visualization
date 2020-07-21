//Variables
let menuIsOpen = false;
let isMobile = false;
let theme;

// Reads preferred theme by system
if(matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
}
else theme = 'light';

document.documentElement.setAttribute('data-theme', theme);

/**
 * This function changes the page theme
 */
function changeTheme(){
    if (theme == 'light') {
        theme = 'dark';
        document.documentElement.classList.add('color-theme-in-transition');
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById("theme-btn").classList.remove("btn-on");
    } else {
        theme = 'light';
        document.documentElement.classList.add('color-theme-in-transition');
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById("theme-btn").classList.add("btn-on");
    }
    window.setTimeout(function () {
        document.documentElement.classList.remove('color-theme-in-transition')
    }, 1000);
}

/**
 * This function toggles the side navigation (table of contents)
 */
function changeNav() {
    if(menuIsOpen){
        document.getElementById("side-nav").style.width = "0";
        $(".navbar-top > a:first").css("margin-left","0px");
        menuIsOpen = false;
    }
    else{
        document.getElementById("side-nav").style.width = "400px";
        $(".navbar-top > a:first").css("margin-left","400px");
        menuIsOpen = true;
    }
}

/**
* This function returns the value of the given parameter
* @param {String} name the name of the parameter to read
*/
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("locale", "ro");
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);

        return "ro";
    }
    return decodeURI(results[1]) || 0;
}
/**
 * Opens a javascript file
 * @param {String} url URL of the js file to load
 * @param {function} callback callback function
 */
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

$(window).on('load',function(){
    let locale = $.urlParam("locale");

    $("body").load("./"+locale+"/index.html",()=>{
        let section = window.location.hash.substr(1);
        if(section){
            let element = document.getElementById(section);
            element.scrollIntoView();
        }

        $("#hu_flag").click(()=>{
            let url = window.location.href;
            let newUrl = url.replace("locale="+locale,"locale=hu");
            window.location.replace(newUrl);
        });
        $("#ro_flag").click(()=>{
            let url = window.location.href;
            let newUrl = url.replace("locale="+locale,"locale=ro");
            window.location.replace(newUrl);
        });

        $('[id^="section"]').click((e)=>{
            e.currentTarget.scrollIntoView();
            window.location.hash = "#"+e.currentTarget.id;
        });

        $("#app-button").click(()=>{
            let host = window.location.hostname;
            let newHost = host.replace("learn.","");
            window.location = "https://app."+newHost+"?locale="+locale;
        });
        $("#docs-button").click(()=>{
            let host = window.location.hostname;
            let newHost = host.replace("learn.","");
            window.location = "https://docs."+newHost;
        });

        $("#side-nav div a").click(changeNav);

        $(window).scroll(function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                $("#return-to-top").fadeIn();
              } else {
                $("#return-to-top").fadeOut();
              }
        });
        $("#return-to-top").click(()=>{
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });

        $.loadScript("./scripts/prism.js");
        $.loadScript("./scripts/jquery.cardslider.min.js");
        $.loadScript("./scripts/quiz-handler.js");
    });
});