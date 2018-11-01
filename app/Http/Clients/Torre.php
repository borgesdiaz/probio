<?php

namespace App\Http\Clients;

use App\Http\Clients\API;

class Torre extends API
{
    const CONTENT_TYPE = 'application/json';
    const BIOS_URL = 'https://torre.bio/api/bios/';
    const API_URL = 'https://torre.bio/api/';
    const CLIENT_ID = '77u2qpy0nlqwra';
    const CLIENT_SECRET = 'dmlBaAJ10qeaMm1G';

    private $headers = [];
    
    public function __construct() {
        parent::__construct();
    }
    
    public function achievements($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/achievements',
            'params' => [
                
            ]
        ];
        
        $achievements = $this->get($request, $this->headers);

        
        return $achievements;
    }
    
    
    public function recommendations($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/recommendations',
            'params' => [
                
            ]
        ];
        
        $recommendations = $this->get($request, $this->headers);

        
        return $recommendations;
    }
    
    public function jobs($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/jobs',
            'params' => [
                
            ]
        ];
        
        $jobs = $this->get($request, $this->headers);

        
        return $jobs;
    }
    
    public function projects($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/projects',
            'params' => [
                
            ]
        ];
        
        $projects = $this->get($request, $this->headers);

        
        return $projects;
    }
    
    public function education($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/education',
            'params' => [
                
            ]
        ];
        
        $education = $this->get($request, $this->headers);

        
        return $education;
    }
    
    public function publications($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/publications',
            'params' => [
                
            ]
        ];
        
        $publications = $this->get($request, $this->headers);

        
        return $publications;
    }
    
    public function people($personId) {
        $request = [
            'url' => self::API_URL . 'people/' . $personId,
            'params' => [
                
            ]
        ];
        
        $people = $this->get($request, $this->headers);

        
        return $people;
    }
    
    public function bios($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId,
            'params' => [
                
            ]
        ];
        
        $bios = $this->get($request, $this->headers);

        
        return $bios;
    }
    
    public function interested($personId) {
        $request = [
            'url' => self::BIOS_URL . $personId . '/interests',
            'params' => [
                
            ]
        ];
        
        $interested = $this->get($request, $this->headers);

        
        return $interested;
    }
    
}