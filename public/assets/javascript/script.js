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

    $('.nav-link').click(function () {
        console.log(this.dataset.screen)
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

    $(document).on("click", ".fa-star", function () {
        //if has class far, fas
        $(this)
            .toggleClass('far fa-star text-dark')
            .toggleClass('fas fa-star text-warning')
    })

    function loadSavedUsers() {
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

    // let div = $('<div>')
    //     .addClass('fav-user')
    // let button = $('<button>')
    //     .attr('type', 'button')
    //     .addClass('btn btn-block btn-dark mb-2 fav-user-btn')
    // let status = $('<i>')
    //     .addClass('far fa-star text-right') //add .close for close function
    //     .text('close')
    // let star = $('<i>')
    //     .addClass('fas fa-star text-left fav-user-star new-star') //far fa-star - outline star //fas fa-star - full star
    // let user = $('<i>')
    //     .addClass('fas fa-user text-left') //fas fa-user
    //     .text('place')
    // let p = $('<p>')
    //     .addClass('left')
    //     .text(text)
    // if(currentFavorites.includes(text)) {
    //     star
    //         .removeClass('grey-text text-darken-1')
    //         .addClass('deep-orange-text text-lighten-1')
    //         .text('star')
    // }
    // button.append(close).append(star).append(user).append(p)
    // div.append(button)
    // $('.fav-users').append(div)


})() //IIFE