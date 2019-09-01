

//any code around and including addAnimation() calls may be a memory leak, need to investigate

var county = 1;
var user_state = 1;

var frame_top;
var frame_bottom;
var frame_left;
var frame_right;

var side_menu;

var text_input = '';

var legend1;
var legend2;
var legend3;
var legend4;
var legend5;
var legend6;
var legend7;
var legend8;
var legend9;
var legend10;
var legend11;
var legend12;
var legend13;
var legend14;
var legend15;
var legend_icons = new Array();


var show_icon_manager_screen = 0;
var shots = new Array();

var active_legend_icon;
var mouse_over_legend_icon = 0;

var icon_selected_index;
var icon_selected = 0;

var shot1;
var shot2;
var shot3;
var shot4;
var shot5;
var shot6;
var shot7;
var shot8;
var shot9;
var shot10;
var shot11;
var shot12;
var shot13;
var shot14;
var shot15;
var shot16;
var shot17;
var shot18;
var shot19;
var shot20;

var icon;
var bg;
var menu_icon;
var treasure_icon;
var sign_icon;

var camera_icon_1;
var camera_icon_2;
var camera_icon_3;
var camera_icon_4;

var camera_zooming_in = 0;
var camera_zooming_out = 0;

var cross_icon;
var cross_icon_red;
var cross_icon_red_enabled = 0;
var cross_icon_red_quadrant = 0;
var current_quadrant = 1;
var cross_icon_red_x = 0;
var cross_icon_red_y = 0;
var waypoint_icon_1;
var waypoint_icon_2;

var scrolling = 0;
var left_arrow_icon_1;
var right_arrow_icon_1;
var up_arrow_icon_1;
var down_arrow_icon_1;
var left_arrow_icon_2;
var right_arrow_icon_2;
var up_arrow_icon_2;
var down_arrow_icon_2;

var mouse_on_camera_icon = 0;
var mouse_on_waypoint_icon = 0;
var mouse_on_property_icon = 0;
var small_map_icon;
var small_map_x;
var small_map_y;

//windowWidth,windowHeight

var top_left_position = 0;
var viewport_w_in_chunks = 0;
var viewport_h_in_chunks = 0;
var top_left_position = 0;
var map_x = 0;
var map_y = 0;
var map_w_in_chunks = 54;
var map_h_in_chunks = 54;
var chunk_w = 124;
var chunk_h = 122;

var canvas;
var canvas_width = 0;
var canvas_height = 0;
var scene_w_in_chunks = 27;
var scene_h_in_chunks = 27;
var scene_position_x = 2270;
var scene_position_y = 2680;
var total_chunks_loaded = scene_w_in_chunks * scene_h_in_chunks;
var imgs = [];


var keyboard_state = 0;
var scene_position_x_scrolling_high = 0;
var scene_position_y_scrolling_high = 0;
var scene_position_x_scrolling_low = 0;
var scene_position_y_scrolling_low = 0;

var animation_offset = 0;
var animation_offset_increasing = 1;
var animation_offset_upper_bound = 20;

//the scene can be twice etc the size of the canvas
var SCENE_W = scene_w_in_chunks * chunk_w;
var SCENE_H = scene_h_in_chunks * chunk_h;

var socket;
var server_text = 'nothing received yet. ';

var next_property_index = 0;


var properties = new Array();
var properties_loaded = 0;

function preload(){
    for (var i=0; i<=total_chunks_loaded; i++) {
      imgs[i] = loadImage("assets/map/"+i+".png",chunk_w,chunk_h);
    }
}

