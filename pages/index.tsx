import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [{ color1, color2 }, setColors] = useState(styles);
  const [invertedBackground, setInvertedBackground] = useState(false);
  const [background, setBackground] = useState({ container: color1, innerContainer: color2 });
  const [isHover, setIsHover] = useState(false);
  const [{ startColor1, startColor2 }, setStartColor] = useState({ startColor1: true, startColor2: true });
  const [dynamicColor, setDynamicColor] = useState(
    isHover ? { color: color1, outlineColor: color1 } : { color: color1 }
  );

  useEffect(() => {
    if (!invertedBackground) {
      setBackground({ container: color1, innerContainer: color2 });
      setDynamicColor(isHover ? { color: color1, outlineColor: color1 } : { color: color1 });
    } else {
      setBackground({ container: color2, innerContainer: color1 });
      setDynamicColor(isHover ? { color: color2, outlineColor: color2 } : { color: color2 });
    }
  }, [color1, color2, invertedBackground, isHover]);

  return (
    <div className={styles.container} style={{ background: background.container }}>
      <div className={styles.container__inner} style={{ background: background.innerContainer }}>
        <button
          onClick={() => {
            setInvertedBackground(!invertedBackground);
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={dynamicColor}
        >
          Invert Backgrounds
        </button>
        <div className={styles.container__inner__colorSelect} style={dynamicColor}>
          <label htmlFor="userColor">Select Color 1: </label>
          <input
            type="color"
            id="userColor"
            name="userColor"
            value={startColor1 ? "#000000" : color1}
            onChange={(event) => {
              setStartColor({ startColor1: false, startColor2 });
              setColors({ color1: event.target.value, color2 });
            }}
          />

          <label htmlFor="">Select Color 2: </label>
          <input
            type="color"
            id="userColor2"
            name="userColor2"
            value={startColor2 ? "#00ffff" : color2}
            onChange={(event) => {
              setStartColor({ startColor1, startColor2: false });
              setColors({ color1, color2: event.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
