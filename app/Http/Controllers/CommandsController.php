<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Product;
use Illuminate\Http\Request;

class CommandsController extends Controller
{
    //

    public function index(Request $request)
    {
        $commands = $request->user()->commands()->get();
        return $commands;
    }

    public function store(Request $request)
    {


        $command = $request->user()->commands()->create(
            [
                'name' => $request['name'],
                'expiring_date' => $request['expiring_date'],
            ]
        );
        if (isset($request['products'])) {
            // Loop through each product in the provided products array
            foreach ($request['products'] as $productData) {
                // Create a product and link it to the command
                $command->products()->create([
                    'product' => $productData['product'],
                    'description' => $productData['description'],
                    'quantity' => $productData['quantity'],
                    'price' => $productData['price'],
                    'tax' => $productData['tax'],
                    'hors_tax' => $productData['hors_tax'],
                ]);
            }
        }
        return $command;
    }

    public function update(Commande $commande, Request $request)
    {



        $commande->update([
            'name' => $request['name'],
            'isPaid' => $request['isPaid'] ? 1 : 0,
            'expiring_date' => $request['expiring_date']
        ]);
        // return $request;
        // return $commande;

        // Retrieve all current product IDs associated with the command
        $currentProductIds = $commande->products->pluck('id')->toArray();

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
                // return $product;
                $commande->products()->save($product);
            }
        }
        // return $currentProductIds;
        // Delete any products not included in the request
        if (!empty($currentProductIds)) {
            Product::destroy($currentProductIds);
        }
    }

    public function delete(Commande $commande)
    {
        $commande->delete();
        return 'deleted';
    }
    public function indexOne(Commande $commande)
    {
        return $commande->load('products');
    }
}