function setup() {

	socket = io.connect('http://95.179.163.207:1337');
	socket.on('mouse', newDrawing);
	socket.on('property', newProperty);
	socket.on('getallproperties', getAllProperties);
	socket.on('reloadproperties', reloadProperties);

  canvas = createCanvas(windowWidth, windowHeight);
  canvas_width = canvas.width;
  canvas_height = canvas.height;
  
  canvas.mouseClicked(mouse_clicked_on_canvas);
  
  small_map_x = canvas.width - 100; 
  small_map_y = 300;
  viewport_w_in_chunks = canvas_width / chunk_w;
  viewport_h_in_chunks = canvas_height / chunk_h;
  //create a sprite and add the 3 animations
  icon = createSprite(400, 200, 50, 100);

  var myAnimation = icon.addAnimation('floating', 'assets/globe/0.png', 'assets/globe/24.png');
  //myAnimation.offY = 18;

  icon.addAnimation('moving', 'assets/globe/0.png', 'assets/globe/24.png');
    fill(0, 0, 0, 20);
    //shadow
    ellipse(icon.position.x, icon.position.y+90, 80, 30);
    //character on the top
    //drawSprite(icon);
  bg = new Group();


  index = (map_x * 54) + (map_y + 1);
  for(var e = 0; e < scene_h_in_chunks; e++){
    for(var k = 0; k < scene_w_in_chunks; k++){
      var tile = createSprite(k * chunk_w, e * chunk_h);
      local_index = index + e + (54 * k);

      //image(imgs[local_index], k * 126, e * chunk_w);
      tile.addAnimation('normal', 'assets/map/'+local_index+'.png');
      bg.add(tile);
    }
  }

  frame_top = loadImage('assets/frame/frame_top.png');
  frame_bottom = loadImage('assets/frame/frame_bottom.png');
  frame_left = loadImage('assets/frame/frame_left.png');
  frame_right = loadImage('assets/frame/frame_right.png');
  
  side_menu = loadImage('assets/frame/side_menu.png');
  
  legend1 = loadImage('assets/legend/forest.png');
  legend2 = loadImage('assets/legend/mountain.png');
  legend3 = loadImage('assets/legend/water.png');
  legend4 = loadImage('assets/legend/plains.png');
  legend5 = loadImage('assets/legend/kingdom.png');
  legend6 = loadImage('assets/legend/castle.png');
  legend7 = loadImage('assets/legend/town.png');
  legend8 = loadImage('assets/legend/station.png');
  legend9 = loadImage('assets/legend/site.png');
  legend10 = loadImage('assets/legend/generic.png');
  legend11 = loadImage('assets/legend/unfinished.png');
  legend12 = loadImage('assets/legend/anomoly.png');
  legend13 = loadImage('assets/legend/mine.png');
  legend14 = loadImage('assets/legend/shop.png');
  legend15 = loadImage('assets/legend/bank.png');
  
  legend_icons.push(legend1);
  legend_icons.push(legend2);
  legend_icons.push(legend3);
  legend_icons.push(legend4);
  legend_icons.push(legend5);
  legend_icons.push(legend6);
  legend_icons.push(legend7); 
  legend_icons.push(legend8);
  legend_icons.push(legend9);
  legend_icons.push(legend10);
  legend_icons.push(legend11);
  legend_icons.push(legend12);
  legend_icons.push(legend13);
  legend_icons.push(legend14); 
  legend_icons.push(legend15);
  
	shot1 = loadImage('assets/shots/1.png');
	shot2 = loadImage('assets/shots/2.png');
	shot3 = loadImage('assets/shots/3.png');
	shot4 = loadImage('assets/shots/4.png');
	shot5 = loadImage('assets/shots/5.png');
	shot6 = loadImage('assets/shots/6.png');
	shot7 = loadImage('assets/shots/7.png');
	shot8 = loadImage('assets/shots/8.png');
	shot9 = loadImage('assets/shots/9.png');
	shot10 = loadImage('assets/shots/10.png');
	shot11 = loadImage('assets/shots/11.png');
	shot12 = loadImage('assets/shots/12.png');
	shot13 = loadImage('assets/shots/13.png');
	shot14 = loadImage('assets/shots/14.png');
	shot15 = loadImage('assets/shots/15.png');
	shot16 = loadImage('assets/shots/16.png');
	shot17 = loadImage('assets/shots/17.png');
	shot18 = loadImage('assets/shots/18.png');
	shot19 = loadImage('assets/shots/19.png');
	shot20 = loadImage('assets/shots/20.png');

	shots.push(shot1);
	shots.push(shot2);
	shots.push(shot3);
	shots.push(shot4);
	shots.push(shot5);
	shots.push(shot6);
	shots.push(shot7);
	shots.push(shot8);
	shots.push(shot9);
	shots.push(shot10);
	shots.push(shot11);
	shots.push(shot12);
	shots.push(shot13);
	shots.push(shot14);
	shots.push(shot15);
	shots.push(shot16);
	shots.push(shot17);
	shots.push(shot18);
	shots.push(shot19);
	shots.push(shot20);

  menu_icon = loadImage('assets/menu/grass_block.png');
  treasure_icon = loadImage('assets/menu/treasure_icon.png');
  sign_icon = loadImage('assets/menu/sign_icon.png');
  camera_icon_1 = loadImage('assets/menu/camera_icon_1.png');
  camera_icon_2 = loadImage('assets/menu/camera_icon_2.png');
  camera_icon_3 = loadImage('assets/menu/camera_icon_3.png');
  camera_icon_4 = loadImage('assets/menu/camera_icon_4.png');
  small_map_icon = loadImage('assets/menu/small_map_icon.png');
  
  left_arrow_icon_1 = loadImage('assets/menu/left_arrow_icon_1.png');
  right_arrow_icon_1 = loadImage('assets/menu/right_arrow_icon_1.png');
  up_arrow_icon_1 = loadImage('assets/menu/up_arrow_icon_1.png');
  down_arrow_icon_1 = loadImage('assets/menu/down_arrow_icon_1.png');
   left_arrow_icon_2 = loadImage('assets/menu/left_arrow_icon_2.png');
  right_arrow_icon_2 = loadImage('assets/menu/right_arrow_icon_2.png');
  up_arrow_icon_2 = loadImage('assets/menu/up_arrow_icon_2.png');
  down_arrow_icon_2 = loadImage('assets/menu/down_arrow_icon_2.png');
  
  cross_icon = loadImage('assets/menu/cross_icon.png');
  cross_icon_red = loadImage('assets/menu/cross_icon_red.png');
  waypoint_icon_1 = loadImage('assets/menu/waypoint_icon_1.png');
  waypoint_icon_2 = loadImage('assets/menu/waypoint_icon_2.png');
   
}

