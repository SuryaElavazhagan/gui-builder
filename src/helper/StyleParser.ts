export interface Shadow {
  type?: 'normal' | 'inset' | 'none';
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
}

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

  public static parseShadow(ref: HTMLElement): Shadow {
    const { boxShadow } = window.getComputedStyle(ref);
    const parsedShadow: Shadow = {
      offsetX: 0,
      offsetY: 0,
      blurRadius: 0,
      spreadRadius: 0,
      color: 'rgba(0,0,0,0)'
    };

    if (boxShadow === 'none') {
      parsedShadow.type = 'none';
    }
    const bracketIndex = boxShadow.indexOf(')');
    parsedShadow.color = boxShadow.startsWith('rgb') ? boxShadow.substring(0, bracketIndex + 1) : 'rgba(0,0,0,0)';
    const shadow = boxShadow.substring(bracketIndex + 2).trim().split(' ');
    parsedShadow.offsetX = shadow[0] ? +shadow[0].replace('px', '') : 0;
    parsedShadow.offsetY = shadow[1] ? +shadow[1].replace('px', '') : 0;
    parsedShadow.blurRadius = shadow[2] ? +shadow[2].replace('px', '') : 0;
    parsedShadow.spreadRadius = shadow[3] ? +shadow[3].replace('px', '') : 0;
    if (shadow[4] === 'inset') {
      parsedShadow.type = 'inset';
    }
    return parsedShadow;
  }

  public static isAppliedToAllSides(gutter: number[]): boolean {
    return !gutter.some((value) => value !== gutter[0]);
  }
}
