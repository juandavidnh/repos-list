//https://api.github.com
'use strict';

function generateURL(username){
    return `https://api.github.com/users/${username}/repos`;
}

function fetchResults(URL){
    fetch(URL)
    .then(response =>{
        console.log(response);
        if (response.ok){
            $('#js-error-message').empty();
            return response.json();
        }else{
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(results){
    $('#results-list').empty();
    
    for(let i=0; i<results.length; i++){
        $('#results-list').append(
            `
            <li><a href ="${results[i].html_url}" target="_blank">${results[i].name}</a></li>
            `
        )
    }

    $('#results').removeClass('hidden');
    
}

function watchForm(){
    $('form').submit(event =>{
        console.log('search submitted');
        event.preventDefault();
        const searchTerm = $('#repo-handle').val();
        console.log(searchTerm);
        const url = generateURL(searchTerm);
        fetchResults(url);
    })
}

$(watchForm);