function newDrawing(data){
	server_text = 'x' + data.x + ',y' + data.y;
	cross_icon_red_enabled = 1;
	cross_icon_red_x = data.x;
	cross_icon_red_y = data.y;
	cross_icon_red_quadrant = data.q;
}

function newProperty(data){
	
	properties.push(data);
	next_property_index++;
}

function getAllProperties(data){
	for(var i = 0; i < data.length; i++){
		properties.push(data[i]);
		next_property_index++;
	}
}

function reloadProperties(data){
	properties = [];
	socket.emit('getallproperties',data);
	properties_loaded = 1;
}

function reload_background(){

    bg = new Group();
    index = (map_x * 54) + (map_y + 1);
    for(var e = 0; e < scene_h_in_chunks; e++){
      for(var k = 0; k < scene_w_in_chunks; k++){
        var tile = createSprite(k * chunk_w, e * chunk_h);
        local_index = index + e + (54 * k);

        //image(imgs[local_index], k * 126, e * chunk_w);
        tile.addAnimation('normal', 'assets/map/'+local_index+'.png');
        bg.add(tile);
      }
    }
}

function draw() {
	
	background(41, 56, 237);
	keyPressed();

	if(scene_position_x_scrolling_high == 1) {
		scene_position_x+=10;
	}
	
	
	if(scene_position_x_scrolling_low == 1) {
		scene_position_x-=10;
	}
	
	
	if(scene_position_y_scrolling_high == 1){
		scene_position_y+=10;
	}
	
	if(scene_position_y_scrolling_low == 1){
		scene_position_y-=10;
	}

  if(keyboard_state === 0){
    //mouse trailer, the speed is inversely proportional to the mouse distance
    icon.velocity.x = (scene_position_x-icon.position.x)/20;
    icon.velocity.y = (scene_position_y-icon.position.y)/20;

    //a camera is created automatically at the beginning


      //set the camera position to the icon position
      camera.position.x = scene_position_x;
      camera.position.y = scene_position_y;


    //limit the icon movements
    if(scene_position_x <= 330){
      scene_position_x = 330;
    }
    if(scene_position_y <= 130){
      scene_position_y = 130;
    }
    if(scene_position_x >=  2890){
      scene_position_x = 2890;
    }
    if(scene_position_y >= 3040){
      scene_position_y = 3040;
    }
  }

  //draw the scene
  //tiles first
  drawSprites(bg);
  
  	if(cross_icon_red_enabled == 1 && cross_icon_red_quadrant == current_quadrant) {
		image(cross_icon_red,  cross_icon_red_x-105, cross_icon_red_y-75, 210, 150);
	}

	//RENDER OVER MAP ICONS
		
	//here	
		
	textSize(15);
	for(var p = 0; p < properties.length; p++){
		if(properties[p].q == current_quadrant){
			
			
			
			var title_length = properties[p].title.length;
			var box_length = title_length * 4;
			//fill(255,0,0,255);
			//rect(properties[p].x, properties[p].y, 50, 50, 50);
			
			
			//	image(legend_icons[parseInt(properties[p].t,10)-1], parseInt(properties[p].x,10)+13, parseInt(properties[p].y,10)+4, 26, 31);

			
			if(icon_selected == 1) {
				if(icon_selected_index == p){
					fill(255,255,0,255);
					rect(parseInt(properties[p].x,10), parseInt(properties[p].y,10), 50,50);
					
				}
			}

			image(legend_icons[parseInt(properties[p].t,10)-1], parseInt(properties[p].x,10)+13 - (animation_offset/4), 
			parseInt(properties[p].y,10)+12 - (animation_offset/4), 26 + (animation_offset/2), 31 + (animation_offset/2));
			fill(255,255,255,255);
			rect((properties[p].x-25) - box_length, properties[p].y-18,100+(box_length*1.9),20,10);
			fill(0,0,0,255);
			if(title_length < 19){
				text(properties[p].title, properties[p].x - (box_length/4), properties[p].y-3);
			} else {
				text(properties[p].title, properties[p].x - (3 * box_length/4), properties[p].y-3);
			}

			
		}		
	}
	
		if(animation_offset_increasing == 1) {
			animation_offset++;
		} else {
			animation_offset--;
		}
		if(animation_offset >= animation_offset_upper_bound) {
				animation_offset_increasing = 0;
		}
		if(animation_offset <= 0) {
				animation_offset_increasing = 1;
		}
	
	
	


	//HUD MENU !!!!!!!!!

  //Can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the icon will be drawn at
  //the absolute 0,0 
       //text('Camera on 0,0 coordinate', 0, 0);
	   
	if(camera_zooming_in == 1){
		camera.zoom -= 0.02;
		if(camera.zoom < 0.0){
			camera.zoom = 0.0;
		}
	}
	
	if(camera_zooming_out == 1) {
		camera.zoom += 0.02;
		if(camera.zoom > 8.0){
			camera.zoom = 8.0;
		}
	}
	   
  camera.off();

 
	fill(82,82,82,255);
	
  	rect(0,0,windowWidth,25);
	//image(frame_top, 20, 20, windowWidth, 10);
	
	rect(0,windowHeight-30,windowWidth,30);
	//image(frame_bottom,  20, windowHeight-30, windowWidth, 10);
	
	rect(0,0,25,windowHeight);
	//image(frame_left,  20, 40, 5, windowHeight);
	
	rect(windowWidth-40,0,40,windowHeight);
	//image(frame_right,  windowWidth-40, 40, 5, windowHeight);
	
	rect(0,0,210,windowHeight);
	image(side_menu,  20, 20, 170, 613);

  
  
  
      //text('Camera off 100,100 coordinate', 100, 100);
	
	

	

	 

	 
	 
	fill(220,214,148,255);	 
	
	if(scrolling == 0) {
		image(up_arrow_icon_1,canvas_width - 100, 20, 70, 50);
	} else if (scrolling == 1) {
		image(up_arrow_icon_2,canvas_width - 100, 20, 70, 50);
	}
	

	if(scrolling == 0) {
		image(down_arrow_icon_1,canvas_width - 100, 90, 70, 50);
	} else if (scrolling == 2) {
		image(down_arrow_icon_2,canvas_width - 100, 90, 70, 50);
	}


	
	if(scrolling == 0) {
		image(left_arrow_icon_1,canvas_width - 100, 160, 70, 50);
	} else if (scrolling == 3) {
		image(left_arrow_icon_2,canvas_width - 100, 160, 70, 50);
	}

	
	if(scrolling == 0) {
		image(right_arrow_icon_1,canvas_width - 100, 230, 70, 50);
	} else if (scrolling == 4) {
		image(right_arrow_icon_2,canvas_width - 100, 230, 70, 50);
	}

	 	
    fill(0, 0, 0, 255);
	rect(0, 0, canvas_width, 10);
	rect(0, 0, 10, canvas_height);
	rect(canvas_width-10, 0, 10, canvas_height);
	rect(0, canvas_height-10, canvas_width, 10);
	


	if(mouse_on_camera_icon == 0) {
		image(camera_icon_1,canvas_width - 190, 26, 70, 50);
	} else {
		image(camera_icon_2,canvas_width - 190, 26, 70, 50);
	}
	
	if(mouse_on_property_icon == 0){
		//mouse is on property icon
		image(camera_icon_3,canvas_width - 190, 160, 70, 50);	
	} else {
		image(camera_icon_4,canvas_width - 190, 160, 70, 50);
	}
	
	image(small_map_icon,  small_map_x, small_map_y, 70, 70);
	if(mouse_over_legend_icon == 0) {
		image(cross_icon,  (canvas_width /2) - 18, (canvas_height /2) - 12, 32, 32);
	} else {
		image(active_legend_icon,  (canvas_width /2) - 13, (canvas_height /2) - 15, 26, 31);
	}
	
	
	if(mouseX > canvas_width - 190 && mouseX < canvas_width - 120 && mouseY > 90 && mouseY < 140){
		//mouse is on waypoint icon
		image(waypoint_icon_2, canvas_width - 190, 90, 70, 50);
		mouse_on_waypoint_icon = 1;
	} else {
		image(waypoint_icon_1, canvas_width - 190, 90, 70, 50);
		mouse_on_waypoint_icon = 0;
	}
	
		 	 
	 
	fill(255,255,0,100);
	mouse_over_legend_icon = 0;
	if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62){
		//mouse is on legend 1
		active_legend_icon = legend1;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*0),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+41 && mouseY < 62+41){
		//mouse is on legend 2
		active_legend_icon = legend2;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*1),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*2) && mouseY < 62+(41*2)){
		//mouse is on legend 3
		active_legend_icon = legend3;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*2),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*3) && mouseY < 62+(41*3)){
		//mouse is on legend 4
		active_legend_icon = legend4;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*3),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*4) && mouseY < 62+(41*4)){
		//mouse is on legend 5
		active_legend_icon = legend5;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*4),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*5) && mouseY < 62+(41*5)){
		//mouse is on legend 6
		active_legend_icon = legend6;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*5),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*6) && mouseY < 62+(41*6)){
		//mouse is on legend 7
		active_legend_icon = legend7;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*6),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*7) && mouseY < 62+(41*7)){
		//mouse is on legend 8
		active_legend_icon = legend8;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*7),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*8) && mouseY < 62+(41*8)){
		//mouse is on legend 9
		active_legend_icon = legend9;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*8),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*9) && mouseY < 62+(41*9)){
		//mouse is on legend 10
		active_legend_icon = legend10;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*9),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*10) && mouseY < 62+(41*10)){
		//mouse is on legend 11
		active_legend_icon = legend11;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*10),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*11) && mouseY < 62+(41*11)){
		//mouse is on legend 12
		active_legend_icon = legend12;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*11),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*12) && mouseY < 62+(41*12)){
		//mouse is on legend 13
		active_legend_icon = legend13;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*12),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*13) && mouseY < 62+(41*13)){
		//mouse is on legend 14
		active_legend_icon = legend14;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*13),190,41);
	} else if(mouseX > 0 && mouseX < 190 && mouseY > 20+(41*14) && mouseY < 62+(41*14)){
		//mouse is on legend 15
		active_legend_icon = legend15;
		mouse_over_legend_icon = 1;
		rect(0,20+(41*14),190,41);
	} 
	
	 
	 
	 if(show_icon_manager_screen == 1){
		 
		fill(88,88,88,240);
		rect(100,100,windowWidth-200,windowHeight-200);

		if(icon_selected_index <= 19){
			//render an associated snapshot
			image(shots[icon_selected_index],(windowWidth/2)-300,(windowHeight/2)-168,600,338);
		}
		
		fill(128,64,64,255);
		rect((windowWidth/2)-200,120,134,40);
		fill(200,200,200,255);
		text("Delete icon", (windowWidth/2)-196,148);
		
		fill(64,64,64,255);
		rect((windowWidth/2)+60,120,134,40);
		
		fill(200,200,200,255);
		text("Close",(windowWidth/2)+64 , 148);
	 }		 
