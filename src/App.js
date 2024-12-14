import { useToggle } from "./useToggle";

export function Demo() {
  const [value, toggle] = useToggle(["blue", "orange", "cyan", "teal"]);
  // const [value, toggle] = useToggle(["light", "dark"]);

  return <button onClick={() => toggle()}>{value}</button>;
}

// Еще примеры использования

// const [value, toggle] = useToggle(['light', 'dark']);

// toggle(); // -> value === 'light'
// toggle(); // -> value === 'dark'

// // Так же можно передать конкретное значение и тогда
// // value станет одним из значений
// toggle('dark'); // -> value === 'dark'
