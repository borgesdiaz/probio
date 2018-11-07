<?php

namespace App\Jobs;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Exceptions\InvalidTorrePersonIdException;
use App\Http\Clients\Torre;
use App\Http\Clients\LinkedIn;

class ReadProBioJob
{
    private $torrePersonId;
    private $linkedinAccessToken;
    
    use Dispatchable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($torre_person_id = null, $linkedin_access_token = null)
    {
        $this->torrePersonId = $torre_person_id;
        $this->linkedinAccessToken = $linkedin_access_token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (!$this->torrePersonId) {
            throw new InvalidTorrePersonIdException;
        }
        
        $torreClient = new Torre;
        $recommendations = $torreClient->recommendations($this->torrePersonId);
        $education = $torreClient->education($this->torrePersonId);
        $bios = $torreClient->bios($this->torrePersonId);
        
        if ($this->linkedinAccessToken) {
            //Todo: Fetch the real access token from LinkedIn
            //$linkedin = new LinkedIn;
            //$result = $linkedin->accessToken($this->linkedinAccessToken);
        }
        
        $response = [
            'recommendations' => $recommendations,
            'recommendation_count' => count($recommendations),
            'education' => $education,
            'bios' => $bios
        ];
        
        return $response;
    }
}