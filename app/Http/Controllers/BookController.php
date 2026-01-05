<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    private const DEFAULT_PER_PAGE = 6;

    public function index(Request $request): Response
    {
        $perPage = max(1, (int) $request->query('perPage', self::DEFAULT_PER_PAGE));
        $books = Book::query()
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Books', [
            'books' => $books->items(),
            'pagination' => [
                'page' => $books->currentPage(),
                'perPage' => $books->perPage(),
                'totalPages' => max(1, $books->lastPage()),
                'totalItems' => $books->total(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Books/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateBook($request);
        Book::create($data);

        return redirect()
            ->route('books.index')
            ->with('success', 'Book created successfully.');
    }

    public function edit(Book $book): Response
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
        ]);
    }

    public function update(Request $request, Book $book): RedirectResponse
    {
        $data = $this->validateBook($request);
        $book->update($data);

        return redirect()
            ->route('books.index')
            ->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return redirect()
            ->route('books.index')
            ->with('success', 'Book deleted.');
    }

    public function api(Request $request, int $page = 1): JsonResponse
    {
        $perPage = max(1, (int) $request->query('perPage', self::DEFAULT_PER_PAGE));
        $pageFromQuery = max(1, (int) $request->query('page', $page));

        $paginator = Book::query()
            ->latest()
            ->paginate($perPage, ['*'], 'page', $pageFromQuery);

        return response()->json([
            'data' => $paginator->items(),
            'pagination' => [
                'page' => $paginator->currentPage(),
                'perPage' => $paginator->perPage(),
                'totalPages' => max(1, $paginator->lastPage()),
                'totalItems' => $paginator->total(),
            ],
        ]);
    }

    private function validateBook(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
        ]);
    }
}
