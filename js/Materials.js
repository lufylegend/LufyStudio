function Materials(){
	var self = this;
	base(self,LSprite,[]);
	self.graphics.drawRect(2,"#000000",[0,0,200,500],true,"#333333");
	self.graphics.drawRect(2,"#000000",[1,1,200,23],true,"#222222");
	self.graphics.drawRect(1,"#000000",[0,500,200,200],true,"#FFFFFF");
	
	var title = new LTextField();
	title.x = 3;
	title.y = 5;
	title.text = "素材";
	title.color = "#FFFFFF";
	self.addChild(title);
	
	var showLayer = new LSprite();
	self.showLayer = showLayer;
	showLayer.graphics.drawRect(0,"#000000",[0,0,200,473],true,"#333333");
	var scrollbar = new LScrollbar(showLayer,178,473,20,false);
	self.scrollbar = scrollbar;
	scrollbar.x = 1;
	scrollbar.y = 26;
	self.addChild(scrollbar);
}
Materials.prototype.add = function(name,image){
	var self = this;
	var child = new LSprite();
	child.y = self.showLayer.childList.length * 22;
	child.graphics.drawRect(0,"#666666",[0,0,170,22]);
	self.showLayer.addChild(child);
	var label = new LTextField();
	label.x = 3;
	label.text = name;
	label.color = "#FFFFFF";
	child.addChild(label);
	child.data = new LBitmapData(image);
	
	self.showLayer.graphics.drawRect(0,"#000000",[0,0,200,self.showLayer.getHeight() > 473 ? self.showLayer.getHeight():473],true,"#333333");
	
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		if(self.select){
			self.select.graphics.clear();
			self.select.graphics.drawRect(0,"#666666",[0,0,200,22]);
		}
		self.review(child);
	});
};
Materials.prototype.review = function(child){
	var self = this;
	child.graphics.drawRect(0,"#666666",[0,0,200,22],true,"#666666");
	self.select = child;
	if(!self.view){
		self.view = new LBitmap(child.data);
		self.addChild(self.view);
	}else{
		self.view.bitmapData = child.data;
	}
	self.view.scaleX = self.view.scaleY = self.view.bitmapData.width > self.view.bitmapData.height ? 200/self.view.bitmapData.width : 200/self.view.bitmapData.height;
	self.view.x = (200 - self.view.getWidth())*0.5;
	self.view.y = 500 + (200 - self.view.getHeight())*0.5;
};