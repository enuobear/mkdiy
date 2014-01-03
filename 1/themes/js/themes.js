window.onload = function(){
	var list = document.querySelectorAll(".list li");

	var columnNum = 3,
		elemWidth = 200,
		columnHeight = [],
		marginLeft = 25,
		marginBottom = -10;

	for(var i=0, len=list.length; i<len; i++){
		if(i<columnNum){
			columnHeight[i] = list[i].offsetHeight + marginBottom;
			list[i].style.top = "0px";
			// if(i==0){
			// 	list[i].style.left = i*elemWidth + "px";
			// }else{
				list[i].style.left = i * elemWidth + (i+1)*marginLeft + "px";
			// }
		}else{
			var innsetColumn = minColumnHeight(columnHeight),
				imgHeight    = list[i].offsetHeight;

			// if(innsetColumn==0){
			// 	list[i].style.top = columnHeight[innsetColumn] + "px";
			// 	list[i].style.left = innsetColumn*elemWidth + "px";
			// }else{
				list[i].style.top = columnHeight[innsetColumn] + "px";
				list[i].style.left = innsetColumn * (elemWidth + marginLeft) + "px";
			// }

			columnHeight[innsetColumn] += imgHeight + marginBottom;
		}
	}

	function minColumnHeight(arr){
		var minColumn = 0,
			minHeight = arr[minColumn];

		for(var i=1, len=arr.length; i<len; i++){
			var temp = arr[i];
			if(temp < minHeight){
				minColumn = i;
				minHeight = temp;
			}
		}

		return minColumn;
	}
}