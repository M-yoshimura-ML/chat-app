<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function chat(){
        return view('chat');
    }

    public function send(Request $request){
        $user=User::find(Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message,$user));
    }

    public function saveToSession(Request $request){
        session()->put('chat',$request->chat);
    }

    public function getOldMessages(){
        return session('chat');
    }
}
