import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(Draggable, ScrollToPlugin, ScrollTrigger);

export default function horizontalScrollWithDrag() {
  const scrollContainer = this.$refs.scrollContainer;
  const dragProxy = document.querySelector('.drag-proxy');
  let maxWidth = 0;
  let horizontalScroll = null;
  const dragRatio = maxWidth / (maxWidth - window.innerWidth);

  return {
    init() {
      this.$nextTick(() => {
        const sections = gsap.utils.toArray('.content');

        this.setupScrollTrigger(sections);
        this.setupDraggable();
      });
    },
    scrollToSection(event) {
      const targetId = event.target.dataset.section;
      const targetSection = document.getElementById(targetId);
      console.log('targetId', targetId);
      console.log('targetSection', targetSection);

      gsap.to(scrollContainer, {
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
      const activeLink = document.querySelector(`nav a[data-section="${targetId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    },
    isActive(targetId) {
      return this.currentSection === targetId;
    },
    setupScrollTrigger(sections) {
      //todo: try to add getter
      const getMaxWidth = () => {
        sections.forEach((section) => {
          maxWidth += section.offsetWidth;
        });
      };
      getMaxWidth();

      let scrollTween = gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: 'none',
      });

      horizontalScroll = ScrollTrigger.create({
        animation: scrollTween,
        trigger: scrollContainer,
        pin: true,
        scrub: 1,
        end: () => `+=${maxWidth}`,
        invalidateOnRefresh: true,
        markers: true,
      });

      sections.forEach((section) => {
        const relatedLink = document.querySelector(`[data-section="${section.id}"]`);

        ScrollTrigger.create({
          trigger: section,
          start: () =>
            'top top-=' +
            (section.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
          end: () => '+=' + section.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          onToggle: () => {
            relatedLink.classList.toggle('active');
          },
        });
      });
    },
    setupDraggable() {
      console.log('horizontalScroll', horizontalScroll);

      return Draggable.create(dragProxy, {
        trigger: scrollContainer,
        type: 'x',
        edgeResistance: 1,
        overshootTolerance: 0,
        onPress() {
          ScrollTrigger.refresh();
          this.startScroll = horizontalScroll.scroll();
        },
        onDrag() {
          horizontalScroll.scroll(this.startScroll - (this.x - this.startX) * dragRatio);

          console.log('this.x', this.x);
          console.log('this.startX', this.startX);
          console.log('this.startScroll', this.startScroll);
        },
      })[0];
    },
  };
}