//var icon_selected_index;
//var icon_selected = 0;

	 
	 
	 
	 
	 

	
	//text(`${key} ${keyCode}`, 10, 40);
	 

	fill(64,64,64,255);
	rect(210,10,windowWidth-(212 + 210), 40);
	fill(255,255,255,255);
	textSize(22);
	text('Next icon name: ' + text_input,220,40);
	fill(100,100,100,255);
	 
	//text('scene_position_x:' + scene_position_x, 10, 90);
	//text('scene_position_y:' + scene_position_y, 10, 120);
      fill(0, 0, 0, 20);
	  
	  	//END HUD MENU !!!!!!!!!
		
			
	if(properties_loaded == 0){
		
		var data = {
			title: 'none',
			x: scene_position_x,
			y: scene_position_y,
			q: cross_icon_red_quadrant,
			t: '1'
		}

	    socket.emit('getallproperties',data);
		properties_loaded = 1;
	}
}


function mouse_clicked_on_canvas(){
	
	
	if(show_icon_manager_screen == 1) {
	
	} else { 
	
		
		if(mouse_over_legend_icon == 1){
			
			if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62){
				//mouse is on legend 1
				var data = {
					title: "<Forest> " + text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 1
				}

				socket.emit('property',data);
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+42){
				//mouse is on legend 2
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 2
				}

				socket.emit('property',data);
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*2)){
				//mouse is on legend 3
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 3
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*3)){
				//mouse is on legend 4
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 4
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*4)){
				//mouse is on legend 5
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 5
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*5)){
				//mouse is on legend 6
			
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 6
				}

				socket.emit('property',data);
				
			
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*6)){
				//mouse is on legend 7
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 7
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*7)){
				//mouse is on legend 8
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 8
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*8)){
				//mouse is on legend 9
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 9
				}

				socket.emit('property',data);
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*9)){
				//mouse is on legend 10
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 10
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*10)){
				//mouse is on legend 11
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 11
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*11)){
				//mouse is on legend 12
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 12
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*12)){
				//mouse is on legend 13
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 13
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*13)){
				//mouse is on legend 14
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 14
				}

				socket.emit('property',data);
				
				
			} else if(mouseX > 0 && mouseX < 190 && mouseY > 20 && mouseY < 62+(42*14)){
				//mouse is on legend 15
				
				var data = {
					title: text_input,
					x: scene_position_x-26,
					y: scene_position_y-26,
					q: current_quadrant,
					t: 15
				}

				socket.emit('property',data);
				
			} 
			
			 
		}
		
		
		
		
		if(mouseX > small_map_x && mouseY > small_map_y && mouseX < small_map_x + 70 && mouseY < small_map_y + 70){
			
			if(mouseX > small_map_x && mouseY > small_map_y && mouseX < small_map_x + 35 && mouseY < small_map_y + 35){
				//top left
				map_x = 0;
				map_y = 0;
				reload_background();
				current_quadrant = 1;
			}
		
			if(mouseX > small_map_x + 35 && mouseY  > small_map_y + 35 && mouseX < small_map_x + 70 && mouseY < small_map_y + 70){
				//bottom right
				map_x = 27;
				map_y = 27;
				reload_background();
				current_quadrant = 4;
			}
			
			if(mouseX > small_map_x + 35 && mouseY > small_map_y && mouseX < small_map_x + 70 && mouseY < small_map_y + 35){
				//top right
				map_x = 27;
				map_y = 0;
				reload_background();
				current_quadrant = 2;
			}
		
			if(mouseX > small_map_x && mouseY  > small_map_y + 35 && mouseX < small_map_x + 35 && mouseY < small_map_y + 70){
			
				//bottom left
				map_x = 0;
				map_y = 27;
				reload_background();
				current_quadrant = 3;
			
			}
			


		}
		
		if(mouse_on_waypoint_icon == 1) {

			cross_icon_red_quadrant = current_quadrant;	
			
			var data = {
				x: scene_position_x,
				y: scene_position_y,
				q: cross_icon_red_quadrant
			}

			cross_icon_red_enabled = 1;
			cross_icon_red_x = data.x;
			cross_icon_red_y = data.y;

			socket.emit('mouse',data);
		}
		

	//up		
			if(scrolling == 0 && mouseX >= canvas_width - 100 && mouseX < canvas_width - 30 && mouseY > 20 && mouseY < 70){
				scene_position_y_scrolling_low = 1;
				scrolling = 1;
			}
	//down
			else if(scrolling == 0 && mouseX >= canvas_width - 100 && mouseX < canvas_width - 30 && mouseY > 90 && mouseY < 130){ 
				scene_position_y_scrolling_high = 1;
				scrolling = 2;
			}

	//left
			else if(scrolling == 0 && mouseX >= canvas_width - 100 && mouseX < canvas_width - 30 && mouseY > 160 && mouseY < 210){	
				scene_position_x_scrolling_low = 1;
				scrolling = 3;
			}
	//right
			else if (scrolling == 0 && mouseX >= canvas_width - 100 && mouseX < canvas_width - 30 && mouseY > 230 && mouseY < 280){	
				scene_position_x_scrolling_high = 1;
				scrolling = 4;
			} else {
				scene_position_x_scrolling_low = 0;
				scene_position_y_scrolling_low = 0;
				scene_position_x_scrolling_high = 0;
				scene_position_y_scrolling_high = 0;
				scrolling = 0;
			}
	}
	
		
			
}

