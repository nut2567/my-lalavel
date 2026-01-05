<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::get('/card/{page?}', [BookController::class, 'api']);
