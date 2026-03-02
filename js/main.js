(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // const popup = document.getElementById('popup-telegram');
        // const closeBtn = document.querySelectorAll('[data-close-popup]');

        // if (!sessionStorage.getItem('popup-telegram-closed')) {
        //     setTimeout(() => {
        //         popup.style.display = 'flex';
        //         document.body.style.overflow = 'hidden'
        //     }, 100);
        // }

        // setTimeout(() => {
        //     popup.style.display = 'flex';
        //     document.body.style.overflow = 'hidden'
        // }, 100);

        // closeBtn.forEach(function(el, i){
        //     el.addEventListener('click', () => {
        //         popup.style.display = 'none';
        //         document.body.style.overflow = 'visible'
        //         sessionStorage.setItem('popup-telegram-closed', 'true');
        //     });
        // })

        const navTitle = document.querySelector('.nav__title');
        const navList = document.querySelector('.nav__list');

        // Изначально открыто
        navList.style.maxHeight = navList.scrollHeight + "px";

        navTitle.addEventListener('click', () => {
            navTitle.classList.toggle('active');
            navList.classList.toggle('collapsed');

            if (!navList.classList.contains('collapsed')) {
                navList.style.maxHeight = navList.scrollHeight + "px";
            } else {
                navList.style.maxHeight = "0";
            }
        });
        const navModal = document.querySelector('.section_nav');
        const navLButton = document.querySelector('[data-btn-modal]');
        const navLClose = document.querySelector('.nav__close');

        navLButton.addEventListener('click', () => {
            navModal.classList.add('open');
            document.body.style.overflow = 'hidden'
        });

        navLClose.addEventListener('click', () => {
            navModal.classList.remove('open');
            document.body.style.overflow = 'visible'
        });

        const sections = document.querySelectorAll(".section_text");
        const navLinks = document.querySelectorAll(".nav__list a");

        let isManualScroll = false;
        let scrollTimeout;

        function removeActive() {
            navLinks.forEach(link => link.classList.remove("active"));
        }

        const observer = new IntersectionObserver((entries) => {
            if (isManualScroll) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const currentLink = document.querySelector(`.nav__list a[href="#${id}"]`);

                    if (currentLink) {
                        removeActive();
                        currentLink.classList.add("active");
                    }
                }
            });
        }, {
            rootMargin: "-40% 0px -55% 0px",
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));

        navLinks.forEach(link => {
            link.addEventListener("click", function () {

                if(navModal.classList.contains('open')) {
                    navModal.classList.remove('open');
                    document.body.style.overflow = 'visible'
                }

                isManualScroll = true;
                removeActive();
                this.classList.add("active");

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isManualScroll = false;
                }, 800);
            });
        });
    });
})();
