import anime from "animejs";

export default function TypingEffect(target) {
  if (!target) return;

  // Get the text content
  const text = target.innerText;
  const textArray = text.split("");

  // Replace text with span elements
  target.innerHTML = textArray
    .map((char) => `<span class="char">${char}</span>`)
    .join("");

  // Select all span elements
  const charElements = target.querySelectorAll(".char");

  // Animate characters
  anime({
    targets: charElements,
    opacity: [0, 1],      // Fade-in effect
    translateX: [10, 0], // Move upwards
    easing: "easeOutQuad",
    duration: 300,
    delay: anime.stagger(100), // Delay each character
  });
}
