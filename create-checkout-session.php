<?php

require __DIR__ . '/stripe/init.php';

\Stripe\Stripe::setApiKey('sk_test_51KDtIyET23jqW2iQyrJlrU3Lq3S1sa5FXCeBIJEtoT9AMhzDBVcvE2CbxdxLvziDlMfLtkmFsGDtSk5fjeXfzyPL00z8lni8gs');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'https://iws107.informatik.htw-dresden.de/ewa/G08/ewa/';
$API_DOMAIN = "https://api.itbook.store/1.0/";

$public_key_for_js = "pk_test_51KDtIyET23jqW2iQaLFmxKgyt9evwqwh7ULN4ZhiOlW8Vbkc1a1uFCpqD2D8ZKXUeRrqrU4Qu1B5Ut59BFgDBodn001VVYoNTv";

$items = [];

foreach (json_decode(file_get_contents('php://input'), true)['items'] as $item) {
  $book_data = file_get_contents($API_DOMAIN . "books/" . $item['isbn']);

  if (!$book_data) {
    // Do something when the request fails
    //return
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

// print_r($items);
// echo '-------';
// foreach ($items as $item) {
//   print_r($item);
// }

$checkout_session = Stripe\Checkout\Session::create([
  'line_items' => $items,

  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '?success=true',
  'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
]);

echo json_encode($checkout_session);
