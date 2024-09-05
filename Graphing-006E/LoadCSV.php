<?php
	$target = $_GET['target'];
	
	$output = [];
	
	$file = fopen($target . '.csv', 'r');
	while(!feof($file))
	{
		$output[] = fgetcsv($file);
	}
	
	echo(json_encode($output));
?>