<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home']);
Route::get('/profile', [PageController::class, 'profile']);
Route::get('/login', [PageController::class, 'login']);
Route::get('/weather', [PageController::class, 'weather']);
Route::get('/card', [PageController::class, 'card']);


Route::resource('books', BookController::class)->except(['show']);
require __DIR__ . '/api.php';
