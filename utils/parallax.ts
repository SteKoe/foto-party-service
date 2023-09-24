import {TweenMax} from "gsap";

export const parallax = (selector: string) => {
    return function parallaxIt(e: MouseEvent, target: string, movement: number) {
        const root = document.querySelector(selector)!;
        const boundingClientRect = root.getBoundingClientRect();
        const relX = e.pageX - boundingClientRect.left + window.scrollX;
        const relY = e.pageY - boundingClientRect.top + window.scrollY;
        const vars = {
            x: (relX - boundingClientRect.width / 2) / boundingClientRect.width * movement,
            y: (relY - boundingClientRect.height / 2) / boundingClientRect.height * movement
        };
        TweenMax.to(target, 1, vars);
    }
}