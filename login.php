<?php
  header("Content-type:text/html;charset=utf-8");
  
  $data = $_POST['data'];

  $arr = explode(",",$data);
  $name = $arr[0];
  $pwd = $arr[1];

  $conn = new mysqli("localhost","root","19940408","student");

  if ($conn) {
    $result = $conn->query("select pwd from userdata where email='34457500@qq.com'");
    echo $result;
    // $conn->query("insert into userdata values(0,'123','345','5555')");
    // if (mysqli_num_rows($result) >= 1) {
    //     echo $result;
    // }else{
    //   $result = $conn->query("select pwd from userdata where email='$name'");
    //   if (mysqli_num_rows($result) >= 1) {
    //     echo $result;
    //   }else{
    //     echo -1;
    //   }
    // }
  }

  $conn->close();

?>