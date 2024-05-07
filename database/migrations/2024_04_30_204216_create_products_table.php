<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commande_id')->nullable();  // Foreign key to the commands table
            $table->string('product');
            $table->text('description')->nullable();
            $table->integer('quantity');
            $table->decimal('price');
            $table->decimal('tax');
            $table->decimal('hors_tax');  // Assuming this is the price before tax

            $table->foreign('commande_id')->references('id')->on('commandes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
