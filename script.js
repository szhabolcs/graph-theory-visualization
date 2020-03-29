$(document).ready(function () {
    var gridSwitch = false;
    var box = "<div class='draggable smooth-shadow centered' ><svg class='bi bi-caret-down-fill' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z' clip-rule='evenodd'/><path fill-rule='evenodd' d='M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z' clip-rule='evenodd'/><path fill-rule='evenodd' d='M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z' clip-rule='evenodd'/><path fill-rule='evenodd' d='M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z' clip-rule='evenodd'/><path fill-rule='evenodd' d='M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z' clip-rule='evenodd'/></svg><div class='input-group' style='margin:auto; width: 50px;'><input type='text' class='form-control text-center' id='usr'></div></div>";

    $(".add").click(function () {
        $(box).hide().appendTo("#container").fadeIn(150);

        var insertedBox = $("#container").children(".draggable").last();

        jsPlumb.draggable(insertedBox, { grid: [10, 10] });

        jsPlumb.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.2, 1, -1, -1],
            connector: "Straight"
        });
        jsPlumb.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.8, 1, -1, -1],
            connector: "Straight"
        });
        jsPlumb.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: [
                [0.5, 0, 0, 0],
                [0.2, 0, 0, 0],
                [0.8, 0, 0, 0]
            ],
            endpoint: ["Rectangle", { radius: 10 }],
            connector: "Straight"
        });

        insertedBox.css({top: "50%"});
    });

    $("#customSwitch").change(function () {
        if ($("#customSwitch").is(":checked")) {
            gridSwitch = false;
            $("#container").addClass("grid");
        } else {
            gridSwitch = true;
            $("#container").removeClass("grid");
        }
    });
});