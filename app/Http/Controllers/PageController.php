<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function profile(): Response
    {
        return Inertia::render('Profile');
    }

    public function login(): Response
    {
        return Inertia::render('Login');
    }

    public function weather(): Response
    {
        return Inertia::render('Weather');
    }

    public function card(): Response
    {
        return Inertia::render('Card');
    }
}
