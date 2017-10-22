var speed_adjustment = 0.1
var speed = 1*speed_adjustment;
var play = speed;

var animation;

//svg globals
var layer0, layer1;
var mover1, mover2, mover3, mover4;

//viewport
var height = 0;
var width = $(window).width();

// circle settings
var innerRadius = 100;
var outerRadius = 50;

// rolling condition: omega = v/r
var circ_movement = 0;
var rotation = 0;
var offset = 0;

$( document ).ready(function() {

  jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            this.disabled = state;
        });
    }
  });

  var switchery = new Switchery(document.getElementById('trace'), { size: 'small' });

  var switchery2 = new Switchery(document.getElementById('trace_only'), { size: 'small' });

  $("#time").bootstrapSlider();
  $("#time").on("slide", function(slideEvt) {
	speed = slideEvt.value*speed_adjustment;
});

$("#radius").bootstrapSlider();
$("#radius").on("slide", function(slideEvt) {
outerRadius = slideEvt.value;
$('#radius_text').val(slideEvt.value);
mover4.attr("y1", height/2-innerRadius-outerRadius);
mover3.attr('cy', height/2-innerRadius-outerRadius*2).attr('r', outerRadius/10);
mover2.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius/10);
mover1.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius);
});

$('#radius_text').on('input propertychange paste', function() {
  if (parseFloat($('#radius_text').val())>=10 && parseFloat($('#radius_text').val())<=500) {
    outerRadius = parseFloat($('#radius_text').val());
    $('#radius').bootstrapSlider('setValue', outerRadius);
    $('#radius_text').attr('title', outerRadius);
    mover4.attr("y1", height/2-innerRadius-outerRadius);
    mover3.attr('cy', height/2-innerRadius-outerRadius*2).attr('r', outerRadius/10);
    mover2.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius/10);
    mover1.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius);
  }
});

$("#offset").bootstrapSlider();
$("#offset").on("slide", function(slideEvt) {
offset = slideEvt.value;
$('#offset_text').val(slideEvt.value);
mover4.attr("y1", height/2-innerRadius-outerRadius);
mover3.attr('cy', height/2-innerRadius-outerRadius*2).attr('r', outerRadius/10);
mover2.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius/10);
mover1.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius);
});

$('#offset_text').on('input propertychange paste', function() {
  if (parseFloat($('#offset_text').val())>=0 && parseFloat($('#offset_text').val())<=500) {
    offset = parseFloat($('#offset_text').val());
    $('#offset').bootstrapSlider('setValue', offset);
    $('#offset_text').attr('title', offset);
    mover4.attr("y1", height/2-innerRadius-outerRadius);
    mover3.attr('cy', height/2-innerRadius-outerRadius*2).attr('r', outerRadius/10);
    mover2.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius/10);
    mover1.attr('cy', height/2-innerRadius-outerRadius).attr('r', outerRadius);
  }
});

$('#stop').click(function() {
  play=speed;
  speed=0;
  $('#stop').disable(true);
  $("#time").bootstrapSlider("disable");
});

