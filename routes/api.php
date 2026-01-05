<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/api/card/{page?}', [BookController::class, 'api']);
