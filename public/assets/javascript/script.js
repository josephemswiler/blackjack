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
        constructor(username, name, nickname, isActive, autheticated, opponent, style, favorites, stats, hand) {
            this.username = username
            this.name = name
            this.firstname = this.name.split(' ').splice(0, 1).join('')
            this.nickname = nickname
            this.isActive = isActive
            this.autheticated = autheticated
            this.opponent = opponent
            this.style = style
            this.favorites = favorites
            this.stats = stats
            this.hand = hand
        }
    }

    let leaderList = []

    let playerJoe = new Player(
        'josephemswiler',
        'Joseph Emswiler',
        'King of Hearts',
        false,
        false,
        '',
        'Newbie', [
            'jenems4',
            'thisemail'
        ], {
            chips: 20000,
            wins: 10,
            losses: 5,
            busts: 2,
        }, [])
    let playerJen = new Player(
        'jenems4',
        'Jennifer Emswiler',
        'Big Time',
        false,
        false,
        '',
        'Boss', [
            'josephemswiler',
            'otheremail'
        ], {
            chips: 30000,
            wins: 15,
            losses: 2,
            busts: 0,
        }, [])
    let playerMonster = new Player(
        'themon',
        'Monster Emswiler',
        'Oof',
        false,
        false,
        '',
        'Legend', [
            'josephemswiler',
            'jenems4'
        ], {
            chips: 2000,
            wins: 2,
            losses: 21,
            busts: 2,
        }, [])
    let favoritesList = [playerJoe, playerJen, playerMonster]

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
            $('.top-level-screen').fadeOut(400)
            $(`.${this.dataset.screen}-screen`).delay(400).fadeIn()

            $('.nav-item').removeClass('active')
            $(this).parent().addClass('active')
        }
    })

    function loadFavorites(arr) {
        for (let i in arr) {
            let username = arr[i].username
            let currentId = `collapse-fav-${username}`
            let name = `${arr[i].firstname} "${arr[i].nickname}"`
            let addBtn = $('<button>')
                .addClass('btn btn-light fav-user-btn scroll-top')
                .attr({
                    type: 'submit',
                    'data-toggle': 'collapse',
                    'data-target': `#${currentId}`,
                    'aria-expanded': 'false',
                    'aria-controls': currentId
                })
                .text(name)
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
                .attr("data-username", arr[i].username)

            let statsWrapper = getStats(arr[i], currentId)

            let playBtn = $('<button>')
                .addClass('btn btn-success btn-block request-opp mt-3 mb-1')
                .text(`Play ${name}`)

            statsWrapper.append(playBtn)

            item.append(close).append(statsWrapper)
            $('.fav-users').prepend(item)
        }
    } // /loadFavorites

    function loadLeaders(arr) {
        arr.sort(function (a, b) {
            return a.stats.chips - b.stats.chips
        })
        for (let i in arr) {
            let username = arr[i].username
            let currentId = `collapse-leader-${username}`
            let name = `${arr[i].firstname} "${arr[i].nickname}"`
            let addBtn = $('<button>')
                .addClass('btn btn-light fav-user-btn scroll-top')
                .attr({
                    type: 'submit',
                    'data-toggle': 'collapse',
                    'data-target': `#${currentId}`,
                    'aria-expanded': 'false',
                    'aria-controls': currentId
                })
                .text(name)
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
            let score = $('<button>')
                .addClass('close text-right disabled')
                .attr({
                    type: 'button'
                })
                .text(`$ ${addCommas(arr[i].stats.chips)}`)

            let statsWrapper = getStats(arr[i], currentId)

            item.append(score).append(statsWrapper)
            $('.leader-users').prepend(item)
        }
    } // /loadLeaders

    function loadProfile(user) {
        let statsTable = getStats(user, 'profile')

        $('.profile-name').text(user.name)
        $('.profile-img').attr('src', 'https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400') //replace with img
        $('.profile-stats').append(statsTable)
    }

    function getStats(user, currentId) {

        let header = $('<h5>')
            .addClass('card-title')
            .text('Stats')

        let chipsData = $('<td>')
            .text(`$ ${addCommas(user.stats.chips)}`)
        let chipsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Chips')
        let chipsRow = $('<tr>')
            .append(chipsHeader)
            .append(chipsData)

        let winsData = $('<td>')
            .text(user.stats.wins)
        let winsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Wins')
        let winsRow = $('<tr>')
            .append(winsHeader)
            .append(winsData)

        let lossesData = $('<td>')
            .text(user.stats.losses)
        let lossesHeader = $('<th>')
            .attr('scope', 'row')
            .text('Losses')
        let lossesRow = $('<tr>')
            .append(lossesHeader)
            .append(lossesData)

        let bustsData = $('<td>')
            .text(user.stats.busts)
        let bustsHeader = $('<th>')
            .attr('scope', 'row')
            .text('Busts')
        let bustsRow = $('<tr>')
            .append(bustsHeader)
            .append(bustsData)

        let styleData = $('<td>')
            .text(user.style)
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

        if (currentId === 'profile')
            return statTable

        return statsWrapper
    } // /getStats

    //here
    loadFavorites(favoritesList)
    loadLeaders(favoritesList)
    loadProfile(playerJoe)

    $('.bet-btn').click(function () {

        if ($(this).text() === 'Reset') {
            $('.current-bet').text('$ 0')
            return
        }

        let currentBet = parseInt($('.current-bet').text().replace(/\D/g, ''))
        let currentAdd = parseInt($(this).text().split(' ').splice(1, 1).join(''))
        let result = addCommas(currentBet + currentAdd)

        $('.current-bet').text(`$ ${result}`)
    })
    //here play
    // let newDeck = $.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
    //     .then(data => {
    //     let drawnCard = $.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)
    //     console.log(drawnCard)
    // })

    // let newDeck = $.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=4`)
    // .then(data => {
    //     let deckId = data.deck_id
    //     let cardCount = data.remaining
    //     let cards = data.cards[0]
    //     console.log(cards)
    // })

    let gamePlay = false
    let deckId = ''
    let opponentHand = []
    let playerHand = []

    // function firstDeal(id, oHand, pHand) {
    //     console.log(id, oHand, pHand)
    // }

    let oppCardCount = 1
    let playerCardCount = 1

    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t]
                    }
                }
            })(document.createElement('div'))

            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName)

                if (typeof callback === 'function') callback()
            })

            return this
        },
    })

    $('.deal-game').click(function () {

        $.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
            .then(data => {

                if (!gamePlay) {
                    dealCard('assets/images/card-back.svg', 'opp', 0)

                    gamePlay = true

                    return $.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`)
                } else {}
            }).then(data => {

                console.log(data)
                deckId = data.deck_id
                opponentHand.push(data.cards[0], data.cards[1])
                playerHand.push(data.cards[2], data.cards[3])
                console.log(opponentHand, playerHand)
                // firstDeal(deckId, opponentHand, playerHand)

                for (let i in opponentHand) {
                    oppCardCount = dealCard(opponentHand[i].images.png, 'opp', oppCardCount)
                }

                for (let i in playerHand) {
                    playerCardCount = dealCard(playerHand[i].images.png, 'player', playerCardCount)
                }
            })
    })

    function dealCard(card, player, index) {

        let pos = ''

        if (index === 0) {
            pos = '0px'
        } else {
            pos = `${(index-1) * 35}px`
        }

        let backOfCard = $('<img>')
            .attr({
                'src': 'assets/images/card-back.svg',
                'alt': 'A playing card'
            })
            .addClass(`${player}-card-${index} dealt-card`)
            .css({
                'z-index': index,
                left: pos
            })

        let cardImg = $('<img>')
            .attr({
                'src': card,
                'alt': 'A playing card'
            })
            .addClass(`${player}-card-${index} dealt-card`)
            .css({
                'z-index': index,
                left: pos
            })

        backOfCard.animateCss('rollIn', function () {
            if (!(card === 'assets/images/card-back.svg')) {
                backOfCard.animateCss('flipOutY', function () {
                    backOfCard.hide()
                    cardImg.animateCss('flipInY')
                    cardImg.insertAfter(`.${player}-card-${index-1}`)
                })
            }
        })

        index++

        if (player === 'opp' && index === 2)
            return index

        $(`.${player}-hand-wrapper`).append(backOfCard)

        return index
    }


    $(document).on('click', '.scroll-top', function () {
        $('html, body').animate({
            scrollTop: ($(this).offset().top - 68)
        }, 500)
    })

    $(document).on("click", ".fa-star", function () {
        //here add function to add to favorites list
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

    $(document).on('click', '.close', function () {

        console.log(`${this.dataset.username}`)

        let user = this.dataset.username

        for (let i in favoritesList) {
            if (favoritesList[i].username === user) {
                favoritesList.splice(i, 1)
            }
        }

        console.log(favoritesList)

        // let text = ($(this).parent().find('p').text());

        // emailKey = localUser.email.substr(0, localUser.email.indexOf('@'));

        // currentFavorites.splice(currentFavorites.indexOf(text), 1);

        // database.ref('users/' + emailKey + '/favoritePlaces/').off("value")
        // database.ref('users/' + emailKey + '/favoritePlaces/').on("value", function (snap) {

        //     snap.forEach(function (data) {

        //         database.ref('users/' + emailKey + '/favoritePlaces/' + data.key).off("value")
        //         database.ref('users/' + emailKey + '/favoritePlaces/' + data.key).on("value", function (snap) {

        //             if (text === (snap.val())) {

        //                 database.ref('users/' + emailKey + '/favoritePlaces/' + data.key).remove();

        //             } else {}
        //         });
        //     });
        // });
        $(this).parent().remove()
    })

    $(document).on("click", ".fa-user", function () { //here
        $(this)
            .toggleClass('text-success')
            .toggleClass('text-danger')
    })

    function loadSavedUsers() { //here refactor local storage then delete
        $('.saved-profiles').empty()
        let insideList = JSON.parse(localStorage.getItem('localUsers'))
        if (insideList) {
            for (var i = 0; i < insideList.length; i++) {

                savedNames.push(insideList[i].userName)
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