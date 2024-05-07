<?php

use App\Http\Controllers\AchatsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandsController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect('/login');
});


Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/', function () {
    //     return Inertia::render('Dashboard');
    // })->name('dashboard');

    Route::get('/ventes', function () {
        return Inertia::render('Ventes');
    })->name('ventes');
    Route::get('/achats', function () {
        return Inertia::render('Achats');
    })->name('achats');


    Route::prefix('api')->group(function () {
        // client
        Route::get('/clients', [ClientController::class, 'index']);

        // product
        Route::get('/products', [ProductsController::class, 'index']);
        Route::delete('/products/{product}', [ProductsController::class, 'delete']);
        // command
        Route::get('/commands', [CommandsController::class, 'index']);
        Route::post('/commands', [CommandsController::class, 'store']);
        Route::delete('/commands/{commande}', [CommandsController::class, 'delete']);
        Route::get('/commands/{commande}', [CommandsController::class, 'indexOne']);
        Route::put('/commands/{commande}', [CommandsController::class, 'update']);
        // achat
        Route::get('/achats', [AchatsController::class, 'index']);
        Route::post('/achats', [AchatsController::class, 'store']);
        Route::delete('/achats/{achat}', [AchatsController::class, 'delete']);
        Route::get('/achats/{achat}', [AchatsController::class, 'indexOne']);
        Route::put('/achats/{achat}', [AchatsController::class, 'update']);

    });
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
