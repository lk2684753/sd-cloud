let animation = new explosion.default('container', {
  surface: '5E6262',
  inside: '00B8C4',
  background: 'transparent',
});
animation.scene.rotation.x = Math.PI / 2;
animation.scene.rotation.y = Math.PI / 2;
animation.scene.rotation.z = Math.PI / 2;

window.onload = function () {
  setTimeout(() => {
    new TimelineMax()
      .to(
        animation.camera.position,
        0.5,
        {
          z: 10,
          ease: Expo.easeIn,
        },
        0,
      )
      .to(
        animation.settings,
        4,
        {
          progress: 2,
          ease: Expo.easeOut,
        },
        0.4,
      )
      .to(
        animation.settings,
        1,
        {
          progress: 0,
          ease: Quart.easeInOut,
        },
        4,
      )
      .call(
        function () {
          location.href = location.origin;
        },
        null,
        null,
        4.4,
      );
  }, 500);
};
