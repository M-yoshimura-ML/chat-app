<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix'=> '/', 'middleware'=>'auth'],function(){
    Route::get('chat', [App\Http\Controllers\ChatController::class,'chat']);
    Route::post('send', [App\Http\Controllers\ChatController::class,'send']);
    Route::post('getOldMessages', [App\Http\Controllers\ChatController::class,'getOldMessages']);
    Route::post('saveToSession', [App\Http\Controllers\ChatController::class,'saveToSession']);
    Route::get('check', function(){
       return session('chat');
    });
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

