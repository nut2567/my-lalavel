<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'home']);
Route::get('/weather', [PageController::class, 'weather']);
Route::get('/login', [PageController::class, 'login'])->name('login');

// Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/profile', [PageController::class, 'profile']);
Route::resource('books', BookController::class)->except(['show']);
// });

Route::get('/card', [PageController::class, 'card']);
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

require __DIR__ . '/api.php';
