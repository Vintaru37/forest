const footerYear = document.querySelector('.footer__year');
const hamburgerBtn = document.querySelector('.burger-btn');
const hamburgerCloseBtn = document.querySelector('.burger-close-btn');
const navList = document.querySelector('.nav-list');
const navItems = document.querySelectorAll('.nav-item');
const navigationHeight = document.querySelector('.nav').offsetHeight;
const faqBoxes = document.querySelectorAll('.faq__boxes-box');
const allSections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const contactName = document.querySelector('#name');
const contactEmail = document.querySelector('#email');
const contactMsg = document.querySelector('#message');
const contactSendBtn = document.querySelector('.contact-send-btn');

document.documentElement.style.setProperty(
	'--scroll-padding',
	navigationHeight - 1 + 'px'
); //po kliknieciu w link na nawigacji bierze pod uwage wysokosc nawigacji przed zjechaniem do konkretnej sekcji

const hamburgerShowNavList = () => {
	document.body.style.overflow = 'hidden';
	navList.classList.add('nav-list--slide');
	hamburgerBtn.style.display = 'none';
	hamburgerCloseBtn.style.display = 'block';
};

const hamburgerCloseNavList = () => {
	document.body.style.overflow = 'visible';
	navList.classList.remove('nav-list--slide');
	hamburgerBtn.style.display = 'block';
	hamburgerCloseBtn.style.display = 'none';
};

const handleScrollSpy = () => {
	const currentSection = window.scrollY;

	allSections.forEach((section) => {
		if (
			section.classList.contains('aboutus-section') &&
			section.offsetTop <= currentSection + 95
		) {
			navLinks.forEach((link) => {
				link.classList.remove('scrollspy');
			});
			navLinks[1].classList.add('scrollspy');
		} else if (
			section.classList.contains('offers-section') &&
			section.offsetTop <= currentSection + 95
		) {
			navLinks.forEach((link) => {
				link.classList.remove('scrollspy');
			});
			navLinks[2].classList.add('scrollspy');
		} else if (
			section.classList.contains('contact-section') &&
			section.offsetTop <= currentSection + 100
		) {
			navLinks.forEach((link) => {
				link.classList.remove('scrollspy');
			});
			navLinks[3].classList.add('scrollspy');
		} else if (currentSection < 400) {
			navLinks.forEach((link) => {
				link.classList.remove('scrollspy');
			});
			navLinks[0].classList.add('scrollspy');
		}
	});
};

const showError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.add('error');
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el);
		} else {
			clearError(el);
		}
	});
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(contactEmail.value)) {
		clearError(email);
	} else {
		showError(email);
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach((input) => {
		if (input.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		contactSendBtn.value = 'Wiadomość wysłana!';
		contactSendBtn.style.backgroundColor = '#629de5';
		setTimeout(() => {
			contactSendBtn.value = 'Wyślij wiadomość';
			contactSendBtn.style.backgroundColor = 'rgba(5, 129, 5, 0.808)';
		}, 3000);
		[contactName, contactEmail, contactMsg].forEach((input) => {
			input.value = '';
		});
	}
};

// ROZWINIECIE I SCHOWANIE ODPOWIEDZI FAQ / OBRÓT STRZAŁKI
faqBoxes.forEach((box) => {
	const answer = box.querySelector('.faq__boxes-box-answer');
	const expandIcon = box.querySelector(
		'.faq__boxes-box-upper-expand .arrow-down'
	);

	function toggleActiveClass() {
		answer.classList.toggle('faq__boxes-box-answer-active');
		expandIcon.classList.toggle('rotate');
	}
	box.addEventListener('click', toggleActiveClass);
});

hamburgerBtn.addEventListener('click', hamburgerShowNavList);
const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

navItems.forEach((navItem) => {
	navItem.addEventListener('click', hamburgerCloseNavList);
});
hamburgerCloseBtn.addEventListener('click', hamburgerCloseNavList);

window.addEventListener('scroll', handleScrollSpy);

if (document.body.classList.contains('contact-page')) {
	[contactName, contactEmail, contactMsg].forEach((input) => {
		input.value = '';
	});

	contactSendBtn.addEventListener('click', (e) => {
		e.preventDefault();
		checkForm([contactName, contactEmail, contactMsg]);
		checkEmail(email);
		checkErrors();
	});
}

handleCurrentYear();
