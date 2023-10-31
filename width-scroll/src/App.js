import React,{useEffect} from 'react';
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';
import './app.scss'; 


function App() {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    const scrollSection = document.querySelector('.scroll__section');
    const scrollContent = document.querySelector('.scroll__content');
    const testBackground = document.querySelector('.test__background');

    const scrollHeight = scrollSection.clientHeight;
    const contentWidth = scrollContent.clientWidth;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
      const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

      if (scrollSection.offsetTop <= scrolled && notReachedBottom) {
        gsap.to(scrollContent, {
          x: -sectionOffset,
        });
      }
    };

 
    window.addEventListener('scroll', handleScroll);


    const testTween = () => {
      const timeline = new gsap.timeline();
      timeline.to(testBackground, {
        height: '100%',
        ease: 'power3.easeOut',
      });
      return timeline;
    };

    const testScene = new ScrollMagic.Scene({
      triggerElement: '.test',
      triggerHook: 0,
      duration: '40%',
    })
      .setTween(testTween)
      .addIndicators({ name: "1" });

  
    testScene.addTo(controller);

   
    return () => {
      window.removeEventListener('scroll', handleScroll);
      testScene.destroy();
      controller.destroy();
    };
  }, []);

  return (
    <div className="App">
      <section className="scroll__section">
        <div className="scroll__wrapper">
          <div className="scroll__content">
            <div className="about__item">
              <img
                src="https://bit.ly/3OBUXCz"
                alt="Image 1" 
              />
              <div className="content">
              </div>
            </div>
            <div className="about__item">
              <img
                src="https://bit.ly/3u1iipA"
                alt="Image 2" 
              />
              <div className="content">
              </div>
            </div>
            <div className="about__item">
              <img
                src="https://bit.ly/3HPIBor"
                alt="Image 3" 
              />
              <div className="content">
              </div>
            </div>
            <div className="about__item">
              <img
                src="https://bit.ly/3HO0PX7"
                alt="Image 4" 
              />
              <div className="content">
              </div>
            </div>
            <div className="about__item">
              <img
                src="https://bit.ly/3HVhB71"
                alt="Image 5" 
              />
              <div className="content">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
