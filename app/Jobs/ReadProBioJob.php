<?php

namespace App\Jobs;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Exceptions\InvalidTorrePersonIdException;
use App\Http\Clients\Torre;

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
            $linkedin = new \Happyr\LinkedIn\LinkedIn(Torre::CLIENT_ID, Torre::CLIENT_SECRET);  
            $linkedin->setAccessToken($this->linkedinAccessToken);
            if ($linkedin->isAuthenticated()) {
                //Always false
            }
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