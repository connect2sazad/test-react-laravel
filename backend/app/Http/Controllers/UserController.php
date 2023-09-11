<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function login(Request $req){
        
        $user = User::where('email', $req->email)->first();
        if(!$user){
            return ["status" => 0, "msg" => "No such user exists!"];
        }
        if (!$user || !Hash::check(base64_decode($req->password), $user->password)) {
            return ["status" => 0, "msg" => "Incorrect Creds"];
        } else {
            $user['status'] = 1;
        }

        return $user;
    }

    function register(Request $req){
        $user = new User;

        $email_check = User::where('email', $req->email)->first();
        if ($email_check) {
            return ["status" => 0, "msg" => "An account with this email already exists!"];
        }
        $phn_check = User::where('contact', $req->contact)->first();
        if ($phn_check) {
            return ["status" => 0, "msg" => "A account with this Phone No  already exists!"];
        }

        $user->name = $req->input('name');
        $user->contact = $req->input('contact');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));

        if($user->save()){
            $user['status'] = 1;
            return $user;
        } else{
            return array('status' => 0, 'msg' => 'Error in registering user');
        }
    }
}
