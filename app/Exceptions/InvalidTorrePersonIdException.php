<?php

namespace App\Exceptions;

use Exception;

class InvalidTorrePersonIdException extends Exception
{
    protected $message = 'Invalid Torre Person ID';
}
