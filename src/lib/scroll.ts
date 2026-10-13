/**
 * Runs `measure` now, then again at most once per animation frame while the
 * page scrolls or resizes. Returns the cleanup, so it can be an effect's
 * return value:
 *
 *   useEffect(() => onScrollFrame(() => setStuck(el.getBoundingClientRect().top <= 0)), []);
 */
export function onScrollFrame(measure: () => void): () => void {
  let frame = 0;
  const run = () => {
    frame = 0;
    measure();
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(run);
  };

  measure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
