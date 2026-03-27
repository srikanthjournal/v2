// Scroll Reveal
function revealOnScroll(){
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el,index)=>{
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if(elementTop < windowHeight - revealPoint){
            setTimeout(()=>{
                el.classList.add('active');
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax Effect
window.addEventListener('scroll', function(){
    const shapes = document.querySelectorAll('.floating-shapes span');
    let scrollY = window.scrollY;

    shapes.forEach((shape,i)=>{
        shape.style.transform = `translateY(${scrollY * (0.05 + i*0.02)}px)`;
    });
});