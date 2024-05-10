<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['product', 'description', 'quantity', 'price', 'tax', 'hors_tax', 'commande_id'];


    public function command()
    {
        return $this->belongsTo(Commande::class);
    }

    public function scopeSearch($query, $keyword)
    {
        if (!empty($keyword)) {
            return $query->where(function ($query) use ($keyword) {
                $query->where('product', 'like', "%{$keyword}%");
            });
        }

        return $query;
    }
}
