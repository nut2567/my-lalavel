<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Book::insert([
            [
                'title' => 'The Wind and the Sea',
                'author' => 'Mara Lane',
                'summary' => 'A voyage through storms and the lessons learned at sea.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Fields of Dawn',
                'author' => 'Anan Chai',
                'summary' => 'Stories of farmers building a thriving green community.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Circuit Dreams',
                'author' => 'Dana Volt',
                'summary' => 'Sci-fi tale of an AI searching for the meaning of dreams.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'River Letters',
                'author' => 'Somchai P.',
                'summary' => 'Love letters drifting along the Chao Phraya river.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Night Market',
                'author' => 'Kanya W.',
                'summary' => 'A mystery that unfolds in the vibrant night bazaar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Lantern Codes',
                'author' => 'Patcha L.',
                'summary' => 'Festival lanterns hide a set of cryptic messages.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
