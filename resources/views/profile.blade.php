<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
        
        <!-- LinkedIn Javascript SDK Auth -->
        
        <script src="{{URL::asset('js/linkedin_auth.js')}}"></script>
        <script type="text/javascript" src="//platform.linkedin.com/in.js">
            api_key: 77u2qpy0nlqwra
            onLoad: onloadSuccess
        </script>
        
        <!-- App JS -->
        
        <script src="{{URL::asset('js/enter_block.js')}}"></script>
        
        <!-- App Styles -->
        
        <link href="{{URL::asset('css/global.css')}}" rel="stylesheet">
        <link href="{{URL::asset('css/enter_block.css')}}" rel="stylesheet">

    </head>
    <body>
        <div class="container">
            <div id="enter-block" class="text-center">
                <h5>Welcome to ProBio</h5>
                <div id="enter-form-container" class="box-container">
                    <p>Enter Your Torre Person ID</p>
                    <form id="enter-form">
                        <div class="form-group">
                            <input type="text" name="personId" id="person-id-input" class="form-control">
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-primary" id="enter-btn">Enter</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div id="profile-block" class="text-center hide">
                <h5>ProBio Profile</h5> 
            </div>
            
            <div id="loader-block" class="text-center hide">
                <p>Give us a moment while we pull up your profile</p>
                <i class="fa fa-spinner fa-spin fa-7x blue-text" aria-hidden="true"></i>
            </div>
        </div>
    </body>
</html>



















