export function useCapitalize() {
  return (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
}
