<?PHP session_start(); 
// connect to database
function connect($database)
{
	#-------------------------------------------------#
	#   set up parameters to access server / database #
	#-------------------------------------------------#
	$host = "mysql1.000webhost.com";
	$user = "a2356611_gameuse";
	$password = "password1";
	$db = "a2356611_game";
	
	mysql_connect($host,$user,$password) or die ("Could not connect to mysql server.");
	mysql_select_db($db)	or die ("Couldn't find database ".$db);
	
}

if (isset($_POST['save'])){
	connect();
	save();
	}
// save game
function save()
{
	$query = "INSERT INTO player(name,score,level,speed,attack,damage,hitpoints,life,time,chords1,chords2) VALUES('$_SESSION[name]','$_POST[score]', '$_POST[level]', '$_POST[speed]',
	'$_POST[attack]','$_POST[dmg]','$_POST[hp]','$_POST[life]', NOW(), '$_POST[bg]', '$_POST[bg2]')";
	mysql_query($query); 
	//check_mysql();  display_query($query);
	//redirect($page);
	
if(mysql_errno()){
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
}
}

if (isset($_GET['t'])){
	connect();
	load();
	}
// load game
function load()
{
	$query = "SELECT * FROM player WHERE name = '$_SESSION[name]'  ORDER BY time DESC LIMIT 1";
	$result = mysql_query($query); 
	$info = mysql_fetch_array($result)
	or die(mysql_error());
	
	$data = array('name' => $info['name'], 'score' => $info['score'], 'level' => $info['level'],'speed' => $info['speed'],
	'attack' => $info['attack'],'damage' => $info['damage'],'hitpoints' => $info['hitpoints'],'life' => $info['life'],
	'chords1' => $info['chords1'],'chords2' => $info['chords2']);
	echo "<script> delete data; </script>";
	echo json_encode(array($data));

	
if(mysql_errno()){
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
}

}

if(isset($_POST['create']))
{
	connect("");
	register(); 
}

// register user
function register()
{
	$name = $_POST['username'];
	$password = $_POST['password'];
	$hash = hash('sha256', $password);
	function createSalt(){    $string = md5(uniqid(rand(), true));    
	return substr($string, 0, 3);}$salt = createSalt();
	$hash = hash('sha256', $salt . $hash);
	$query = "INSERT INTO user(name,password, salt) VALUES('$name','$hash', '$salt')";
	mysql_query($query); 
	if(mysql_errno()){
	?><script type="text/javascript"> alert("User name exists"); </script>
<?PHP
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
		 //die();
	}
?><script type="text/javascript"> alert("User account created"); </script>
<?PHP
header('refresh:-; url=index.html');
}

if(isset($_POST['Log']))
{
	connect("");
	login(); 

}
// login to game
function login()
{
	#----------------------------------#
	# Sets up all variables to compare #
	#----------------------------------#
	$name = $_POST['username'];
	$password = $_POST['password'];
	$query = "SELECT *        
	FROM user       
	WHERE name = '$name';";
	$result = mysql_query($query);
	#-----------------------------------#
	# 		no such user exists 		#
	#-----------------------------------#
	if(mysql_num_rows($result) < 1)
	{    
	echo '<script type="text/javascript">';  
	echo 'alert("User does not exist");';
	echo '</script>';
		header('refresh:0;url=index.html');    
		die();
	}
	
	#--------------------------------------------------------------------------#
	# 		Gets password and salt, and hashes the typed password 			   #
	#------------------------------------------=-------------------------------#
	$userData = mysql_fetch_array($result, MYSQL_ASSOC);
	$hash = hash('sha256', $userData['salt'] . hash('sha256', $password) );
	#-----------------------------------#
	# 		 incorrect password 		#
	#-----------------------------------#
	if($hash != $userData['password']) 
	{    
	?><script type="text/javascript"> alert("Incorrect Password"); </script>
<?PHP
		header('refresh:0;url=index.html');  	
		die();
	}
	else
	{
	?><script type="text/javascript"> alert("Welcome <?PHP echo $name ?>"); </script>
<?PHP	
	$_SESSION[name] = $name;
	header('refresh:0;url= menu.html');   

	}
}