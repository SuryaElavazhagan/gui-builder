import tinykeys from 'tinykeys';

export interface TextEditCommands {
  'bold': undefined;
  'italic': undefined;
  'underline': undefined;
  'strikeThrough': undefined;
  'justifyleft': undefined;
  'justifycenter': undefined;
  'justifyright': undefined;
  'justifyFull': undefined;
  'cut': undefined;
  'copy': undefined;
  'paste': undefined;
  'undo': undefined;
  'redo': undefined;
  'fontsize': string;
  'fontname': string;
}

interface Selection {
  start: number;
  end: number;
}

export class TextEditor {
  private ref: HTMLElement | undefined;
  private selection: Selection | undefined;
  private unsubscribe: (() => void) | undefined;

  private handleDoubleClick() {
    this.ref!.contentEditable = "true";
    document.execCommand("defaultParagraphSeparator", false, "div");
    this.setupKeyboardShortcuts();
    this.ref!.focus();
    this.ref!.addEventListener('blur', this.handleBlur);
  }

  private handleBlur() {
    // Reference: https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html
    // I just don't want to waste time in writing own text restoring. Sorry :p
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(this.ref!);
      clonedRange.setEnd(range.startContainer, range.startOffset);
      const start = clonedRange.toString().length;
      this.selection = {
        start,
        end: start + range.toString().length
      };
    }
  }

  private setupKeyboardShortcuts() {
    this.unsubscribe = tinykeys(this.ref!, {
      '$mod+KeyB': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('bold', undefined);
      },
      '$mod+KeyI': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('italic', undefined);
      },
      '$mod+KeyU': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('underline', undefined);
      },
      '$mod+Shift+KeyS': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('strikeThrough', undefined);
      },
      '$mod+Shift+KeyL': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('justifyleft', undefined);
      },
      '$mod+Shift+KeyE': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('justifycenter', undefined);
      },
      '$mod+Shift+KeyJ': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('justifyFull', undefined);
      },
      '$mod+Shift+KeyR': (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleCommand('justifyright', undefined);
      }
    });
  }

  public focus() {
    if (this.selection !== undefined) {
      let charIndex = 0;
      let foundStart = false;
      let stop = false;
      const range = document.createRange();
      range.setStart(this.ref!, 0);
      range.collapse(true);
      const nodeStack: Node[] = [this.ref!];
      let node;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          const nextCharIndex = charIndex + (node.textContent?.length ?? 0);
          if (!foundStart && this.selection.start >= charIndex && this.selection.start <= nextCharIndex) {
            range.setStart(node, this.selection.start - charIndex);
            foundStart = true;
          }
          if (foundStart && this.selection.end >= charIndex && this.selection.end <= nextCharIndex) {
            range.setEnd(node, this.selection.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      this.selection = undefined;
    }
    this.ref!.focus();
  }
  
  public attach(ref: HTMLElement) {
    this.ref = ref;
    ref.addEventListener('dblclick', this.handleDoubleClick);
  }

  public handleCommand<T extends keyof TextEditCommands>(command: T, payload: TextEditCommands[T]) {
    document.execCommand(command, false, payload);
    this.ref!.focus();
  }

  public detach() {
    if (this.ref) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.ref.removeEventListener('dblclick', this.handleDoubleClick);
      this.ref.removeEventListener('blur', this.handleBlur);
      this.ref.removeAttribute('contenteditable');
    }
  }
}
