<?php

function showPage($minifyIsAvailable = false) {
    $path = ltrim(dirname($_SERVER['SCRIPT_NAME']), '/');
?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Who Does What?</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.css">
<?php if ($minifyIsAvailable): ?>
    <link href="/min/f=<?php echo $path ?>/css/app.css" rel="stylesheet">
<?php else: ?>
    <link href="css/app.css" rel="stylesheet">
<?php endif; ?>
	<script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<?php if ($minifyIsAvailable): ?>
    <script src="/min/b=<?php echo $path ?>/js&f=MrClay/shuffleArray.js,MrClay/assignChores.js,MrClay/QueryString.js,app.js"></script>
<?php else: ?>
    <script src="js/MrClay/shuffleArray.js"></script>
    <script src="js/MrClay/assignChores.js"></script>
    <script src="js/MrClay/QueryString.js"></script>
    <script src="js/app.js"></script>
<?php endif; ?>
    <script src="http://code.jquery.com/mobile/1.0rc1/jquery.mobile-1.0rc1.min.js"></script>
</head>
<body>

<div data-role="page" id="setup">
	<div data-role="header">
		<h1>Who Does What?</h1>
	</div>

	<div data-role="content">
		<p>Who's working and what needs to be done?</p>

        <div data-role="fieldcontain">
            <label for="names">Persons: <small>(comma-separated)</small></label>
            <textarea cols="40" rows="8" name="names" id="names">Alice,Bob,Cathy</textarea>
        </div>
        <div data-role="fieldcontain">
            <label for="chores">Chores: <small>(comma-separated)</small></label>
            <textarea cols="40" rows="8" name="chores" id="chores">Clean Sink,Clean Microwave,Wash Dishes,Fridge Patrol</textarea>
        </div>

        <p><button type="button" id="schedButton" data-theme="b" data-inline="true">Generate New Schedule</button>
           <button type="button" id="resetButton" data-theme="d" data-inline="true" data-icon="delete">reset</button>
        </p>
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
<?php
}

if (! is_file($_SERVER['DOCUMENT_ROOT'] . '/min/lib/Minify.php')) {
    showPage();
    exit;
}

function getContent() {
    ob_start();
    showPage(true);
    return ob_get_clean();
}

set_include_path($_SERVER['DOCUMENT_ROOT'] . '/min/lib/' . PATH_SEPARATOR . get_include_path());
require 'Minify.php';
Minify::setCache(sys_get_temp_dir());
Minify::serve('Files', array(
    'files' => new Minify_Source(array(
        'id' => md5(__FILE__),
        'contentType' => Minify::TYPE_HTML,
        'getContentFunc' => 'getContent',
    ))
));