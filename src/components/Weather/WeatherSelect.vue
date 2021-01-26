<template>
    <div class="box_select">
        <div class="box_header">
            <p class="date">
                {{dtDate('weekday')}} <br>
                {{dtDate()}}
            </p>
            <div class="city">
                <font-awesome-icon class="icon" title="icon localization" :icon="['fas', 'map-marker-alt']" />
                <p> {{city.name}}
                    <span class="country">{{city.country}}</span>
                </p>
            </div>
        </div>
        <div class="box_body">
            <ul class="information">
                <li>
                    <font-awesome-icon class="icon" title="humidité" :icon="['fas', 'tint']" />
                    {{daily[index].humidity}} %
                </li>
                <li>
                    <font-awesome-icon class="icon" title="Vent" :icon="['fas', 'wind']" />
                    {{Math.round(daily[index].wind_speed)}} km/h
                </li>
                <li>
                    <i class="icon sunrise" title="Levé du soleil"></i>
                    {{dtTimeSun(true)}}
                </li>
                <li>
                    <i class="icon sunset" title="Couché du soleil"></i>
                    {{dtTimeSun(false)}}
                </li>
            </ul>
            <div class="weather_anime">
            </div>
        </div>
        <div class="box_footer">
            <div class="description">
                <p>{{daily[index].weather[0].description}}</p>
            </div>

            <div class="temp">
                <ul>
                    <li>{{Math.round(daily[index].temp.day)}} °C</li>
                    <li>Min : <span class="result"> {{Math.round(daily[index].temp.min)}} °C </span></li>
                    <li>Max : <span class="result">{{Math.round(daily[index].temp.max)}} °C</span></li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['daily', 'index', 'city'],
        methods: {
            /**
             * Convertit les dt (milliseconds) donner par l'api en date locales.
             * @param {string} dateFormat - weekday pour retourner le jour sinon retourne la date complète.
             */
            dtDate(dateFormat) {
                if (dateFormat === 'weekday') {
                    const options = {
                        weekday: 'long'
                    };
                    //To convert that time to human readable, you can multiple by 1000(milliseconds) and use the DateTime constructor to convert.
                    return new Date(this.daily[this.index].dt * 1000).toLocaleDateString("fr-FR", options);
                }

                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
                return new Date(this.daily[this.index].dt * 1000).toLocaleDateString("fr-FR", options)

            },
            /**
             * Convertit les dt (milliseconds) donner par l'api en heure locales.
             * @param {boolean} sunrise - false pour retourner le temps du coucher du soleil, true pour le lever.
             */
            dtTimeSun(sunrise) {
                if (sunrise) {
                    return new Date(this.daily[this.index].sunrise * 1000).toLocaleTimeString([], {
                        timeStyle: 'short'
                    });
                } else {
                    return new Date(this.daily[this.index].sunset * 1000).toLocaleTimeString([], {
                        timeStyle: 'short'
                    });
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .box_select {
        position: relative;
        width: 400px;
        min-height: 500px;
        background-image: linear-gradient(rgba(33, 41, 50, .5), rgba(33, 41, 50, .5)), url('../../assets/weather.jpg');
        background-size: cover;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 .5rem 3rem rgba(255, 249, 249, 0.3);
        z-index: 3;
        animation: box_transition .4s .5s ease-in-out forwards;
        z-index: 2;
        padding: 0px 25px;
        color: #fff;
        text-align: left;

        .box_header {
            width: 100%;
            height: auto;
            padding-top: 25px;

            p:nth-child(1)::first-line {
                font-weight: 900;
                font-size: 35px;
                color: #fff;
            }

            p::first-letter {
                text-transform: uppercase;
            }
        }

        .box_body {
            text-align: right;
            color: rgb(87, 77, 77);
            font-weight: 900;
            display: flex;
            justify-content: flex-end;
        }

        .box_footer {
            background-color: rgba(33, 41, 50, .6);
            width: 100%;
            height: 60px;
            border-radius: 0px 0px 10px 10px;
            padding: 30px 0px;
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            left: 0;
            text-transform: uppercase;
            color: #fff;
        }

        li {
            font-size: 14px;
            text-align: center;
        }
    }

    .city {
        font-weight: 400;
        font-size: 18px;
        margin: 20px 0;
        display: flex;
        align-items: center;

        .icon {
            margin-right: 6px;
            font-size: 14px;
        }

        .country {
            font-size: 14px;
            font-weight: 700;
            position: relative;
            top: -4px;
            left: 5px;
            text-transform: uppercase;
        }
    }

    .information {
        list-style-type: none;
        position: relative;
        display: flex;
        background-color: rgba(33, 41, 50, .6);
        padding: 0;
        width: 240px;
        border-radius: 5px;

        li {
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 8px 2px;
            width: 60px;
        }

        .icon {
            margin-bottom: 4px;
            font-size: 18px;
        }
    }

    .description {
        width: 60%;
        padding: 0 0 0 25px;
        font-weight: 700;
        text-transform: initial;
        font-size: 19px;

        p::first-letter {
            text-transform: uppercase;
        }
    }

    .temp {
        font-size: 18px;
        font-weight: 900;
        width: 40%;
        text-transform: initial;

        li:first-child {
            font-size: 45px;
            top: 0;
        }
    }

    .sunset {
        background-image: url('../../assets/icons/sunset.svg');
        width: 25px;
        height: 25px;
        background-size: contain;
    }

    .sunrise {
        background-image: url('../../assets/icons/sunrise.svg');
        width: 25px;
        height: 25px;
        background-size: contain;
    }

    @keyframes box_transition {
        0% {
            transform: skew(0deg, 0deg)
        }

        100% {
            transform: skew(0deg, -1.5deg)
        }
    }
</style>