function LBitmapDataObject(){
};
LBitmapDataObject.save = function(displayObject){
	var childList = projectFiles.showLayer.childList;
	for(var i=0,l=childList.length;i<l;i++){
		if(childList[i].data.name == displayObject.name){
			//childList[i].data = displayObject.clone();
			var list = childList[i].data.childList;
			for(var j=0;j<list.length;j++){
				var data = childList[i].data.childList[j].bitmapData;
				var copyData = displayObject.childList[j].bitmapData;
				data.image = copyData.image;
				data.x = copyData.x;
				data.y = copyData.y;
				data.width = copyData.width;
				data.height = copyData.height;
			}
			console.log("LBitmapDataObject.save",childList[i].data);
			break;
		}
	}
};
LBitmapDataObject.addToBitmap = function(name){
	var stageList = gameStage.childList;
	var bitmapLayer = stageList[stageList.length - 1];
	if(bitmapLayer.childType != "LBitmap"){
		LMessageBox.show({
			width:340,
			height:200,
			title:"错误信息",
			message:"LBitmapData只能添加到LBitmap上！"
		});
		return;
	}
	console.log("LBitmapDataObject.addToBitmap",bitmapLayer);
	var childList = projectFiles.showLayer.childList;
	for(var i=0,l=childList.length;i<l;i++){
		if(childList[i].data.name == name){
			console.log(childList[i].data);
			bitmapLayer.getChildAt(0).bitmapData = childList[i].data.getChildAt(1).bitmapData;
			break;
		}
	}
};
