var step = 1;
var totalPage = 6;
var windowHeight = $(window).height();
window.onload = function () {
  pageInit();
  nearInit();

  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
};

function throttle(func, wait) {
  let previous = false;
  return function () {
    if (previous) return;
    previous = true;
    func.apply(this, [...arguments]);
    setTimeout(() => {
      previous = false;
    }, wait);
  };
}

$(window).on(
  'mousewheel',
  throttle(function (event) {
    if (event.deltaY < 0) {
      mouseDown();
    } else {
      mouseUp();
    }
  }, 1200),
);

let direction = 'down';
function mouseUp() {
  step = step - 1 > 0 ? step - 1 : step;
  direction = 'up';
  onScroll();
}
function mouseDown() {
  step = step + 1 < totalPage ? step + 1 : totalPage;
  direction = 'down';
  onScroll();
}

function pageInit() {
  $('.main div').addClass('animate__animated');
  $('.context > div').css('height', windowHeight + 'px');
  $('.scrollBtn .up').on('click', function () {
    mouseUp();
  });
  $('.scrollBtn .down').on('click', function () {
    mouseDown();
  });

  $('.createAccount').on('click', function () {
    window.open('https://wallet.testnet.near.org/create');
  });
  $('.loginAccount').on('click', function () {
    nearLogin();
  });
  $('.github').on('click', function () {
    window.open('https://github.com/lk2684753/sd-cloud');
  });
  $('.discord').on('click', function () {
    window.open('https://discord.gg/vB5Y4ZR2st');
  });
  let animation = null;
  $('.threePage .boxList .box').on('mouseenter', function (e) {
    animation && animation.pause();
    $('.lines')
      .css({
        display: 'none',
      })
      .attr({
        'stroke-width': 0,
      });
    anime({
      targets: '.lines path',
      strokeDashoffset: [0, anime.setDashoffset],
      easing: 'easeInOutSine',
      duration: 0,
      complete: function () {
        $('.lines')
          .css({
            display: 'block',
            left: e.target.offsetLeft + 'px',
            top: e.target.offsetTop + 'px',
            width: e.target.clientWidth + 5 + 'px',
            height: e.target.clientHeight + 5 + 'px',
          })
          .attr({
            'stroke-width': 2,
          });
        animation = anime({
          targets: '.lines path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 800,
        });
      },
    });
  });
}

window.addEventListener('resize', function () {
  windowHeight = $(window).height();
  $('.context > div').css('height', windowHeight + 'px');
});

var wallet = null;
var isLogin = false;
function nearInit() {
  var WalletConnection = window.nearApi.WalletConnection;
  var keyStores = window.nearApi.keyStores;
  var connect = window.nearApi.connect;

  const config = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  try {
    connect(config).then(function (near) {
      wallet = new WalletConnection(near);
      isLogin = wallet.isSignedIn();
      var username = wallet.getAccountId();
      if (isLogin) {
        $('.loginAccount').addClass('login').html(username);
      } else {
        $('.loginAccount').removeClass('login').html('Login with NEAR');
      }
    });
  } catch (error) {
    console.log('[ error ]-232', error);
  }
}
function nearLogin() {
  wallet.requestSignIn('dev-1643075353301-97924219324147', 'demo', 'https://sdcloudstorage.on.fleek.co/');
}

