
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
    var achievementCount = $('#achievement-count');
    var jobCount = $('#job-count');
    var projectCount = $('#project-count');
    var educationCount = $('#education-count');
    var pubCount = $('#publication-count');
    var linkedInBtn = $('.btn-linkedin');
    var profileData = $('.profile-data');
    
    function showLoaderBlock () {
        profileData.html('');
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
    
    function responseError (data) {
        showInvalidPersonIdAlert();
        showEnterBlock();
    };
    
    function getTorreBio(authToken) {
        var personId = personIdInput.val();
        var url = 'http://68.183.113.4/api/probio?torre_person_id=' + personId;
        if (authToken) {
            url += '&linkedin_access_token=' + authToken;
        }
        
        fetch(url)
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
        var person = bios.person;
        
        var opportunities = bios.opportunities;
        var aspirations = bios.aspirations;
        var strengths = bios.strengths;
        
        //Display Headline
        picture.attr('src', person.picture);
        name.html(person.name);
        professionalHeadline.html(person.professionalHeadline);
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
        location.html(person.location);
        
        //Display Links
        for (var i = 0; i < person.links.length; i++) {
            var linkData = person.links[i];
            var link = $('<a href=' + linkData.address + '> ' + 
                         "<li class='fab fa-" + linkData.name + "'" + "></i>"  
                        + ' </span>');
            link.appendTo('#links');
        }

        //Display Long Bio
        
        longBio.html(person.summaryOfBio);
        
        
        //Display Aspirations
        for (var i = 0; i < aspirations.length; i++) {
            var aspirationName = aspirations[i].name;
            var aspiration = $('<p>' + aspirationName + '</p>');
            aspiration.appendTo('#aspirations');
        }

        var aspirationPicture = $('<img src=' + person.picture + '>');
        aspirationPicture.appendTo('#aspirations');

        
        //Display Recommendations
        
        //@Todo
        
        //Display Reputation Weight
        
       weight.html(person.weight);
       console.log('8');
       //Display Skills
       
       for (var i = 0; i < 6; i++) {
           if (i === strengths.length) {
               break;
           }
           
            var strengthName = strengths[i].name;
            var strength = $('<span> ' + strengthName + ' </span>');
            strength.appendTo('#strengths');
        }

        strengthCount.html(strengths.length);
        
        //Display Achievements
        
        for (var i = 0; i < 5; i++) {
            if (i === achievements.length) {
                break;
            }
            
            var achievementHeadline = $('<div>');
            var achievementFooter = $('<div>');
            var achievementContainer = $('<div>');
            
            var achievement = achievements[i];
            var achievementName = $('<h5>' + achievement.name + '</h5>');
            achievementHeadline.append(achievementName);
            
            var organizations = achievement.organizations;
            for (var n = 0; n < 3; n++) {
                if (n === organizations.length) {
                    break;
                }
                
                var organization = organizations[n];
                var organizationName = $('<p>' + organization.name + '</p>');
                achievementHeadline.append(organizationName);
            }
            
            achievementContainer.append(achievementHeadline);
            
            var when = achievement.fromMonth + ' ' + achievement.fromYear;
            var whenEl = $('<p> ' + when + ' </p>');
            achievementFooter.append(whenEl);
            
            var verifyLink = $('<a href=#>VERIFY IT</a>');
            achievementFooter.append(verifyLink);
            
            achievementContainer.append(achievementFooter);
            achievementContainer.appendTo('#achievements');
        }

        achievementCount.html(achievements.length);
        
        //Display Jobs
        for (var i = 0; i < 5; i++) {
            if (i === jobs.length) {
                break;
            }
            
            var jobHeadline = $('<div>');
            var jobFooter = $('<div>');
            var jobContainer = $('<div>');
            
            var job = jobs[i];
            var jobRole = $('<h5>' + job.role + '</h5>');
            jobHeadline.append(jobRole);

            var organization = job.organizations[0];
            if (organization) {
                var organizationName = $('<p>' + organization.name + '</p>');
                jobHeadline.append(organizationName);
            }
            
            jobContainer.append(jobHeadline);
            
            var fromWhen = job.fromMonth + ' ' + job.fromYear;
            var toWhen = job.toMonth + ' ' + job.toYear;
            var when = fromWhen + ' - ' + toWhen;
            var whenEl = $('<p> ' + when + ' </p>');
            jobFooter.append(whenEl);
            
            var verifyLink = $('<a href=#>VERIFY IT</a>');
            jobFooter.append(verifyLink);
            
            jobContainer.append(jobFooter);
            jobContainer.appendTo('#jobs');
        }

        jobCount.html(jobs.length);
        
        //Display Projects
        for (var i = 0; i < 5; i++) {
            if (i === projects.length) {
                break;
            }
            
            var projectHeadline = $('<div>');
            var projectFooter = $('<div>');
            var projectContainer = $('<div>');
            
            var project = projects[i];
            var projectName = $('<h5>' + project.name + '</h5>');
            projectHeadline.append(projectName);

            var organization = project.organizations[0];
            if (organization) {
                var organizationName = $('<p>' + organization.name + '</p>');
                projectHeadline.append(organizationName);
            }
            
            projectContainer.append(projectHeadline);
            
            var fromWhen = job.fromMonth + ' ' + job.fromYear;
            var toWhen = job.toMonth + ' ' + job.toYear;
            var when = fromWhen + ' - ' + toWhen;
            var whenEl = $('<p> ' + when + ' </p>');
            projectFooter.append(whenEl);
            
            var verifyLink = $('<a href=#>VERIFY IT</a>');
            projectFooter.append(verifyLink);
            
            projectContainer.append(jobFooter);
            projectContainer.appendTo('#projects');
        }

        projectCount.html(projects.length);
        
        educationCount.html(education.length);
        
        //Display Publications
        for (var i = 0; i < 5; i++) {
            if (i === publications.length) {
                break;
            }
            
            var pubHeadline = $('<div>');
            var pubFooter = $('<div>');
            var pubContainer = $('<div>');
            
            var pub = publications[i];
            var pubName = $('<h5>' + pub.name + '</h5>');
            pubHeadline.append(pubName);

            var organization = project.organizations[0];
            if (organization) {
                var organizationName = $('<p>' + organization.name + '</p>');
                pubHeadline.append(organizationName);
            }
            
            var contribution = $('<p>Contribution: ' + pub.contributions + '</p>');
            pubHeadline.append(contribution);
            
            pubContainer.append(pubHeadline);
            
            var when = job.fromMonth + ' ' + job.fromYear;
            var whenEl = $('<p> ' + when + ' </p>');
            pubFooter.append(whenEl);
            
            var verifyLink = $('<a href=#>VERIFY IT</a>');
            pubFooter.append(verifyLink);
            
            pubContainer.append(pubFooter);
            pubContainer.appendTo('#publications');
        }

        pubCount.html(publications.length);
        
        showProfileBlock();
    };
    
    linkedInBtn.click(function() {
        IN.User.authorize(authSuccess);
    });
    
    function authSuccess(data) {
        IN.API.Raw("/people/~")
        .result(function(data) {
            var token = IN.ENV.auth.oauth_token;
            hideInvalidPersonIdAlert();
            showLoaderBlock();
            getTorreBio(token);
        }).error(function(error) {
            
        });
    }
});