import { descrypt } from '@/lib/util/editor';
import { Mark, mergeAttributes, Range } from '@tiptap/core';
import { Mark as PMMark } from '@tiptap/pm/model';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    securedText: {
      setLock: (securedId: string, lockLength: number) => ReturnType;
      unsetLock: (lockedInfo: BlockType) => ReturnType;
    };
  }
}

export interface MarkWithRange {
  mark: PMMark;
  range: Range;
}

export interface SecuredOptions {
  HTMLAttributes: Record<string, any>;
  onSecuredTextActivated: (securedId: string) => void;
}

export interface SecuredStorage {
  activeSecuredId: string | null;
}

export const SecuredText = Mark.create<SecuredOptions, SecuredStorage>({
  name: 'securedText',

  addOptions() {
    return {
      HTMLAttributes: {},
      onSecuredTextActivated: () => {},
    };
  },

  addAttributes() {
    return {
      securedId: {
        default: null,
        parseHTML: (el) =>
          (el as HTMLSpanElement).getAttribute('data-secured-id'),
        renderHTML: (attrs) => ({ 'data-secured-id': attrs.securedId }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-secured-id]',
        getAttrs: (el) =>
          !!(el as HTMLSpanElement).getAttribute('data-secured-id')?.trim() &&
          null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  onSelectionUpdate() {
    const { $to } = this.editor.state.selection;

    const marks = $to.marks();

    if (!marks.length) {
      this.storage.activeSecuredId = null;
      this.options.onSecuredTextActivated(this.storage.activeSecuredId!);
      return;
    }

    const securedMark = this.editor.schema.marks.securedText;

    const activeSecuredMark = marks.find((mark) => mark.type === securedMark);

    this.storage.activeSecuredId = activeSecuredMark?.attrs.securedId || null;

    this.options.onSecuredTextActivated(this.storage.activeSecuredId!);
  },

  addStorage() {
    return {
      activeSecuredId: null,
    };
  },

  addCommands() {
    return {
      setLock:
        (securedId, lockLength) =>
        ({ commands, tr }) => {
          if (!securedId) return false;
          tr.replaceSelectionWith(
            this.editor.schema.text('X'.repeat(lockLength)),
          );

          const { from } = this.editor.state.selection!;

          const mark = this.editor.schema.marks.securedText.create({
            securedId,
          });
          tr.addMark(from, from + lockLength, mark);
          commands.setMark('securedText', { securedId });
          return true;
        },
      unsetLock:
        (lockedInfo: BlockType) =>
        ({ tr, dispatch }) => {
          if (!lockedInfo) return false;

          const securedMarksWithRange: MarkWithRange[] = [];

          tr.doc.descendants((node, pos) => {
            const securedMark = node.marks.find(
              (mark) =>
                mark.type.name === 'securedText' &&
                mark.attrs.securedId === lockedInfo.id,
            );

            if (!securedMark) return;

            securedMarksWithRange.push({
              mark: securedMark,
              range: {
                from: pos,
                to: pos + node.nodeSize,
              },
            });
          });

          securedMarksWithRange.forEach(({ mark, range }) => {
            tr.removeMark(range.from, range.to, mark);
          });

          // tr.replaceSelectionWith(this.editor.schema.text(text));
          tr.replaceWith(
            lockedInfo.from,
            lockedInfo.to,
            this.editor.schema.text(descrypt(lockedInfo.encrypted)),
          );

          return dispatch?.(tr);
        },
    };
  },
});
