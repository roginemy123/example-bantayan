<?php
$secret = 'your_secret';
$input = file_get_contents('php://input');
$signature = 'sha256=' . hash_hmac('sha256', $input, $secret);

if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

$payload = json_decode($input, true);

// Log the payload or perform actions based on the payload
file_put_contents('webhook_log.txt', print_r($payload, true), FILE_APPEND);

http_response_code(200);
echo 'Webhook received';
?>
