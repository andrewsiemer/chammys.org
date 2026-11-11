document.addEventListener('DOMContentLoaded', function () {
            window.scrollTo(0, 0);
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }

            var splash = document.getElementById('splash');
            var splashImg = splash.querySelector('img');
            var page = document.getElementById('pageContent');

            var splashReady = new Promise(function (resolve) {
                if (splashImg.complete && splashImg.naturalWidth > 0) {
                    splashImg.classList.add('loaded');
                    resolve();
                    return;
                }
                splashImg.onload = function () { splashImg.classList.add('loaded'); resolve(); };
                splashImg.onerror = function () { splashImg.classList.add('loaded'); resolve(); };
            });

            var minSplash = splashReady.then(function () {
                return new Promise(function (resolve) { setTimeout(resolve, 1200); });
            });

            minSplash.then(function () {
                splash.classList.add('fade-out');
                setTimeout(function () {
                    splash.style.display = 'none';
                    page.classList.add('show');

                    var els = document.querySelectorAll('.reveal');
                    els.forEach(function (el, i) {
                        setTimeout(function () { el.classList.add('visible'); }, 150 * (i + 1));
                    });
                }, 600);
            });
        });
