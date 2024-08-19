import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function horizontalScrollWithDrag() {
  return {
    currentSection: null,
    init() {
      this.setupDragScroll();
    },
    scrollToSection(event) {
      const targetId = event.target.dataset.target;
      const targetSection = document.getElementById(targetId);

      gsap.to(this.$refs.scrollContainer, {
        scrollTo: { x: targetSection.offsetLeft, autoKill: false },
        duration: 1,
        ease: 'power2.inOut',
      });

      this.setActiveLink(targetId);
    },
    setActiveLink(targetId) {
      // Удаление класса 'active' у всех ссылок
      document.querySelectorAll('nav a').forEach((link) => {
        link.classList.remove('active');
      });

      // Установка класса 'active' на нужной ссылке
      const activeLink = document.querySelector(`nav a[data-target="${targetId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    },
    isActive(targetId) {
      return this.currentSection === targetId;
    },
    setupDragScroll() {
      const container = this.$refs.scrollContainer;
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // скорость скролла
        container.scrollLeft = scrollLeft - walk;
      });
    },
  };
}
