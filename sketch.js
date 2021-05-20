var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var bg;

var feed;
var lastFed;
var f11, f11Image;
var intro, introImage;
var enter, enterImage;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bg = loadImage("background1.jpg")
f11Image = loadImage("f11.png");
introImage = loadImage("intro.png");
enterImage  = loadImage("enter.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,520);

  f11 = createSprite(500, 200, 20, 20);
  f11.addImage(f11Image);
  f11.visible = true;

  intro = createSprite(500, 200, 20, 20);
  intro.addImage(introImage);
  intro.scale = 0.5
  intro.visible = false;

  enter = createSprite(500, 230, 20, 20);
  enter.addImage(enterImage);
  enter.scale = 0.4;
  enter.visible = false;

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,145);
  addFood.mousePressed(addFoods)
  intro.visible = false;
 

  eatFood=createButton("feed the dog");
  eatFood.position(700,145);
  eatFood.mousePressed(feedDog)

}

function draw() {
  background(bg);
  foodObj.display();

  dog.scale = 0.2

  if(keyDown("f11")){
    f11.visible = false;
    intro.visible = true;
    enter.visible = true;
  }
  if(keyDown("enter")){
    intro.visible = false;
    enter.visible = false;
  }

 

  //write code to read fedtime value from the database 

  
 
  //write code to display text lastFed time here
  fedtime=database.ref('feedTime');
  fedtime.on("value",function(data){
 lastFed=data.val();
  })

  if(lastFed>=12){
    fill("yellow")
    stroke("black")
    textSize(20);
    text("Last Feed : "+ lastFed%12 + " PM", 320,80);
  
}else if(lastFed==0){ 
    fill("yellow")
    stroke("black")
    textSize(20);
    text("Last Feed : 12 AM",320,80); 
   
}else{
    fill("yellow")
    stroke("black")
    textSize(20);
    text("Last Feed : "+ lastFed + " AM", 320,80);
    
 }

 
  drawSprites();

  fill("yellow");
  stroke("black");
  textSize(35)
  text("Virtual Pet", 380, 40)


  fill("yellow");
  stroke("black");
  textSize(20)
  text("Game By Amogh P Kaushik", 700, 500)

  
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
dog.addImage(happyDog);
var foodaval=foodObj.getFoodStock();
if(foodaval<=0){
   foodObj.updateFoodStock(foodaval*0);

}else{
  foodObj.updateFoodStock(foodaval-1);
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()

})
}
