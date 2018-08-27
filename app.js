/**
 *
 * Scripts to gather the data required for the app
 * Uses the Open Weather Free API 
 *
 */


/*===========================================
=            Single Day API Call            =
===========================================*/
fetch('https://api.openweathermap.org/data/2.5/weather?id=7778677&units=metric&APPID=fac285e120da5b555fbff2647b788aa6')
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        response.json().then(function(data) {
            console.log(data)
            document.getElementById('temp_digit').innerHTML = Math.round(data.main.temp);
            document.getElementById('current_weather').innerHTML = data.weather[0].main;
            document.getElementById('location').innerHTML = '<h1>' + data.name + '</h1>'
            document.getElementById('icon').innerHTML = '<i class="wi wi-owm-day-' + data.weather[0].id + '"></i>'
        })
    })
    .catch((err) => console.log(err))
/*=====  End of Single Day API Call  ======*/

/*=======================================================
=            5 Day Weather Forcast w/ filter            =
=======================================================*/
let date = new Date();
let day = date.getDay();
let z = day;
//could be cleaned up, duped code.
if (z == 6) {
    z = 0
} else {
    z = day + 1
}
const week = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];

function generateList(temp, icon) {
    let string = ''
    string += '<div class="single_list_container"><span class="day">'
    string += week[z]
    string += '</span><span class="single_temp">'
    string += temp
    string += '<i class="wi list_temp wi-celsius"></i></span><i class="wi wi-owm-day-'
    string += icon
    string += '"></i>';

    if (z == 6) {
        z = 0
    } else {
        z++
    }

    const day_temp = document.createElement('div');
    const app_list = document.getElementById('app_list');

    day_temp.innerHTML = string;
    app_list.appendChild(day_temp)
}

/*----------  5 Day API CALL  ----------*/
fetch('https://api.openweathermap.org/data/2.5/forecast?id=7778677&units=metric&APPID=fac285e120da5b555fbff2647b788aa6&mode=json')
    .then(function(response) {

        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        response.json().then(function(data) {
            for (var i = 1; i <= data.list.length; i += 8) {
                generateList(Math.round(data.list[i].main.temp), data.list[i].weather[0].id);
            }
        })
    })
    .catch((err) => console.log(err))
/*=====  End of 5 Day Weather Forcast w/ filter  ======*/

/*=====================================================
=            Sliding functions for sidebar            =
=====================================================*/
let open = false;
document.getElementById('burger').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    const burger = document.getElementById('burger')
    if (!open) {
        sidebar.classList.add('sidebar_show');
        burger.classList.add('burger_show');
        open = true;
        return
    } else {
        sidebar.classList.remove('sidebar_show');
        sidebar.classList.add('sidebar_hide');
        burger.classList.remove('burger_show');
        burger.classList.add('burger_hide');
        open = false;
    }
}
/*=====  End of Sliding functions for sidebar  ======*/