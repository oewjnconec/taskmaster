<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = 'data.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $data = file_get_contents($dataFile);
        echo $data;
    } else {
        echo json_encode([]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (is_array($input)) {
        $tasks = json_decode(file_get_contents($dataFile), true);
        $tasks[] = $input;
        file_put_contents($dataFile, json_encode($tasks));
        echo json_encode($tasks);
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Eliminar todas las tareas
    file_put_contents($dataFile, json_encode([]));
    echo json_encode(['message' => 'All tasks deleted']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>