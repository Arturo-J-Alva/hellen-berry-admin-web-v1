export const scrollToBottom = (): void => {
  setTimeout(() => {
    const container = document.getElementById("container") as HTMLElement;
    container.scrollTo(0, container.scrollHeight);
  });
};