function mousePressed(){
		if(show_icon_manager_screen == 1) {
	
	} else { 
		if(mouseX > canvas_width - 190 && mouseX < canvas_width - 120 && mouseY > 20 && mouseY < 70){
			//mouse is on camera icon
			image(camera_icon_2,canvas_width - 190, 20, 70, 50);	
			mouse_on_camera_icon = 1;
		} else {
			image(camera_icon_1,canvas_width - 190, 20, 70, 50);
			mouse_on_camera_icon = 0;
		}
		
		if(mouse_on_camera_icon == 1) {
			
			camera_zooming_in = 1;
		} 
		
		if(mouseX > canvas_width - 190 && mouseX < canvas_width - 120 && mouseY > 160 && mouseY < 210){
			//mouse is on property icon
			image(camera_icon_4,canvas_width - 190, 160, 70, 50);	
			mouse_on_property_icon = 1;
		} else {
			image(camera_icon_3,canvas_width - 190, 160, 70, 50);
			mouse_on_property_icon = 0;
		}
		
		if(mouse_on_property_icon == 1) {
			
			camera_zooming_out = 1;
		}
	}
}

function mouseReleased() {
	
	if(show_icon_manager_screen == 1) {
		
		if(mouseX >= (windowWidth/2)+60 && mouseX <= ((windowWidth/2)+60) + 134){
			if(mouseY >= 120 && mouseY <= 160){
				//user clicked close
				show_icon_manager_screen = 0;
			}
		}
		if(mouseX >= (windowWidth/2)-200 && mouseX <= (windowWidth/2)-200 + 134){
			if(mouseY >= 120 && mouseY <= 160){

				
			//user clicked delete property

				
			var data = {
				x: parseInt(properties[icon_selected_index].x,10),
				y: parseInt(properties[icon_selected_index].y,10),
				q: properties[icon_selected_index].q
			}

			socket.emit('delete',data);
			show_icon_manager_screen = 0;
			}
		}
		 		
	
	} else { 
	  camera_zooming_in = 0;
	  camera_zooming_out = 0;
	  mouse_on_property_icon = 0;
	  mouse_on_camera_icon = 0;
	  
	  icon_selected = 0;
	  for(var i = 0; i < properties.length; i++){
		  
		if(current_quadrant == properties[i].q && icon_selected == 0){
			

			var scene_position_x_corner = scene_position_x - (windowWidth/2);
			var scene_position_y_corner = scene_position_y - (windowHeight/2);

			if((scene_position_x_corner + mouseX) >= (parseInt(properties[i].x,10) - parseInt(25,10)) 
				&& (scene_position_x_corner + mouseX) <= (parseInt(properties[i].x,10) + parseInt(50,10))){
					
				//text_input = '' + (scene_position_y_corner + mouseY) + '>=' + parseInt(properties[i].y,10) + ':'
				//+ (scene_position_y_corner + mouseY) + '<=' + (parseInt(properties[i].y,10) + (parseInt(29,10))); 
				
				if((scene_position_y_corner + mouseY) >= (parseInt(properties[i].y,10) - parseInt(25,10)) 
					&& (scene_position_y_corner + mouseY) <= (parseInt(properties[i].y,10) + parseInt(50,10))){
								
								icon_selected_index = i;
								icon_selected = 1;
								show_icon_manager_screen = 1;
								
				}

			}
		  }
	  }
	}
}

function keyReleased() {
	
	
	if(keyCode == ENTER){
		
		text_input = '';
	} else if (keyCode == BACKSPACE) {
		text_input = text_input.substring(0, text_input.length - 1);
	} else if (keyCode == SHIFT) {
	} else if (key == 'CapsLock') {
	} else {
	
		if(text_input.length <= 50) {
	
			text_input = text_input + '' + key;
		}
	
	}
	
}

function keyPressed() {
	

}

function windowResized() {
  resizeCanvas(canvas_width, canvas_height);
  viewport_w_in_chunks = canvas_width / chunk_w;
  viewport_h_in_chunks = canvas_height / chunk_h;
}
