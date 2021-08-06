# Architecture:

### Frameworks:

-   Server Side Framework: `Laravel 8.*`
-   Javascript Framework: `Vuejs 2.6.*`

### System Requirements:

-   PHP >7.3 or 8.*
-   node/npm latest stable
-   composer latest stable

### Laravel Packages Installed

-   Authentication:

    -   `"laravel/ui"`


# Getting Started

1. Clone Repository

    `git clone https://github.com/M-yoshimura-ML/chat-app.git`

2. Install composer dependencies

    `composer install`

3. Install package dependencies

    `npm install`

4. Migrations and Seeders

    `php artisan migrate:refresh --seed`


5. Running Mix
   `npm run dev`

6. Begin Local Web Server

    `php artisan serve` or add your port `php artisan serve --port=8000`


7. Open your browser `http://127.0.0.1:8000/` or `http://127.0.0.1:8000/chat`
