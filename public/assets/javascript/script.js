(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCib7BaMompwcBL6HfHHnHvg8prgDA_43I",
        authDomain: "blackjack-jfe.firebaseapp.com",
        databaseURL: "https://blackjack-jfe.firebaseio.com",
        projectId: "blackjack-jfe",
        storageBucket: "blackjack-jfe.appspot.com",
        messagingSenderId: "740626139603"
    }

    firebase.initializeApp(config)

    let db = firebase.database()

    let provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken
        // The signed-in user info.
        let user = result.user
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // The email of the user's account used.
        let email = error.email
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential
        // ...
    })

    const addCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let converter = new showdown.Converter()

    class Player {
        constructor(name) {
            this.name = name
        }
    }

    let opp = new Player('joey')

    console.log(opp)

    $.get('https://api.github.com/repos/josephemswiler/blackjack/readme').then(function (response) {
        $.get(response.download_url, function (data) {
            let html = converter.makeHtml(data)
            $('.about-readme').html(html)
        }).then(function () {
            let hr = $('<hr>')
                .addClass('my-4')
            $('.about-readme h1').append(hr)
            $('.about-readme ul').addClass('list-group list-group-item-action')
            $('.about-readme li').addClass('list-group-item list-group-item-action')
            $('.about-readme a').attr('target', '_blank')
        })
    })

    $('.nav-link').click(function () {

        if ($(this).parent().hasClass('active')) {} else {
            $('.container').fadeOut(400)
            $(`.${this.dataset.screen}-screen`).delay(400).fadeIn()

            $('.nav-item').removeClass('active')
            $(this).parent().addClass('active')
        }
    })


    function loadFavorites(name) {
        // for (var i = 0; i < savedNames.length - 1; i++) {
        let idName = name.replace(/[^\w]/g, '')
        let currentId = `collapse-fav-${idName}`
        let addBtn = $('<button>')
            .addClass('btn btn-light fav-user-btn scroll-top')
            .attr({
                type: 'submit',
                'data-toggle': 'collapse',
                'data-target': `#${currentId}`,
                'aria-expanded': 'false',
                'aria-controls': currentId
            })
            .text(name) //insideList[i].userName)
        let user = $('<i>')
            .addClass('fas fa-user text-success mr-3')
            .attr({
                'data-toggle': 'tooltip',
                'data-placement': 'top',
                title: 'User is online!'
            })
        let star = $('<i>')
            .addClass('far fa-star text-dark mr-3')
        let item = $('<li>')
            .addClass('list-group-item text-left')
            .append(star, user, addBtn)
        let close = $('<button>')
            .addClass('close text-right')
            .attr({
                type: 'button',
                'aria-label': 'Close'
            })
            .html('<span aria-hidden="true">&times;</span>')
            .attr("data-index", 0); //replace with i

        let statsWrapper = getStats('user', currentId) //here pass in user

        let playBtn = $('<button>')
            .addClass('btn btn-success btn-block request-opp mt-3 mb-1')
            .text(`Play ${name}`)

        statsWrapper.append(playBtn)

        item.append(close).append(statsWrapper)
        $('.fav-users').prepend(item)
        // }
    }

    function getStats(user, currentId) {

        let header = $('<h5>')
            .addClass('card-title')
            .text('Stats')

        //load stats
        let chipsData = $('<td>')
            .text('$ 2,000') //here load chips data
        let chipsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Chips')
        let chipsRow = $('<tr>')
            .append(chipsHeader)
            .append(chipsData)

        let winsData = $('<td>')
            .text('18') //here load wins data
        let winsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Wins')
        let winsRow = $('<tr>')
            .append(winsHeader)
            .append(winsData)

        let lossesData = $('<td>')
            .text('7') //here load losses data
        let lossesHeader = $('<th>')
            .attr('scope', 'row')
            .text('Losses')
        let lossesRow = $('<tr>')
            .append(lossesHeader)
            .append(lossesData)

        let bustsData = $('<td>')
            .text('2') //here load busts data
        let bustsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Busts')
        let bustsRow = $('<tr>')
            .append(bustsHeader)
            .append(bustsData)

        let styleData = $('<td>')
            .text('Slightly Crazy') //here load style data
        let styleHeader = $('<th>')
            .attr('scope', 'row')
            .text('Playing Style')
        let styleRow = $('<tr>')
            .append(styleHeader)
            .append(styleData)

        let tableBody = $('<tbody>')
            .append(chipsRow)
            .append(winsRow)
            .append(lossesRow)
            .append(bustsRow)
            .append(styleRow)

        let statTable = $('<table>')
            .addClass('table mb-0')
            .append(tableBody)


        let stats = $('<div>')
            .addClass('card card-body mt-2 bg-light')
            .append(header)
            .append(statTable)

        let statsWrapper = $('<div>')
            .addClass('collapse')
            .attr({
                id: currentId
            })
            .append(stats)

        return statsWrapper
    }



    function loadLeaders(name, chips) {
        // for (var i = 0; i < savedNames.length - 1; i++) {
        let idName = name.replace(/[^\w]/g, '')
        let currentId = `collapse-leader-${idName}`
        let addBtn = $('<button>')
            .addClass('btn btn-light fav-user-btn scroll-top')
            .attr({
                type: 'submit',
                'data-toggle': 'collapse',
                'data-target': `#${currentId}`,
                'aria-expanded': 'false',
                'aria-controls': currentId
            })
            .text(name) //insideList[i].userName)
        let user = $('<i>')
            .addClass('fas fa-user text-success mr-3')
            .attr({
                'data-toggle': 'tooltip',
                'data-placement': 'top',
                title: 'User is online!'
            })
        let star = $('<i>')
            .addClass('far fa-star text-dark mr-3')
        let item = $('<li>')
            .addClass('list-group-item text-left')
            .append(star, user, addBtn)
        let formattedChips = addCommas(chips)
        let score = $('<button>')
            .addClass('close text-right disabled')
            .attr({
                type: 'button'
            })
            .text(`$ ${formattedChips}`)

        let statsWrapper = getStats('user', currentId) //here pass in user

        item.append(score).append(statsWrapper)
        $('.leader-users').prepend(item)
        // }
    }

    //here
    loadFavorites(`Joseph "King of Hearts"`)
    loadFavorites(`Jenny "Big Time"`)
    loadLeaders(`Joseph "King of Hearts"`, 4000) //here don't forget to order leader board
    loadLeaders(`Monster "Mon"`, 12000) //here don't forget to order leader board
    loadLeaders(`Gerald "The Beast"`, 55000) //here don't forget to order leader board
    loadLeaders(`Jenny "Big Time"`, 100000) //here don't forget to order leader board



    $(document).on('click', '.scroll-top', function () {
        $('html, body').animate({
            scrollTop: ($(this).offset().top - 68)
        }, 500)
    })

    $(document).on("click", ".fa-star", function () {
        $(this)
            .toggleClass('text-dark')
            .toggleClass('text-warning')

        if ($(this)[0].dataset.prefix === 'far') {
            $(this)[0].dataset.prefix = 'fas'
        } else {
            $(this)[0].dataset.prefix = 'far'
        }
    })

    $('.invite-btn').click(function () {

        $('.email-message')
            .val(`Howdy!
            
Copy and paste the link below into your browser to find me at the Blackjack table!
            
    https://github.com/josephemswiler/blackjack
            
Your Formidable Opponent,
Username`)

    })

    $('.send-invite-btn').click(function () {
        event.preventDefault()

        let inviteName = $('.invite-username').val().trim()

        console.log(inviteName, $(this).val())

        // $(this).attr({
        //     href: "mailto:someone@yoursite.com?cc=someoneelse@theirsite.com, another@thatsite.com, me@mysite.com&bcc=lastperson@theirsite.com&subject=Big%20News&body=<a href=\"https://github.com/josephemswiler/blackjack\">Play Blackjack</a>"
        // })

        if (inviteName === '') {
            $('.invite-username').removeClass('is-valid').addClass('is-invalid')
        } else {
            $('.invite-username').removeClass('is-invalid').addClass('is-valid')
            $('.valid-feedback').text(`Awesome! An email has been sent to ${inviteName}@gmail.com!`)
        }


    })





    $(document).on("click", ".fa-user", function () { //here
        $(this)
            .toggleClass('text-success')
            .toggleClass('text-danger')
    })

    function loadSavedUsers() { //here refactor local storage then delete
        $('.saved-profiles').empty();
        let insideList = JSON.parse(localStorage.getItem('localUsers'));
        if (insideList) {
            for (var i = 0; i < insideList.length; i++) {

                savedNames.push(insideList[i].userName);
            }
        }
        if (!Array.isArray(insideList)) {
            insideList = [];
        }
        for (var i = 0; i < savedNames.length - 1; i++) {
            let addBtn = $('<button>')
                .addClass('btn btn-light mb-2 existing-user-btn')
                .attr({
                    type: 'submit'
                })
                .text(insideList[i].userName)
            let item = $('<li>')
                .addClass('list-group-item')
                .append(addBtn);
            let close = $('<button>')
                .addClass('close text-right')
                .attr({
                    type: 'button',
                    'aria-label': 'Close'
                })
                .html('<span aria-hidden="true">&times;</span>')
                .attr("data-index", i);
            item.append(close);
            $('.saved-profiles').prepend(item);
        }
    }
})() //IIFE