function onScroll() {
  if (step > 1) {
    $('.scrollBtn .up').attr('src', './images/a5.png');
  } else {
    $('.scrollBtn .up').attr('src', './images/a3.png');
  }
  if (step === totalPage) {
    $('.scrollBtn .down').attr('src', './images/a8.png');
  } else {
    $('.scrollBtn .down').attr('src', './images/a2.png');
  }

  if (step === 1) {
    $('.base .anime').css({
      left: `50%`,
      opacity: '1',
    });
    $('.base .bgLeftSlice')
      .removeClass('animate__fadeOutLeft')
      .addClass('animate__fadeInLeft');
    $('.base .BigTitle')
      .removeClass('animate__flipOutX')
      .addClass('animate__flipInX');
    $('.onePage .features')
      .removeClass('animate__fadeOutLeft')
      .addClass('animate__fadeInLeft');
    $('.onePage .quick')
      .removeClass('animate__fadeOutRight')
      .addClass('animate__fadeInRight');

    if (direction === 'down') {
      $('.twoPage')
        .removeClass('animate__fadeInUp')
        .addClass('animate__fadeOutDown');
    } else {
      $('.twoPage')
        .removeClass('animate__fadeInDown')
        .addClass('animate__fadeOutDown');
    }
    $('.twoPage .oneBox')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown');

    setTimeout(function () {
      $('.createAccount').css('transform', 'translateX(0%)');
    }, 100);
    $('.loginAccount').removeClass('sticky');
    $('.goDown').css('opacity', '1');
    $('.base .switchChrome')
      .removeClass('animate__fadeInRight')
      .addClass('animate__fadeOutRight');
  }
  if (step === 2) {
    $('.base .switchChrome .chromeOne')
      .css('display', 'block')
      .siblings('.chromePage')
      .css('display', 'none');
    $('.base .switchChrome')
      .css('display', 'block')
      .removeClass('animate__fadeOutRight')
      .addClass('animate__fadeInRight');
    $('.goDown').css('opacity', '0');
    setTimeout(function () {
      $('.createAccount').css('transform', 'translateX(-120%)');
    }, 100);
    $('.loginAccount').addClass('sticky');

    $('.base .anime').css({
      left: `75%`,
      opacity: '0',
    });
    $('.base .bgLeftSlice')
      .removeClass('animate__fadeInLeft')
      .addClass('animate__fadeOutLeft');
    $('.base .BigTitle')
      .removeClass('animate__flipInX')
      .addClass('animate__flipOutX');
    $('.onePage .features')
      .removeClass('animate__fadeInLeft')
      .addClass('animate__fadeOutLeft');
    $('.onePage .quick')
      .removeClass('animate__fadeOutRight')
      .addClass('animate__fadeOutRight');

    if (direction === 'down') {
      $('.twoPage')
        .css('display', 'block')
        .removeClass('animate__fadeOutDown')
        .addClass('animate__fadeInUp');
    }
    $('.twoPage .topLine').css('marginTop', `119px`);
    $('.twoPage .bgTitle').html('01');

    if (direction === 'down') {
      setTimeout(function () {
        $('.twoPage .oneBox')
          .css('display', 'block')
          .removeClass('animate__fadeOutDown')
          .addClass('animate__fadeInUp');
        $('.twoPage .oneBox .number').css({
          opacity: `1`,
        });
        $('.twoPage .oneBox .title').css({
          fontSize: `42px`,
          lineHeight: `59px`,
          opacity: `1`,
        });
        $('.twoPage .oneBox .intro').css({
          opacity: `1`,
        });
      }, 500);
    } else {
      $('.twoPage .oneBox')
        .css('display', 'block')
        .removeClass('animate__fadeOutDown')
        .addClass('animate__fadeInUp');
      $('.twoPage .oneBox .number').css({
        opacity: `1`,
      });
      $('.twoPage .oneBox .title').css({
        fontSize: `42px`,
        lineHeight: `59px`,
        opacity: `1`,
      });
      $('.twoPage .oneBox .intro').css({
        opacity: `1`,
      });
    }

    $('.twoPage .twoBox')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown');
  }
  if (step === 3) {
    $('.base .switchChrome .chromeTwo')
      .css('display', 'block')
      .siblings('.chromePage')
      .css('display', 'none');
    $('.twoPage .topLine').css('marginTop', `42px`);
    $('.twoPage .oneBox .number').css({
      opacity: `0.8`,
    });
    $('.twoPage .oneBox .title').css({
      fontSize: `21px`,
      lineHeight: `29px`,
      opacity: `0.8`,
    });
    $('.twoPage .oneBox .intro').css({
      opacity: `0.6`,
    });

    $('.twoPage .bgTitle').html('02');
    $('.twoPage .twoBox')
      .css('display', 'block')
      .removeClass('animate__fadeOutDown')
      .addClass('animate__fadeInUp');
    $('.twoPage .twoBox .number').css({
      opacity: `1`,
    });
    $('.twoPage .twoBox .title').css({
      fontSize: `42px`,
      lineHeight: `59px`,
      opacity: `1`,
    });
    $('.twoPage .twoBox .intro').css({
      opacity: `1`,
    });

    $('.twoPage .threeBox')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown');
  }
  if (step === 4) {
    if (direction === 'up') {
      $('.base .switchChrome')
        .removeClass('animate__fadeOutRight')
        .addClass('animate__fadeInRight');
    }
    $('.base .switchChrome .chromeThree')
      .css('display', 'block')
      .siblings('.chromePage')
      .css('display', 'none');
    $('.twoPage .twoBox .number').css({
      opacity: `0.8`,
    });
    $('.twoPage .twoBox .title').css({
      fontSize: `21px`,
      lineHeight: `29px`,
      opacity: `0.8`,
    });
    $('.twoPage .twoBox .intro').css({
      opacity: `0.6`,
    });

    $('.twoPage .bgTitle').html('03');
    $('.twoPage .threeBox')
      .css('display', 'block')
      .removeClass('animate__fadeOutDown')
      .addClass('animate__fadeInUp');
    $('.twoPage .threeBox .number').css({
      opacity: `1`,
    });
    $('.twoPage .threeBox .title').css({
      fontSize: `42px`,
      lineHeight: `59px`,
      opacity: `1`,
    });
    $('.twoPage .threeBox .intro').css({
      opacity: `1`,
    });

    if (direction === 'up') {
      $('.twoPage')
        .removeClass('animate__fadeOutUp')
        .addClass('animate__fadeInDown');
    }
    $('.threePage')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown');
    $('.threePage .boxList .box')
      .removeClass('animate__flipInX')
      .addClass('animate__flipOutX');
    $('.base .anime').css({
      left: `75%`,
    });
  }
  if (step === 5) {
    $('.base .switchChrome')
      .removeClass('animate__fadeInRight')
      .addClass('animate__fadeOutRight');
    $('.twoPage')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutUp');
    $('.base .anime').css({
      left: `150%`,
    });
    $('.twoPage .threeBox .number').css({
      opacity: `0.8`,
    });
    $('.twoPage .threeBox .title').css({
      fontSize: `21px`,
      lineHeight: `29px`,
      opacity: `0.8`,
    });
    $('.twoPage .threeBox .intro').css({
      opacity: `0.6`,
    });

    if (direction === 'down') {
      $('.threePage')
        .css('display', 'flex')
        .removeClass('animate__fadeOutDown')
        .addClass('animate__fadeInUp');
    } else {
      $('.threePage')
        .removeClass('animate__fadeOutUp')
        .addClass('animate__fadeInDown');
    }
    $('.threePage .boxList .box')
      .removeClass('animate__flipOutX')
      .addClass('animate__flipInX');

    $('.fourPage')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutDown');
    $('.fourPage .leftBox')
      .removeClass('animate__flipInY')
      .addClass('animate__flipOutY');
  }
  if (step === 6) {
    $('.threePage')
      .removeClass('animate__fadeInUp')
      .addClass('animate__fadeOutUp');
    $('.threePage .boxList .box')
      .removeClass('animate__flipInX')
      .addClass('animate__flipOutX');

    $('.fourPage')
      .css('display', 'flex')
      .removeClass('animate__fadeOutDown')
      .addClass('animate__fadeInUp');
    $('.fourPage .leftBox')
      .removeClass('animate__flipOutY')
      .addClass('animate__flipInY');
  }
}
