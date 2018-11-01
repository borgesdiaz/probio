
$(document).ready(function() {
    var enterBtn = $('#enter-btn');
    var enterBlock = $('#enter-block');
    var loaderBlock = $('#loader-block');
    var profileBlock = $('#profile-block');
    var personIdInput = $('#person-id-input');
    var invalidPersonIdAlert = $('#invalid-person-id-alert');
    var name = $('#name');
    var picture = $('#picture');
    var professionalHeadline = $('#professional-headline');
    var totalRecommendations = $('#total-recommendations');
    
    function showLoaderBlock () {
        hide(enterBlock);
        hide(profileBlock);
        show(loaderBlock);
    };
    
    function showEnterBlock () {
        hide(loaderBlock);
        hide(profileBlock);
        show(enterBlock);
    };
    
    function showProfileBlock() {
        hide(loaderBlock);
        hide(enterBlock);
        show(profileBlock);
    };
    
    function showInvalidPersonIdAlert() {
        show(invalidPersonIdAlert);
    };
    
    function hideInvalidPersonIdAlert() {
        hide(invalidPersonIdAlert);
    };
    
    function displayTorreBio (data) {
        var torreBio = data.data;
        var achievements = torreBio.achievements;
        var recommendations = torreBio.recommendations;
        var recommendationsCount = torreBio.recommendations_count;
        var jobs = torreBio.jobs;
        var projects = torreBio.projects;
        var education = torreBio.education;
        var publications = torreBio.publications;
        var people = torreBio.people;
        var bios = torreBio.bios;
        var interests = torreBio.interests;
        
        //Display Headline
        picture.attr('src', people.picture);
        name.html(people.name);
        professionalHeadline.html(people.professionalHeadline);
        totalRecommendations.html(recommendationsCount);
        
        //Display Interests
        
        
        
        showProfileBlock();
    };
    
    function responseError (data) {
        showInvalidPersonIdAlert();
        showEnterBlock();
    };
    
    function getTorreBio() {
        var personId = personIdInput.val();
        fetch('http://127.0.0.8/api/probio?torre_person_id=' + personId)
            .then((response) => {
                return response.json();
            }).then((data) => {
                displayTorreBio(data);
            }).catch((error) => {
                responseError(error);
            });
    };
    
    enterBtn.click(function() {
        hideInvalidPersonIdAlert();
        showLoaderBlock();
        getTorreBio();
    });
});
























