<?php
// Get the PHP code from the request
$code = $_POST['code'];

// Create a temporary file to store the PHP code
$tempFile = tempnam(sys_get_temp_dir(), 'php_compiler_');
file_put_contents($tempFile, $code);

// Capture the output and errors of the PHP code
ob_start();
include $tempFile;
$output = ob_get_clean();

// Delete the temporary file
unlink($tempFile);

// Send the output back to the front-end
echo $output;
?>
