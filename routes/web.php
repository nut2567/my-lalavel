<?php

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/profile', fn() => Inertia::render('Profile'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/weather', fn() => Inertia::render('Weather'));

$booksData = function (): Collection {
    return collect([
        ['title' => 'The Wind and the Sea', 'author' => 'Mara Lane', 'summary' => 'สำรวจการเดินเรือผ่านพายุและบทเรียนชีวิต'],
        ['title' => 'Fields of Dawn', 'author' => 'Anan Chai', 'summary' => 'เรื่องราวของชาวไร่ที่สร้างชุมชนสีเขียว'],
        ['title' => 'Circuit Dreams', 'author' => 'Dana Volt', 'summary' => 'นิยายไซไฟว่าด้วย AI ที่ค้นหาความหมายของความฝัน'],
        ['title' => 'The Quiet Orchard', 'author' => 'Liu Mei', 'summary' => 'บันทึกความทรงจำของสวนผลไม้ในหมู่บ้านเล็ก'],
        ['title' => 'River Letters', 'author' => 'Somchai P.', 'summary' => 'จดหมายรักที่ลอยตามแม่น้ำเจ้าพระยา'],
        ['title' => 'Glass Cities', 'author' => 'Yara Noor', 'summary' => 'โลกอนาคตที่สถาปัตยกรรมคือภาษา'],
        ['title' => 'Night Market', 'author' => 'Kanya W.', 'summary' => 'สืบสวนคดีปริศนาในตลาดกลางคืน'],
        ['title' => 'Echoes of Code', 'author' => 'Tech Dao', 'summary' => 'นักพัฒนาที่ฟังเสียงสะท้อนของโปรแกรมเก่า'],
        ['title' => 'Paper Planets', 'author' => 'Rin Nak', 'summary' => 'นิทานวิทยาศาสตร์สำหรับเด็กที่ชอบดวงดาว'],
        ['title' => 'Sunrise Over Siam', 'author' => 'Natee L.', 'summary' => 'แรงบันดาลใจจากผู้ประกอบการรุ่นใหม่ในไทย'],
        ['title' => 'Hidden Recipes', 'author' => 'Chef Mali', 'summary' => 'สูตรอาหารโบราณที่ถูกค้นพบใหม่'],
        ['title' => 'Rainy Alleys', 'author' => 'Tawan S.', 'summary' => 'นัวร์ดราม่าในตรอกฝนตกของกรุงเทพฯ'],
        ['title' => 'Stone and Silk', 'author' => 'Priya K.', 'summary' => 'ประวัติศาสตร์การค้าผ้าไหมกับหินมีค่า'],
        ['title' => 'Mountain Pulse', 'author' => 'Lek D.', 'summary' => 'การปีนเขาและการค้นหาตัวตน'],
        ['title' => 'Azure Notes', 'author' => 'Jia Hao', 'summary' => 'บทเพลงแจ๊สในเมืองท่าโบราณ'],
        ['title' => 'Lantern Codes', 'author' => 'Patcha L.', 'summary' => 'ปริศนารหัสในเทศกาลโคมไฟ'],
        ['title' => 'Harvest of Stars', 'author' => 'Arun M.', 'summary' => 'มนุษย์อพยพสู่ดวงดาวใหม่'],
        ['title' => 'Silent Library', 'author' => 'Noi Chan', 'summary' => 'บรรณารักษ์ที่เก็บความลับของผู้มาเยือน'],
        ['title' => 'Bamboo Lines', 'author' => 'Khun Ben', 'summary' => 'บทกวีร่วมสมัยจากภาคเหนือ'],
        ['title' => 'Parallel Gardens', 'author' => 'Meena R.', 'summary' => 'สองสวนที่อยู่คนละโลกแต่เชื่อมถึงกัน'],
    ]);
};

Route::get('/books/{page?}', function (int $page = 1) use ($booksData) {
    $perPage = 6;
    $items = $booksData();
    $totalItems = $items->count();
    $totalPages = (int) ceil($totalItems / $perPage);
    $currentPage = max(1, min($page, $totalPages));
    $pagedItems = $items->forPage($currentPage, $perPage)->values();

    return Inertia::render('Books', [
        'books' => $pagedItems,
        'pagination' => [
            'page' => $currentPage,
            'perPage' => $perPage,
            'totalPages' => $totalPages,
            'totalItems' => $totalItems,
        ],
    ]);
});

Route::get('/card', fn () => Inertia::render('Card'));

Route::get('/api/card/{page?}', function (Request $request, int $page = 1) use ($booksData) {
    $perPage = (int) $request->query('perPage', 6);
    $pageFromPath = $page;
    $pageFromQuery = (int) $request->query('page', $pageFromPath);

    $items = $booksData();
    $totalItems = $items->count();
    $totalPages = (int) ceil($totalItems / $perPage);
    $currentPage = max(1, min($pageFromQuery, $totalPages));
    $pagedItems = $items->forPage($currentPage, $perPage)->values();

    return response()->json([
        'data' => $pagedItems,
        'pagination' => [
            'page' => $currentPage,
            'perPage' => $perPage,
            'totalPages' => $totalPages,
            'totalItems' => $totalItems,
        ],
    ]);
});
