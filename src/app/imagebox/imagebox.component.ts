import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagebox',
  templateUrl: './imagebox.component.html',
  styleUrls: ['./imagebox.component.css']
})
export class ImageboxComponent implements OnInit{
  
  public file_src: string = '';
  
	source:Array<any>;
	confirmed:Array<any>;
  
	private sourceButtonActions:Array<any>;
	private confirmedButtonActions:Array<any>;
  
  private imageuploadstatus = 0;
  
  private buttonsActions:Array<any> = [
		{ _id: 1, name: "Rotate by 45 degrees", value: "rotate" },
		{ _id: 2, name: "Translate x by -40", value: "translate" },
		{ _id: 3, name: "Opacity to 0.5", value: "opacity" },
		{ _id: 4, name: "Scale to 0.5", value: "scale" }
	];
  
  constructor() { 
  }
  
  ngOnInit(){
    this.doInitialize();
  }
  
  
  doInitialize(){
    this.sourceButtonActions = JSON.parse(JSON.stringify(this.buttonsActions));
    this.confirmedButtonActions = new Array<any>();
    
    //this.confirmedButtonActions.push( { key: 1, name: 'Eureka' } );
    
		//this.key = '_id';
		//this.display = 'name';
		this.source = this.sourceButtonActions;
		this.confirmed = this.confirmedButtonActions;
  }
  
  performAction(source, confirmed, item,img)
  {
    let actionBtn = item.value;
    
    if(actionBtn == 'rotate')
    {
      this.rotate(45, img);
    }
    else if(actionBtn == 'translate')
    {
      this.translate(-40, 0, img)
    }
    else if(actionBtn == 'opacity')
    {
      this.opacity(0.5,img)
    }
    else if(actionBtn == 'scale')
    {
      this.scale(0.5,0.5,img)
    }
    
    this.doMoveItem(source, confirmed, item);
  }
  
  
  doMoveItem(source:Array<any>,target:Array<any>,item:any = null){
    let len = source.length;
		
		//add item into target 'confirmed' list
		target.push( item );
		
		//remove item from source list
		let idx = source.indexOf(item);
		if (idx !== -1) {
			source.splice(idx, 1);
		}
  }
  
  undoMoveItem(source:Array<any>,target:Array<any>){
    	let i = 0;
    	let len = target.length;
    	
    	for (; i < len; i += 1) {
    	  //add all items from target to source
    	  source.push(target[i]);
    	}
    	
    	target.length = 0;
  }
  
 /* 
  * Event triggered on selecting an Image File
  */
  fileChange(input){
    this.readFile(input.files);
  }
  
  /* 
  * Read Image File
  */
  readFile(files){
    // Create the file reader
    let reader = new FileReader();
    
    //if there is an image uploaded
    if(files)
    {
        //read the file as Data base64
        reader.readAsDataURL(files[0]);  
        
        //after file is read or loaded
        reader.onload = ()=>{
          this.resize(reader.result, 250, 250, (resized_img) =>{
            this.file_src = resized_img;
          });
         
         this.imageuploadstatus = 1;
        }
      }
  }
  
  /* 
  * Resize Image
  */
  resize(result, max_width: number, max_height: number, callback){
    var img = document.createElement("img");
    img.src = result;
    
    let width: number = 0;
    let height: number = 0;
    
    img.onload = () => {
      // Get the images current width and height
      width = img.width;
      height = img.height;
      
      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
          if (width > max_width) {
              height *= max_width / width;
              width = max_width;
          }
      } else {
          if (height > max_height) {
              width *= max_height / height;
              height = max_height;
          }
      }
    
      // create a canvas object
      var canvas = document.createElement("canvas");
  
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");  
  
      ctx.drawImage(img, 0, 0,  width, height); 
  
      // Get this encoded as a jpeg
      var dataUrl = canvas.toDataURL('image/jpeg');
      
       // callback with the results
      callback(dataUrl);
    }
  }
  
  /* 
  * Rotate Image
  */
  rotate(ang_deg: number,img){
    // Get the images current width and height
    var width = img.width;
    var height = img.height;
      
    // create a canvas object
    var canvas = document.createElement("canvas");
    
    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  
    
    
    // save the current co-ordinate system 
	  // before we screw with it
	  ctx.save(); 
 
	  // move to the center of x and y axis of image
	  //ctx.translate(100,100);
	  ctx.translate(img.width/2, img.height/2);
    
    //rotate image
    ctx.rotate(45*Math.PI/180);
    
    ctx.drawImage(img, -(img.width/2), -(img.height/2),  width, height);
    
    // and restore the co-ords to how they were when we began
	  ctx.restore(); 
    
    // Get this encoded as a jpeg
    var dataUrl = canvas.toDataURL('image/jpeg');
    
    this.file_src = dataUrl;
  }
  
  /* 
  * Translate Image
  */
  translate(x_axis: number, y_axis: number, img){
    // Get the images current width and height
    var width = img.width;
    var height = img.height;
      
    // create a canvas object
    var canvas = document.createElement("canvas");
    
    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  
    
	  // move to x and y axis given
	  ctx.translate(x_axis, y_axis);
	  
	  ctx.drawImage(img, 0, 0,  width, height);
    
    // Get this encoded as a jpeg
    var dataUrl = canvas.toDataURL('image/jpeg');
    
    this.file_src = dataUrl;
  }
  
  /* 
  * Scale Image
  */
  scale(x_axis: number, y_axis: number, img){
    // Get the images current width and height
    var width = img.width;
    var height = img.height;
      
    // create a canvas object
    var canvas = document.createElement("canvas");
    
    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  
    
    // save the current co-ordinate system 
	  // before we screw with it
	  ctx.save(); 
 
	  // move to the center of x and y axis of image
	  //ctx.translate(100,100);
	  ctx.translate(img.width/2, img.height/2);
    
    //rotate image
    ctx.scale(x_axis, y_axis);
    
    ctx.drawImage(img, -(img.width/2), -(img.height/2),  width, height);
    
    // and restore the co-ords to how they were when we began
	  ctx.restore(); 
    
    // Get this encoded as a jpeg
    var dataUrl = canvas.toDataURL('image/jpeg');
    
    this.file_src = dataUrl;
  }
  
  /* 
  * Opacity Image
  */
  opacity(opaby: number, img){
    // Get the images current width and height
    var width = img.width;
    var height = img.height;
      
    // create a canvas object
    var canvas = document.createElement("canvas");
    
    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  
    
    //opacity image
    //ctx.scale(x_axis, y_axis);
    ctx.globalAlpha=opaby;
    
    ctx.drawImage(img, 0, 0, width, height);
    
    // Get this encoded as a jpeg
    var dataUrl = canvas.toDataURL('image/jpeg');
    
    this.file_src = dataUrl;
  }
  
  /* 
  * Reset Image
  */
  reset(input){
     if(input)
     {
        this.readFile(input.files);  
     }
     
     this.undoMoveItem(this.source, this.confirmed);
  }
  
}
