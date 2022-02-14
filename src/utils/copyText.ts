const copyText = (el: any) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(el.textContent);
  } else {
    const selection: any = window.getSelection();
    selection.selectAllChildren(el);
    document.execCommand('copy');
    selection.removeAllRanges();
  }
};

export default copyText;
