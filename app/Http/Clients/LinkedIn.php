<?php

namespace App\Http\Clients;

use App\Http\Clients\API;

class LinkedIn extends API
{
    const CONTENT_TYPE = 'application/json';
    const API_URL = 'https://www.linkedin.com/';
    const CLIENT_ID = '77u2qpy0nlqwra';
    const CLIENT_SECRET = 'dmlBaAJ10qeaMm1G';
    const GRANT_TYPE = 'authorization_code';
    const REDIRECT_URI = 'http://68.183.113.4';

    private $headers = [];
    
    public function __construct() {
        parent::__construct();
    }
    
    public function accessToken($code) {
        $request = [
            'url' => self::API_URL . 'oauth/v2/accessToken',
            'data' => [
                'grant_type' => self::GRANT_TYPE,
                'code' => $code,
                'redirect_uri' => self::REDIRECT_URI,
                'client_id' => self::CLIENT_ID,
                'client_secret' => self::CLIENT_SECRET
            ]
        ];
        
        $accessToken = $this->post($request, $this->headers);
        
        return $accessToken;
    }
    
  
    
}