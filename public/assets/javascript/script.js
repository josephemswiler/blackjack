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

    let fs = require('fs-extra')
    let markdownIt = require('markdown-it'), md = new MarkdownIt()

    fs.readFile('../README.md', 'utf8')
        .then(data => {
            $('.about-readme').html(md.render(data))
        }).catch(err => console.log(err))

    $('.nav-link').click(function () {
        $('.container').hide()
        $(`.${this.dataset.screen}-screen`).show()
    })

    function loadFavorites(name) {
        // for (var i = 0; i < savedNames.length - 1; i++) {
        let addBtn = $('<button>')
            .addClass('btn btn-light fav-user-btn')
            .attr({
                type: 'submit'
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

        item.append(close)
        $('.fav-users').prepend(item)
        // }
    }

    loadFavorites(`Joseph "King of Hearts"`)
    loadFavorites(`Jenny "Big Time"`)

    function loadLeaders(name, chips) {
        // for (var i = 0; i < savedNames.length - 1; i++) {
        let addBtn = $('<button>')
            .addClass('btn btn-light fav-user-btn')
            .attr({
                type: 'submit'
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

        item.append(score)
        $('.leader-users').prepend(item)
        // }
    }

    loadLeaders(`Gerald "The Beast"`, 3000)
    loadLeaders(`Monster "Mon"`, 2000)

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