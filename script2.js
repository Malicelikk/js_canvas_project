const btnCreatePoint = document.querySelector('.btncreate_delivery_point');
const btnCalculate = document.querySelector('.btncalculate');

var elem = document.getElementById('canvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];
var createCircleMod = false;
var createTransferMod = false;
var x1, y1, x2, y2;
var koordinatlar = [];
var fuel;
var costs = [];
var rootdelivery;
var costsobj = {
    baslangic : null,
    tutar : null,
    varis : null
}

btnCreatePoint.addEventListener('click', function () {
    createCircleMod = true;
});

btnCalculate.addEventListener('click', function () {
    do {
        fuel = parseInt(window.prompt("Fuel için 0'dan büyük bir sayı giriniz", ""), 10);
    } while (isNaN(fuel) || fuel < 1);
    alert('Fuel: ' + fuel);
});


elem.addEventListener('click', function (event) {

    if (!createCircleMod) return;
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;


    addelement(x, y);
    createCircleMod = false;  // createcirclemodu kapat

}, false);



function addelement(x, y) {
    var id = Math.floor((Math.random() * 1000) + 1);
    elements.push({
        colour: '#05EFFF',
        width: 150,
        height: 100,
        top: y,
        left: x,
        id: id,
    });

    console.log(elements);

    context.beginPath();
    context.arc(x, y, 40, 0, 2 * Math.PI);
    context.stroke();

    context.font = "25px Arial";
    context.fillText(id, x - 25, y + 5);


}

elem.addEventListener('dblclick', function (event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    elements.forEach(function (element) {
        if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
            console.log('dblclick'); 
            rootdelivery = element.id;
        }
    });

});

elem.addEventListener('click', function (event) {
    var x3 = event.pageX,
        y3 = event.pageY;
    console.log(x3, y3);
    elements.forEach(function (element) {
        if (elements.length > 1 && y3 > element.top && y3 < element.top + element.height && x3 > element.left && x3 < element.left + element.width) {
            alert('CREATETRANSFERMODE açıldı mousea basılı tutarak hedef noktaya çizgi çekiniz'); // elementlerin üstüne tıklanınca createtransfermode açıldı
            createTransferMod = true;
            costsobj.baslangic= element.id;  // başlangıç noktası id si
        }
    });

});

elem.onmousedown = function (event) {
    event = event || window.event;

    GetStartPoints();
};

elem.onmouseup = function (event) {
    event = event || window.event;

    GetEndPoints();

    if (createTransferMod) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        var x3 = (x1 + x2) / 2;
        var y3 = (y1 + y2) / 2;

        do {
            var cost = parseInt(window.prompt("Cost için 0'dan büyük bir sayı giriniz", ""), 10);
        } while (isNaN(cost) || cost < 1);
        costsobj.tutar=cost;
        //console.log(costsobj);  // başlangıç noktası ve tutar

        context.font = "25px Arial";
        context.fillText(cost, x3, y3);
        elements.forEach(function (element) {
            if (elements.length > 1 && y2 > element.top && y2 < element.top + element.height && x2 > element.left && x2 < element.left + element.width) {
               
                costsobj.varis= element.id;  // başlangıç noktası id si
                console.log(costsobj);
            }
        });
        createTransferMod = false;
    }

   

};


function GetStartPoints() {
    x1 = event.clientX;
    y1 = event.clientY;
}

function GetEndPoints() {
    x2 = event.clientX;
    y2 = event.clientY;

    
}

/*
const random = () => {
    console.log(fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5'))
    .then((response) => {
        console.log(response)
        console.log(response.json)
    })
}

random();

$(document).ready(function () {
    const endPoint = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000";
    
      $.ajax({
        url: endPoint,
        type: "GET",
        success: function (result) {
          console.log(result);
        },
        error: function (error) {
          console.log(`Error ${error}`);
        }
      });
    
  });*/
