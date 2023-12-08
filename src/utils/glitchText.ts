export enum GlitchMode {
  Forwards = "forwards",
  Backwards = "backwards",
  Both = "both",
}

// Text below is for glitch reference. Will delete later.
// ABCDFGHXYZa@#གྷ靔𒉁䰚쵲曝줡齃퀰𐅙뒸룎ƒŒ™šůžΑΒΓΔΕΖΗΘЯЖЭЮЯაბგდეΩ℧∂∆∏∑−∕∙√日月火水木金土花鳥風月星空雲雨中国字文学漢語
// 日本語韓國語अआइईउऊऋऌऍऎएकखगघङचछजझञटഅആഇഈഉഊഋഌഎഏタチツテトナニヌネノハヒフヘホバビブベボパピプペポマミムメモ
export const glitchText = (
  originalText: string,
  setFunction: React.Dispatch<React.SetStateAction<string>>,
  fillMode: GlitchMode
) => {
  const len = originalText.length;
  const randomArr = Array.from({ length: len }, (_, i) =>
    originalText[i] === " "
      ? "_"
      : ["タ", "Δ", "マ", "ツ", "뒸", "ホ", "0", "1", "ベ", "Ζ", "モ", "フ"][
          Math.floor(Math.random() * 12)
        ]
  );

  const getSpeed = () => parseInt("7") * 10 + 20;

  const fillText = (i: number, forward = true) => {
    if (forward || fillMode === GlitchMode.Forwards) {
      randomArr.splice(i, 1, originalText[i]);
    } else {
      const index = fillMode === GlitchMode.Both ? len - i - 1 : i;
      randomArr.splice(index, 1, originalText[index]);
    }
    setFunction(randomArr.join(""));
  };

  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      fillText(i, i % 2 === 0);
    }, (i + 1) * getSpeed());
  }
};
