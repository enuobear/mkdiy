<?php
	// header('Access-Control-Allow-Origin:*');
	// header('Content-type:text/json');
	// $json = {
	// 	'state': '1'
	// };
	// echo $json;
	
	header('Access-Control-Allow-Origin:*');
	//服务端返回JSON数据  
	$arr=array("mybonus"=>"0","userlist"=>"0","bonustype"=>"0");  
	// $result=json_encode($arr);  
	//echo $_GET['callback'].'("Hello,World!")';  
	//echo $_GET['callback']."($result)";  
	//动态执行回调函数  
	// $callback=$_GET['callback'];  
	// echo $callback."($result)";

	echo json_encode($arr);
?>