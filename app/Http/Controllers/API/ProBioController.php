<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\ReadProBioJob;
use Illuminate\Support\Facades\Response;

class ProBioController extends Controller
{
    public function __construct() {
        
    }
    
    public function create() {
        
    }
    
    public function index(Request $request) {
        try {
            $torrePersonId = $request->input('torre_person_id');
            $linkedin_access_token = $request->input('linkedin_access_token');
            $proBio = $this->dispatch(new ReadProBioJob($torrePersonId, $linkedin_access_token));
            return Response::json([
                'data' => $proBio
            ]);
        } catch (Exception $ex) {

        }
    }
}