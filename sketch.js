//Create variables here
var dog, happyDog, database, foods , foodStock;
var dog1,dog2;
var foods=20;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();

  foodObj=new food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
 dog1=createSprite(800,200,30,30)
 dog1.addImage("dog",dog)
 dog1.scale=0.3;
  
 feed=createButton("Feed the Dog");
 feed.position(700,95);
 feed.mousePressed(feedDog)

 addFood=createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods)
}


function draw() { 
  background(46, 139, 87) 

  fill (255,255,254);
  textSize (15);
  if(lastFed>12){
  text ("Last Feed:"+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed:12 AM",350,30);
}else{
  text("Last Feed:"+lastFed+"AM",350,30)
}
 // if(foods=0){
  //  textSize(20)
  //  fill("black")
  //  noStroke();
  //  text("oh wow! drago finished the milk",300,200)
 // }


 // image(dog,400,500,80,80)
 foodObj.display();
  drawSprites();

 // textSize(15);
 // noStroke();
 // fill ("black");
 // text("food remaining: "+foods,300,250);
 // text("NOTE: Press UP_ARROW Key To Feed Dog Milk!",100,20)
  
  //add styles here

}
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods)
}
function feedDog(){
  dog1.addImage("happy Dog",happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}

function addFoods(){
 foods++;
 database.ref('/').update({
   Food:foods
 })
}



