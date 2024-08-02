<?php
$secret = 'secret123';
$input = file_get_contents('php://input');
$signature = 'sha256=' . hash_hmac('sha256', $input, $secret);
$logFile = 'webhook_log.txt';

if (!hash_equals($signature, $_SERVER['HTTP_X_HUB_SIGNATURE_256'])) {
    file_put_contents($logFile, "Invalid signature\n", FILE_APPEND);
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

$payload = json_decode($input, true);
$logData = print_r($payload, true);
file_put_contents($logFile, "Received payload:\n$logData\n", FILE_APPEND);

if ($payload['ref'] === 'refs/heads/main') {
    $ftp_server = 'ftpupload.net';
    $ftp_username = 'if0_37026431';
    $ftp_password = '4YfLgftETD';

    $repo_url = 'https://api.github.com/repos/roginemy123/bantayan_island/contents/';
    $repo_user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

    $conn_id = ftp_connect($ftp_server);
    $login_result = ftp_login($conn_id, $ftp_username, $ftp_password);

    if ((!$conn_id) || (!$login_result)) {
        file_put_contents($logFile, "FTP connection failed\n", FILE_APPEND);
        exit;
    }

    ftp_pasv($conn_id, true);

    function download_and_upload_files($url, $path, $conn_id, $repo_user_agent, $logFile) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, $repo_user_agent);
        $response = curl_exec($ch);
        curl_close($ch);

        $files = json_decode($response, true);

        foreach ($files as $file) {
            if ($file['type'] == 'file') {
                $file_content = file_get_contents($file['download_url']);
                $local_file = 'local_' . basename($file['path']);
                file_put_contents($local_file, $file_content);

                $remote_file = 'htdocs/' . $path . basename($file['path']);
                if (ftp_put($conn_id, $remote_file, $local_file, FTP_BINARY)) {
                    file_put_contents($logFile, "Successfully uploaded $local_file to $remote_file\n", FILE_APPEND);
                } else {
                    file_put_contents($logFile, "Problem uploading $local_file\n", FILE_APPEND);
                }

                unlink($local_file);
            } elseif ($file['type'] == 'dir') {
                ftp_mkdir($conn_id, 'htdocs/' . $path . $file['name']);
                download_and_upload_files($file['url'], $path . $file['name'] . '/', $conn_id, $repo_user_agent, $logFile);
            }
        }
    }

    download_and_upload_files($repo_url, '', $conn_id, $repo_user_agent, $logFile);

    ftp_close($conn_id);
}

http_response_code(200);
echo 'Webhook received';
?>
