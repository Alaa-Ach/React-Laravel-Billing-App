<?php

namespace App\Http\Controllers;

use App\Models\Achat;
use App\Models\Product;
use Illuminate\Http\Request;

class AchatsController extends Controller
{
    //

    public function index(Request $request)
    {
        $products = $request->user()->achats()->get();
        return $products;
    }

    public function store(Request $request)
    {


        $achat = $request->user()->achats()->create(
            [
                'supplier' => $request['supplier'],
                'delivery_date' => $request['delivery_date'],
            ]
        );
        if (isset($request['products'])) {
            // Loop through each product in the provided products array
            foreach ($request['products'] as $productData) {
                // Create a product and link it to the command
                $achat->products()->create([
                    'product' => $productData['product'],
                    'description' => $productData['description'],
                    'quantity' => $productData['quantity'],
                    'price' => $productData['price'],
                    'tax' => $productData['tax'],
                    'hors_tax' => $productData['hors_tax'],
                ]);
            }
        }
        return $achat;
    }

    public function update(Achat $achat, Request $request)
    {



        $achat->update([
            'supplier' => $request['supplier'],
            'isPaid' => $request['isPaid'] ? 1 : 0,
            'delivery_date' => $request['delivery_date']
        ]);
        // return $request;
        // return $achat;

        // Retrieve all current product IDs associated with the command
        $currentProductIds = $achat->products->pluck('id')->toArray();

        // Get the list of product updates from the request (assuming the array of products is keyed by 'products')
        $products = $request->input('products', []);

        foreach ($products as $productData) {
            if (isset($productData['id'])) {
                // Update existing product
                Product::where('id', $productData['id'])->update([
                    'product' => $productData['product'],
                    'description' => $productData['description'],
                    'quantity' => $productData['quantity'],
                    'price' => $productData['price'],
                    'tax' => $productData['tax'],
                    'hors_tax' => $productData['hors_tax']
                ]);

                // Remove the id from $currentProductIds to avoid deletion later
                if (($key = array_search($productData['id'], $currentProductIds)) !== false) {
                    unset($currentProductIds[$key]);
                }
            } else {
                // Create new product
                $product = new Product([
                    'product' => $productData['product'],
                    'description' => $productData['description'],
                    'quantity' => $productData['quantity'],
                    'price' => $productData['price'],
                    'tax' => $productData['tax'],
                    'hors_tax' => $productData['hors_tax']
                ]);
                $achat->products()->save($product);
            }
        }
        // return $currentProductIds;
        // Delete any products not included in the request
        if (!empty($currentProductIds)) {
            Product::destroy($currentProductIds);
        }
    }

    public function delete(Product $product)
    {
        // return $product;
        $product->delete();
        return 'deleted';
    }
    public function indexOne(Achat $achat)
    {
        return $achat->load('products');
    }
}
