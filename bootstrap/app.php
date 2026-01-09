<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web([
            \App\Http\Middleware\HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, $request) {
            if ($e instanceof AuthenticationException) {
                return redirect()->guest(route('login'));
            }


            $status = $e instanceof HttpExceptionInterface
                ? $e->getStatusCode()
                : 500;

            // Treat GET/HEAD MethodNotAllowed (e.g. missing show routes) as 404 so UI error page is shown.
            if ($e instanceof MethodNotAllowedHttpException && $request->isMethodSafe()) {
                $status = 404;
            }

            return Inertia::render('Error', [
                'status' => $status,
            ])->toResponse($request)->setStatusCode($status);
        });
    })->create();
