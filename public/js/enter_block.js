
$(document).ready(function() {
    var enterBtn = $('#enter-btn');
    var enterBlock = $('#enter-block');
    var loaderBlock = $('#loader-block');
    var personIdInput = $('#person-id-input');
    
    function showLoaderBlock () {
        enterBlock.addClass('hide');
        loaderBlock.removeClass('hide');
    }
    
    function showEnterBlock () {
        loaderBlock.addClass('hide');
        enterBlock.removeClass('hide');
    }
    
    function displayTorreBio (data) {
        
    }
    
    function getTorreBio() {
        var personId = personIdInput.val();
        fetch('http://127.0.0.8/probio?torre_person_id=' + personId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
        });
    };
    
    enterBtn.click(function() {
        showLoaderBlock();
        getTorreBio();
    });
});
























