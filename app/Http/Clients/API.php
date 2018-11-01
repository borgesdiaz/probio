<?php

namespace App\Http\Clients;

use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Psr7\Request as GuzzleRequest;

abstract class API
{
    private $guzzleClient;
    
    public function __construct() {
        $this->guzzleClient = new GuzzleClient;
    }
    
    public function post($request, $headers) {
        $url = $request['url'];
        $response = $this->guzzleClient->request('POST', $url, $request['data']);
        return json_decode($response->getBody()->getContents(), true);
    }
    
    public function get($request, $headers) {
        $url = $request['url'] . '?';
        $params = $request['params'];
        $i = 1;
        
        foreach ($params as $param => $value) {
            $url .= $param . '=' . $value;
            $url .= (count($params) > $i) ? '&' : '';
            $i++;
        }
        
        $requestObj = new GuzzleRequest('GET', $url, $headers);
        $response = $this->guzzleClient->send($requestObj);
        return json_decode($response->getBody()->getContents(), true);
        
    }
    
    public function put($request, $headers, $data) {
        
    }
    
    public function delete($request, $headers) {
        $url = $request['url'];
        $response = $this->guzzleClient->request('DELETE', $url, $request['data']);
        return json_decode($response->getBody()->getContents(), true);
    }
}
