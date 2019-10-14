<?php
  header("Content-type:text/html;charset=utf-8");
  
  $data = $_POST['data'];

  $arr = explode(",",$data);
  $tel = $arr[0];
  $pwd = $arr[1];
  $email = $arr[2];

  $conn = new mysqli("localhost","root","19940408","student");

  if ($conn) {
    $conn->query("insert into userdata values(0,'$tel','$pwd','$email')");
    echo 1;
  }

  $conn->close();

?>