export class StyleParser {
  public static parseBackground(ref: HTMLElement) {
    const { backgroundColor } = window.getComputedStyle(ref);
    return backgroundColor;
  }

  public static parseBorder(ref: HTMLElement) {
    const { borderStyle } = window.getComputedStyle(ref);
    return borderStyle;
  }

  public static parseBorderRadius(ref: HTMLElement): number[] {
    const {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius
    } = window.getComputedStyle(ref);

    return [
      Number(borderTopLeftRadius.replace('px', '')),
      Number(borderTopRightRadius.replace('px', '')),
      Number(borderBottomLeftRadius.replace('px', '')),
      Number(borderBottomRightRadius.replace('px', ''))
    ];
  }

  public static parseBorderWidth(ref: HTMLElement): number[] {
    const {
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth
    } = window.getComputedStyle(ref);

    return [
      Number(borderTopWidth.replace('px', '')),
      Number(borderRightWidth.replace('px', '')),
      Number(borderBottomWidth.replace('px', '')),
      Number(borderLeftWidth.replace('px', '')),
    ];
  }

  public static parseMargin(ref: HTMLElement): number[] {
    const {
      marginLeft,
      marginRight,
      marginBottom,
      marginTop
    } = window.getComputedStyle(ref);

    return [
      Number(marginTop.replace('px', '')),
      Number(marginRight.replace('px', '')),
      Number(marginBottom.replace('px', '')),
      Number(marginLeft.replace('px', '')),
    ];
  }

  public static parsePadding(ref: HTMLElement): number[] {
    const {
      paddingLeft,
      paddingRight,
      paddingBottom,
      paddingTop
    } = window.getComputedStyle(ref);

    return [
      Number(paddingTop.replace('px', '')),
      Number(paddingRight.replace('px', '')),
      Number(paddingBottom.replace('px', '')),
      Number(paddingLeft.replace('px', '')),
    ];
  }

  public static isAppliedToAllSides(gutter: number[]): boolean {
    return !gutter.some((value) => value !== gutter[0]);
  }
}
