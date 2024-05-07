<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Product;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    //

    public function index()
    {

        $results = Commande::select('name as employé')
            ->addSelect(\DB::raw('COUNT(DISTINCT commandes.id) as total_des_ventes'))
            ->addSelect(\DB::raw('SUM(products.quantity) as total_quantite'))
            // ->addSelect(\DB::raw('SUM(products.price *products.quantity ) as total_achats'))
            ->join('products', 'commandes.id', '=', 'products.commande_id')
            ->groupBy('commandes.name')
            ->get();
        return $results;
    }
}
