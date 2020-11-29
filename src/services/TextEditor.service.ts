import tinykeys from 'tinykeys';

export interface TextEditCommands {
  'bold': undefined;
  'italic': undefined;
  'underline': undefined;
  'createLink': string;
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
  'formatblock': string;
}

interface Selection {
  start: number;
  end: number;
}

export class TextEditor {
  private static ref: HTMLElement;
  private static selection: Selection | undefined;
  private static unsubscribe: () => void;

  private static handleDoubleClick() {
    TextEditor.ref.contentEditable = "true";
    document.execCommand("defaultParagraphSeparator", false, "div");
    TextEditor.setupKeyboardShortcuts();
    TextEditor.ref.focus();
    TextEditor.ref.addEventListener('blur', TextEditor.handleBlur);
    TextEditor.ref.removeEventListener('dblclick', TextEditor.handleDoubleClick);
  }

  private static handleBlur() {
    // Reference: https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html
    // I just don't want to waste time in writing own text restoring. Sorry :p
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(TextEditor.ref);
      clonedRange.setEnd(range.startContainer, range.startOffset);
      const start = clonedRange.toString().length;
      TextEditor.selection = {
        start,
        end: start + range.toString().length
      };
    }
  }

  private static setupKeyboardShortcuts() {
    TextEditor.unsubscribe = tinykeys(TextEditor.ref, {
      '$mod+KeyB': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('bold', undefined);
      },
      '$mod+KeyI': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('italic', undefined);
      },
      '$mod+KeyU': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('underline', undefined);
      },
      '$mod+KeyK': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.addLink();
      },
      '$mod+Shift+KeyS': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('strikeThrough', undefined);
      },
      '$mod+Shift+KeyL': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('justifyleft', undefined);
      },
      '$mod+Shift+KeyE': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('justifycenter', undefined);
      },
      '$mod+Shift+KeyJ': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('justifyFull', undefined);
      },
      '$mod+Shift+KeyR': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.handleCommand('justifyright', undefined);
      },
      'Escape': (event) => {
        event.stopPropagation();
        event.preventDefault();
        TextEditor.detach();
        TextEditor.ref.addEventListener('dblclick', TextEditor.handleDoubleClick);
      }
    });
  }

  public static focus() {
    if (TextEditor.selection !== undefined) {
      let charIndex = 0;
      let foundStart = false;
      let stop = false;
      const range = document.createRange();
      range.setStart(TextEditor.ref, 0);
      range.collapse(true);
      const nodeStack: Node[] = [TextEditor.ref];
      let node;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          const nextCharIndex = charIndex + (node.textContent?.length ?? 0);
          if (!foundStart && TextEditor.selection.start >= charIndex && TextEditor.selection.start <= nextCharIndex) {
            range.setStart(node, TextEditor.selection.start - charIndex);
            foundStart = true;
          }
          if (foundStart && TextEditor.selection.end >= charIndex && TextEditor.selection.end <= nextCharIndex) {
            range.setEnd(node, TextEditor.selection.end - charIndex);
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
      TextEditor.selection = undefined;
    }
    TextEditor.ref.focus();
  }
  
  public static attach(ref: HTMLElement) {
    TextEditor.ref = ref;
    ref.addEventListener('dblclick', TextEditor.handleDoubleClick);
  }

  public static handleCommand<T extends keyof TextEditCommands>(command: T, payload: TextEditCommands[T]) {
    document.execCommand(command, false, payload);
    TextEditor.ref.focus();
  }

  public static addLink() {
    const link = window.prompt('Enter the link:');
    if (link !== null) {
      TextEditor.handleCommand('createLink', link);
    }
  }

  public static detach() {
    if (TextEditor.ref) {
      if (TextEditor.unsubscribe) {
        TextEditor.unsubscribe();
      }
      TextEditor.ref.removeEventListener('blur', TextEditor.handleBlur);
      TextEditor.ref.removeEventListener('dblclick', TextEditor.handleDoubleClick);
      TextEditor.ref.removeAttribute('contenteditable');
    }
  }
}
