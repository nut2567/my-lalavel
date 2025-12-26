<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Book List - SSR Demo</title>

    <style>
        :root {
            font-family: "Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            background-color: #f7f8fb;
            color: #1f1f1f;
        }

        body {
            margin: 0;
            min-height: 100vh;
        }

        .page {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px 20px 48px;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 24px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }

        .subtitle {
            margin: 4px 0 0;
            color: #5c5f66;
            font-size: 14px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 16px;
        }

        .card {
            background: #fff;
            border: 1px solid #e6e8ed;
            border-radius: 10px;
            padding: 16px 16px 14px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
        }

        .card h3 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .meta {
            margin: 0 0 10px;
            color: #69707a;
            font-size: 13px;
        }

        .summary {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
        }

        .pagination {
            margin-top: 28px;
            display: flex;
            align-items: center;
            gap: 6px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .page-link {
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #d7dbe5;
            text-decoration: none;
            color: #1f1f1f;
            font-size: 14px;
            background: #fff;
            transition: all 0.15s ease;
        }

        .page-link:hover {
            border-color: #b6c0d6;
        }

        .page-link.active {
            background: #1677ff;
            color: #fff;
            border-color: #1677ff;
        }

        .page-link.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    </style>
</head>

<body>
    <div class="page">
        <div class="header">
            <div>
                <p class="title">รายการหนังสือ (SSR)</p>
                <p class="subtitle">ตัวอย่างเรนเดอร์ฝั่งเซิร์ฟเวอร์พร้อมแบ่งหน้า /book/{page}</p>
            </div>
            <a href="/" class="page-link">กลับหน้า React</a>
        </div>

        <div class="grid">
            @foreach ($books as $book)
                <div class="card">
                    <h3>{{ $book['title'] }}</h3>
                    <p class="meta">โดย {{ $book['author'] }}</p>
                    <p class="summary">{{ $book['summary'] }}</p>
                </div>
            @endforeach
        </div>

        <div class="pagination">
            <a class="page-link {{ $currentPage === 1 ? 'disabled' : '' }}"
                href="{{ url('/book/' . max(1, $currentPage - 1)) }}">ก่อนหน้า</a>

            @for ($i = 1; $i <= $totalPages; $i++)
                <a class="page-link {{ $i === $currentPage ? 'active' : '' }}" href="{{ url('/book/' . $i) }}">
                    {{ $i }}
                </a>
            @endfor

            <a class="page-link {{ $currentPage === $totalPages ? 'disabled' : '' }}"
                href="{{ url('/book/' . min($totalPages, $currentPage + 1)) }}">ถัดไป</a>
        </div>
    </div>
</body>

</html>
