
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
    var location = $('#location');
    var longBio = $('#long-bio');
    var weight = $('#weight');
    var strengthCount = $('#strength-count');
    
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
        var bios = torreBio.bios;
        var achievements = bios.achievements;
        var recommendations = torreBio.recommendations;
        var recommendationsCount = torreBio.recommendations_count;
        var jobs = bios.jobs;
        var projects = bios.projects;
        var education = torreBio.education;
        var publications = bios.publications;
        var people = bios.person;
        
        var opportunities = bios.opportunities;
        var aspirations = bios.aspirations;
        var strengths = bios.strengths;
        
        //Display Headline
        picture.attr('src', people.picture);
        name.html(people.name);
        professionalHeadline.html(people.professionalHeadline);
        totalRecommendations.html(recommendationsCount);
        
        //Display Interests
        var interestsPrefix = $('<span>Interested in </span>');
        interestsPrefix.appendTo('#interests');
        for (var i = 0; i < opportunities.length; i++) {
            var opportunityName = opportunities[i].name;
            if ((i + 1) === opportunities.length) {
                var text = 'and ' + opportunityName + '.';
            } else {
                var text = opportunityName + ', ';
            }
            
            var interest = $('<span>' + text + '</span>');
            interest.appendTo('#interests');
        }
        
        //Display Location
        location.html(people.location);
        
        //Display Links
        for (var i = 0; i < people.links.length; i++) {
            var linkData = people.links[i];
            var link = $('<a href=' + linkData.address + '> ' + linkData.name + ' </span>');
            link.appendTo('#links');
        }
        
        //Display Long Bio
        
        longBio.html(people.summaryOfBio);
        
        
        //Display Aspirations
        for (var i = 0; i < aspirations.length; i++) {
            var aspirationName = aspirations[i].name;
            var aspiration = $('<p>' + aspirationName + '</p>');
            aspiration.appendTo('#aspirations');
        }
        
        var aspirationPicture = $('<img src=' + people.picture + '>');
        aspirationPicture.appendTo('#aspirations');
        
        //Display Recommendations
        
        //@Todo
        
        //Display Reputation Weight
        
       weight.html(people.weight);
       
       //Display Skills
       
       for (var i = 0; i < strengths.length; i++) {
            var strengthName = strengths[i].name;
            var strength = $('<span> ' + strengthName + ' </span>');
            strength.appendTo('#strengths');
        }
        
        strengthCount.html(strengths.length);
        
        //Display Achievements
        
        for (var i = 0; i < achievements.length; i++) {
            var achievement = achievements[i];
            var achievementName = achievement.name;
            var when = achievement.fromMonth + ' ' + achievement.fromYear;
            var strength = $('<p> ' + achievementName + ' </p>');
            strength.appendTo('#strengths');
        }
        
        showProfileBlock();
    };
    
    function responseError (data) {
        showInvalidPersonIdAlert();
        showEnterBlock();
    };
    
    function getTorreBio() {
        var personId = personIdInput.val();
        fetch('http://68.183.113.4/api/probio?torre_person_id=' + personId)
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
























