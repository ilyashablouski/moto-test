import gsap from 'gsap';

export default function animateBorder() {
  return {
    isHovered: false,
    init() {
      this.$watch('isHovered', (value) => {
        if (value) {
          gsap.to(this.$refs.border, {
            paddingRight: '0px',
            translateX: '0px',
            duration: 0.7,
            ease: 'power1.inOut',
          });
        } else {
          gsap.to(this.$refs.border, {
            paddingRight: '20px',
            translateX: '-20px',
            duration: 0.7,
            ease: 'power1.inOut',
          });
        }
      });
    },
  };
}
