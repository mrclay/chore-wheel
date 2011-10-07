<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Who Does What?</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.css">
    <link href="css/app.css" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>

    <script src="js/MrClay/shuffleArray.js"></script>
    <script src="js/MrClay/assignChores.js"></script>
    <script src="js/MrClay/QueryString.js"></script>
    <script src="js/app.js"></script>

	<script src="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.js"></script>
</head>
<body>

<div data-role="page" id="setup">
	<div data-role="header">
		<h1>Who Does What?</h1>
	</div>

	<div data-role="content">
		<h2>Settings</h2>
        <p>Who's chipping in and what needs to be done?</p>

        <div data-role="fieldcontain">
            <label for="names">Persons: <small>(comma-separated)</small></label>
            <textarea cols="40" rows="8" name="names" id="names">Alice,Bob,Cathy</textarea>
        </div>
        <div data-role="fieldcontain">
            <label for="chores">Chores: <small>(comma-separated)</small></label>
            <textarea cols="40" rows="8" name="chores" id="chores">Clean Sink,Clean Microwave,Wash Dishes,Fridge Patrol</textarea>
        </div>

        <p><button type="button" id="schedButton" data-theme="b" data-inline="true">Make Schedule</button></p>
	</div>

    <div data-role="footer">
        <h4>A <a href="http://www.mrclay.org/">mrclay.org</a> micro-app made with <a href="http://jquerymobile.com/">jQuery mobile</a></h4>
    </div>
</div>

<div data-role="page" id="schedule">
    <div data-role="header">
        <a href="#setup" data-icon="gear">Settings</a>
        <h1>Who Does What?</h1>
    </div>

	<div data-role="content">	
		<h2>Schedule</h2>
		<div id="scheduleContent"></div>
        <p>You may bookmark this page, or <a href="#setup">return to the settings</a>.</p>
	</div>

    <div data-role="footer">
        <h4>A <a href="http://www.mrclay.org/">mrclay.org</a> micro-app made with <a href="http://jquerymobile.com/">jQuery mobile</a></h4>
    </div>
</div>

</body>
</html>