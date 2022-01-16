<?php

require __DIR__ . '/stripe/init.php';

\Stripe\Stripe::setApiKey('sk_test_51KDtIyET23jqW2iQyrJlrU3Lq3S1sa5FXCeBIJEtoT9AMhzDBVcvE2CbxdxLvziDlMfLtkmFsGDtSk5fjeXfzyPL00z8lni8gs');

header('Content-Type: application/json');

$YOUR_DOMAIN = $_SERVER['HTTP_ORIGIN'];
$API_DOMAIN = "https://api.itbook.store/1.0/";

$items = [];

foreach (json_decode(file_get_contents('php://input'), true)['items'] as $item) {
  $book_data = file_get_contents($API_DOMAIN . "books/" . $item['isbn']);

  if (!$book_data) {
    echo "Error while retrieving book data of book with isbn " . $item['isbn'] . " from IT Book Store API.";
    http_response_code(500);
    return;
  }

  $book = json_decode($book_data, true);

  $product_data['name'] = $book['title'];
  $product_data['description'] = $book['desc'];
  $product_data['images'] = [$book['image']];

  $price_data['currency'] = 'USD';
  $price_data['product_data'] = $product_data;
  $price_data['unit_amount'] = floatval(substr($book['price'], 1)) * 100;
  $price_data['tax_behavior'] = 'exclusive';

  $book_item['price_data'] = $price_data;
  $book_item['quantity'] = $item['quantity'];

  $items[] = $book_item;
}


$checkout_session = Stripe\Checkout\Session::create([
  'line_items' => $items,

  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '#/success?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url' => $YOUR_DOMAIN . '#/cancel',
]);

echo json_encode($checkout_session);
