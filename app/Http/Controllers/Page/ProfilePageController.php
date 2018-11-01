<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use View;

class ProfilePageController extends Controller
{
    
    public function index() {
        $data = [
            'title' => 'Profile'
        ];
      
        return View::make('profile', $data);
    }
}