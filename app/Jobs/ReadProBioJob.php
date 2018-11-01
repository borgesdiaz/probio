<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Exceptions\InvalidTorrePersonIdException;
use Guzzle\Http\Exception\ClientErrorResponseException;
use App\Http\Clients\Torre;

class ReadProBioJob
{
    private $torrePersonId;
    
    use Dispatchable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($torre_person_id = null)
    {
        $this->torrePersonId = $torre_person_id;
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

        
        $response = [
            'recommendations' => $recommendations,
            'recommendation_count' => count($recommendations),
            'education' => $education,
            'bios' => $bios
        ];
        
        return $response;
    }
}