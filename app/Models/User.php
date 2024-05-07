<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function commands()
    {
        return $this->hasMany(Commande::class);
    }
    public function achats()
    {
        return $this->hasMany(Achat::class);
    }
    public function products()
    {
        return $this->hasManyThrough(
            Product::class,
            Commande::class,
            'user_id',
            'commande_id',
            'id',
            'id'
        )->select('products.id', 'products.product', 'products.description', 'products.quantity', 'products.price', 'products.quantity', 'products.tax', 'products.hors_tax', 'products.created_at');

    }
}
