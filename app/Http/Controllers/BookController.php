<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    private const DEFAULT_PER_PAGE = 6;

    public function index(int $page = 1): Response
    {
        [$books, $pagination] = $this->paginate($page, self::DEFAULT_PER_PAGE);

        return Inertia::render('Books', [
            'books' => $books,
            'pagination' => $pagination,
        ]);
    }

    public function api(Request $request, int $page = 1): JsonResponse
    {
        $perPage = (int) $request->query('perPage', self::DEFAULT_PER_PAGE);
        $pageFromQuery = (int) $request->query('page', $page);

        [$books, $pagination] = $this->paginate($pageFromQuery, $perPage);

        return response()->json([
            'data' => $books,
            'pagination' => $pagination,
        ]);
    }

    /**
     * @return array{0: \Illuminate\Support\Collection, 1: array{page: int, perPage: int, totalPages: int, totalItems: int}}
     */
    private function paginate(int $page, int $perPage): array
    {
        $items = $this->booksData();
        $totalItems = $items->count();
        $totalPages = (int) ceil($totalItems / $perPage);
        $currentPage = max(1, min($page, $totalPages));

        return [
            $items->forPage($currentPage, $perPage)->values(),
            [
                'page' => $currentPage,
                'perPage' => $perPage,
                'totalPages' => $totalPages,
                'totalItems' => $totalItems,
            ],
        ];
    }

    private function booksData(): Collection
    {
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
    }
}