$('#play').click(function() {
  $('#stop').disable(false);
  $("#time").bootstrapSlider("enable");
  speed=play;
});

  svg = d3.select(".svgWrapper")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .call(d3.zoom().on("zoom", function () {
              svg.attr("transform", d3.event.transform);
            }))
        .append("g");

            height = $(window).height();
            var layer_1 = svg.append('g')
            layer0 = layer_1.append('g')
            layer1 = layer0.append('g');

            var centerCircle = layer1.append('circle')
            .attr('cx', width/2)
            .attr('cy', height/2)
            .attr('r', innerRadius)
            .attr('class', 'visual')
            .style('fill', '#FF7F50');

            var middleCenterCircle = layer1.append('circle')
            .attr('cx', width/2)
            .attr('cy', height/2)
            .attr('r', innerRadius/15)
            .attr('class', 'visual')
            .style('fill', '#DF5F30');

            mover1 = layer1.append('circle')
            .attr('cx', width/2)
            .attr('cy', height/2-innerRadius-outerRadius)
            .attr('r', outerRadius)
            .attr('class', 'visual')
            .style('fill', '#4169E1');

            mover2 = layer_1.append('circle')
            .attr('cx', width/2)
            .attr('cy', height/2-innerRadius-outerRadius)
            .attr('r', outerRadius/10)
            .attr('class', 'visual')
            .style('fill', '#000080');

            mover3 = layer_1.append('circle')
            .attr('cx', width/2)
            .attr('cy', height/2-innerRadius-2*outerRadius)
            .attr('r', outerRadius/10)
            .style('fill', '#FF0000');

            mover4 = layer0.append("line")
            .attr("x1", width/2)
            .attr("y1", height/2-innerRadius-outerRadius)
            .attr("x2", width/2)
            .attr("y2", height/2-innerRadius-2*outerRadius)
            .attr("stroke-width", 2)
            .attr('class', 'visual')
            .attr("stroke", "#FF7F50");

    animation = setInterval(controller, 10);  //start controller
});

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function controller(){
  rotation+=speed*(innerRadius/outerRadius+1);   //T=360*speed
  circ_movement+=speed;

  mover1.attr('cx', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+width/2).attr('cy', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)+height/2);
  mover2.attr('cx', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+width/2).attr('cy', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)+height/2);
  mover3.attr('cx', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+Math.sin(toRadians(rotation))*(outerRadius-offset)+width/2).attr('cy', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)-Math.cos(toRadians(rotation))*(outerRadius-offset)+height/2);
  mover4.attr('x1', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+width/2).attr('y1', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)+height/2).attr('x2', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+Math.sin(toRadians(rotation))*(outerRadius-offset)+width/2).attr('y2', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)-Math.cos(toRadians(rotation))*(outerRadius-offset)+height/2);

  if($('#trace').is(":checked")){
    layer0.append('circle').attr('cx', Math.sin(toRadians(circ_movement))*(innerRadius+outerRadius)+Math.sin(toRadians(rotation))*(outerRadius-offset)+width/2).attr('cy', -Math.cos(toRadians(circ_movement))*(innerRadius+outerRadius)-Math.cos(toRadians(rotation))*(outerRadius-offset)+height/2).attr('r', outerRadius/25).style('fill', '#FF0000').attr('class', 'trace');
  }
  if($('#trace_only').is(":checked")){
    $('.visual').hide('400', function() {

    });
  } else {
    $('.visual').show('400', function() {

    });
  }
}

function removeTrace() {
    $('.trace').remove();
}

function downloadSVG (){
  //get the name of the file
  if ($('#nameOfSVG').val().length > 0) {
    $('#downloadSVGFile').attr('download', $('#nameOfSVG').val()+'.svg');

    //SVG download logic starts here
    //experimental line breaks
    var stringArray = document.getElementById('svgContainer').innerHTML.split('>');
    var svgFile = '';

    for (var i = 0; i < stringArray.length; i++) {
      svgFile += stringArray[i] + '>' + '\n';
    }

    svgFile = svgFile.substring(0, svgFile.length-2);

    data = [];
    data.push(svgFile);
    properties = {type: 'plain/text'}; // Specify the file's mime-type.
    try {
      // Specify the filename using the File constructor, but ...
      file = new File(data, "MindMap.svg", properties);
    } catch (e) {
      // ... fall back to the Blob constructor if that isn't supported.
      file = new Blob(data, properties);
    }
    url = URL.createObjectURL(file);
    document.getElementById('downloadSVGFile').href = url;
    $('#downloadSVGFile')[0].click(); //strangely $('#downloadSVGFile').trigger('click'); is not working
    $('#nameOfSVG').css('background-color', '#ffffff');
    $('#fileDialog').modal('toggle');
  } else {
    $('#nameOfSVG').css('background-color', '#ff0000');
  }
}
