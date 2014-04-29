function LWindow(width,height,title){
	var s = this;
	base(s,LSprite);
	s.w = width;
	s.h = height;
	s.bar = new LSprite();
	s.bar.alpha = 0.7;
	s.barColor = "#0000FF";
	s.bar.w = s.w;
	s.bar.h = 30;
	s.addChild(s.bar);
	s.bar.addEventListener(LMouseEvent.MOUSE_DOWN,s._onBarDown);
	s.title = new LTextField();
	s.title.x = s.title.y = 3;
	s.title.size = 16;
	s.title.text = title;
	s.bar.addChild(s.title);
	
	s.close = new LSprite();
	s.closeColor = "#800000";
	s.close.w = 50;
	s.close.h = 25;
	s.addChild(s.close);
	s.close.addEventListener(LMouseEvent.MOUSE_DOWN,s._onClose);
	s.sign = new LSprite();
	s.signColor = "#FFFFFF";
	s.addChild(s.sign);

	s.layer = new LSprite();
	s.addChild(s.layer);
	s.layerColor = "#FFFFFF";
	s.layer.y = s.bar.h;
	s.layer.h = s.h - s.bar.h;
	var g = new LGraphics();
	g.rect(0,0,s.w,s.layer.h);
	s.layer.mask = g;
	s.graphics.drawRect(1,s.barColor,[0,s.bar.h,s.w,s.layer.h],true,s.layerColor);

	s.addEventListener(LEvent.ENTER_FRAME,s._onDraw);
}
LWindow.CLOSE = "close";
LWindow.prototype.clone = function(){
	var s = this,a = new LWindow(s.w,s.h);
	a.copyProperty(s);
	a.removeChild(a.bar);
	a.bar = s.bar.clone();
	a.addChild(a.bar);
	a.removeChild(a.close);
	a.close = s.close.clone();
	a.addChild(a.close);
	a.removeChild(a.sign);
	a.sign = s.sign.clone();
	a.addChild(a.sign);
	a.removeChild(a.layer);
	a.layer = s.layer.clone();
	a.addChild(a.layer);
	a.bar.addEventListener(LMouseEvent.MOUSE_DOWN,a._onBarDown);
	a.close.addEventListener(LMouseEvent.MOUSE_DOWN,a._onClose);
	return a;
};
LWindow.prototype._onClose = function(event){
	var s = event.clickTarget.parent;
	s.dispatchEvent(LWindow.CLOSE);
	s.parent.removeChild(s);
};
LWindow.prototype._onDraw = function(event){
	var s = event.target;
	var co = s.getRootCoordinate();
	if(s.barColorSet == s.barColor)return;
	s.barColorSet = s.barColor;
	s.xSet = co.x;
	s.ySet = co.y;
	var barGrd=LGlobal.canvas.createLinearGradient(0,-s.bar.h*0.5,0,s.bar.h*2);
	barGrd.addColorStop(0,"white");
	barGrd.addColorStop(1,s.barColor);
	var closeGrd=LGlobal.canvas.createLinearGradient(0,-s.close.h*0.5,0,s.close.h*2);
	closeGrd.addColorStop(0,"white");
	closeGrd.addColorStop(1,s.closeColor);
	s.bar.graphics.clear();
	s.bar.graphics.drawRoundRect(1,s.barColor,[0,0,s.bar.w,s.bar.h,s.bar.h*0.1],true,barGrd);
	s.close.graphics.clear();
	s.close.graphics.drawRoundRect(1,s.closeColor,[s.w - s.close.w,0,s.close.w,s.close.h,s.close.h*0.1],true,closeGrd);
	s.sign.graphics.clear();
	s.sign.graphics.drawLine(4,s.signColor,[s.w - s.close.w + 15,5,s.w - 15,s.close.h-5]);
	s.sign.graphics.drawLine(4,s.signColor,[s.w - s.close.w + 15,s.close.h-5,s.w - 15,5]);
};
LWindow.prototype._onBarDown = function(event){
	var s = event.clickTarget.parent;
	s.bar.addEventListener(LMouseEvent.MOUSE_UP,s._onBarUp);
	s.startDrag();
};
LWindow.prototype._onBarUp = function(event){
	var s = event.clickTarget.parent;
	s.stopDrag();
	s.bar.removeEventListener(LMouseEvent.MOUSE_UP,s._onBarUp);
};
LWindow.prototype.toString = function(){
	return "[LWindow]";
};