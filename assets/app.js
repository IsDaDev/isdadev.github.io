// *******************************************************************************
// Skills Section
// *******************************************************************************
// var for all bars in skills
const allGraphBars = document.querySelectorAll('.bar');
// container with all items in skills
const chartItemsContainer = document.querySelector('.chart-items');

// values for the lines in the skills diagram
const valuesForLines = [13.2, 31.5, 49.7, 68, 86.4];
const valuesForLinesMobile = [13, 32, 51, 68.5, 86];

// unit to calc height of bars
const measureUnit = 5;
// counter for bars
let c = 1;

// calculates the height for each bar and gives it the animation chart-item-flow
allGraphBars.forEach((element) => {
  const barHeight = measureUnit * element.classList[2].split('=')[1];
  const individualBar = document.querySelector(`.item-${c}`);
  individualBar.style.height = barHeight + 'px';
  individualBar.style.animation = 'chart-item-flow 2s ease-out';
  c++;
});

// function to make gradients (color and array to select)
const makeGradient = (color, array) => {
  let gradientStyle = 'linear-gradient(to top, ';

  for (let index = 0; index < array.length; index++) {
    let val = array[index];
    gradientStyle += `
    transparent ${val}%, ${color} ${val + 0.5}%, transparent ${val + 1}%, `;
  }

  return gradientStyle.substring(0, gradientStyle.length - 2) + ')';
};

// *******************************************************************************
// Skills Section End
// *******************************************************************************

// *******************************************************************************
// Mail Section
// *******************************************************************************

// init function for the mail process
(function () {
  emailjs.init({
    publicKey: 'vIBCTpJtgRvahHzDM',
  });
})();

const clearForm = () => {
  nameInput.value = '';
  emailInput.value = '';
  titleInput.value = '';
  messageInput.value = '';
};

// selects the contact-form
const form = document.querySelector('#contact-form');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const titleInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');
let statusCode = document.querySelector('.code');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusCode.innerHTML = 'Message being sent, wait ...';
  let params = {
    from_name: nameInput.value,
    from_email: emailInput.value,
    title: titleInput.value,
    message: messageInput.value,
  };

  emailjs.send('service_okxi5rd', 'template_pqzlpez', params).then(
    () => {
      clearForm();
      statusCode.style.color = 'green';
      statusCode.innerHTML = 'Message successfully sent';
    },
    (error) => {
      statusCode.style.color = 'red';
      statusCode.innerHTML = `There was an error sending the message`;
    }
  );
});

// *******************************************************************************
// Mail Section End
// *******************************************************************************

// *******************************************************************************
// Skills Section Bar calculation
// *******************************************************************************

if (window.innerWidth < 768) {
  chartItemsContainer.style.backgroundImage = makeGradient(
    'rgb(0,191,255, 0.4)',
    valuesForLinesMobile
  );
  console.log(valuesForLinesMobile);
} else {
  chartItemsContainer.style.backgroundImage = makeGradient(
    'rgb(0,191,255, 0.4)',
    valuesForLines
  );
}

// *******************************************************************************
// Skills Section Bar calculation End
// *******************************************************************************

// *******************************************************************************
// Projects Section
// *******************************************************************************

document.querySelectorAll('.toggle-button').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.classList[1].substring(0, 9);
    let details = document.querySelector(`#${id}`);

    let documentHeight = document
      .querySelector('.project-container')
      .getBoundingClientRect()['height'];

    if (details.style.display === 'block') {
      details.style.display = 'none';
      button.innerHTML = 'Show Details';
    } else {
      details.style.display = 'block';
      button.innerHTML = 'Close Details';
    }

    let height1 = document.querySelector('#project-1').getBoundingClientRect()[
      'height'
    ];
    let height2 = document.querySelector('#project-2').getBoundingClientRect()[
      'height'
    ];

    if (height1 + height2 > documentHeight) {
      document.querySelector('#projects').style.height = 'auto';
    }
  });
});

// *******************************************************************************
// Projects Section End
// *******************************************************************************

// *******************************************************************************
// Navbar Section
// *******************************************************************************

const changeImageSize = (status) => {
  const image = document.querySelector('.logo-img'); // Select the image once
  const imgContainer = document.querySelector('.logo');
  const imgContainerMobile = document.querySelector('.image-container-mobile');

  if (!image) {
    console.error('Image element not found!');
    return;
  }

  switch (status) {
    case 'open':
      if (image.parentElement === imgContainer) {
        imgContainer.removeChild(image);
        imgContainerMobile.appendChild(image);
        image.style.height = '60px';
      }
      break;

    case 'close':
      if (image.parentElement === imgContainerMobile) {
        imgContainerMobile.removeChild(image);
        imgContainer.appendChild(image);
        image.style.transition = 'height 2s ease';
        image.style.height = '25px';
      }
      break;

    default:
      break;
  }
};

document.querySelector('.mobile-nav').addEventListener('click', () => {
  const navbar = document.querySelector('.nav-links-mobile');
  // now closed
  if (navbar.style.display == 'grid') {
    changeImageSize('close');
    navbar.style.display = 'none';

    let bars = document.querySelector('.fa-times');
    bars.classList.add('fa-bars');
    bars.classList.remove('fa-times');
  } else {
    changeImageSize('open');
    navbar.style.display = 'grid';
    let bars = document.querySelector('.fa-bars');
    bars.classList.add('fa-times');
    bars.classList.remove('fa-bars');
  }
});

// *******************************************************************************
// Navbar Section End
// *******************************************************************************

// *******************************************************************************
// Scroll Effekt
// *******************************************************************************

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        if (section.classList.contains('slide-left')) {
          section.classList.add('section-animate-left');
        } else if (section.classList.contains('slide-right')) {
          section.classList.add('section-animate-right');
        }
        observer.unobserve(section);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const sections = document.querySelectorAll('section');
sections.forEach((section) => {
  observer.observe(section);
});

// *******************************************************************************
// Scroll Effekt End
// *******************************************************************************
