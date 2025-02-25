import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export interface MistHighlightOptions {
	/**
	 * HTML attributes to add to the mistHighlight element.
	 * @default {}
	 * @example { class: 'foo' }
	 */
	HTMLAttributes: Record<string, any>;
}

type MistHighlightKind = 'tag' | 'status' | 'spectrum';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		mistHighlight: {
			/**
			 * Set a mistHighlight mark (either tag, status or spectrum)
			 * @param attributes The mistHighlight attributes
			 * @example editor.commands.setTag({ kind: 'status' })
			 */
			setMistHighlight: (attributes?: { kind: MistHighlightKind }) => ReturnType;
			/**
			 * Toggle a mistHighlight mark (either tag, status or spectrum)
			 * @param attributes The mistHighlight attributes
			 * @example editor.commands.toggleTag({ kind: 'status' })
			 */
			toggleMistHighlight: (attributes?: { kind: MistHighlightKind }) => ReturnType;
			/**
			 * Unset a mistHighlight mark
			 * @example editor.commands.unsetTag()
			 */
			unsetMistHighlight: () => ReturnType;
		};
	}
}

// Regex for matching the mistHighlight syntax
export const generalInputRegex = /(?:^|\s)(\{(?!\s+\{)((?:[^\}]+))\}(?!\s+\}))$/;
export const generalPasteRegex = /(?:^|\s)(\{(?!\s+\{)((?:[^\}]+))\}(?!\s+\}))$/g;
export const spectrumRegex = /:\d+}/;
export const statusRegex = /-\d+}/;

// Map of mistHighlight kind to CSS class
export const kindClassMap: Record<MistHighlightKind, string> = {
	tag: 'bg-mist-tag italic',
	status: 'bg-mist-status italic',
	spectrum: 'bg-mist-spectrum italic'
};

export const MistHighlight = Mark.create<MistHighlightOptions>({
	name: 'mistHighlight',

	addOptions() {
		return {
			HTMLAttributes: {}
		};
	},

	addAttributes() {
		return {
			kind: {
				default: 'tag' as MistHighlightKind,
				parseHTML: (element) =>
					Object.keys(kindClassMap).includes(element.getAttribute('data-kind') || '')
						? (element.getAttribute('data-kind') as MistHighlightKind)
						: ('tag' as MistHighlightKind),
				renderHTML: (attributes) => {
					return {
						'data-kind': attributes.kind,
						class: kindClassMap[attributes.kind as MistHighlightKind] + ''
					};
				}
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: 'mark'
			}
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
	},

	addCommands() {
		return {
			setMistHighlight:
				(attributes) =>
				({ commands }) => {
					return commands.setMark(this.name, attributes);
				},
			toggleMistHighlight:
				(attributes) =>
				({ commands }) => {
					return commands.toggleMark(this.name, attributes);
				},
			unsetMistHighlight:
				() =>
				({ commands }) => {
					return commands.unsetMark(this.name);
				}
		};
	},

	addKeyboardShortcuts() {
		return {
			'Mod-Shift-h': () => this.editor.commands.toggleMistHighlight()
		};
	},

	addInputRules() {
		return [
			markInputRule({
				find: generalInputRegex,
				type: this.type,
				getAttributes: (match) => {
					if (statusRegex.test(match[0])) {
						return {
							kind: 'status'
						};
					} else if (spectrumRegex.test(match[0])) {
						return {
							kind: 'spectrum'
						};
					} else {
						return {
							kind: 'tag'
						};
					}
				}
			})
		];
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: generalPasteRegex,
				type: this.type,
				getAttributes: (match) => {
					if (statusRegex.test(match[0])) {
						return {
							kind: 'status'
						};
					} else if (spectrumRegex.test(match[0])) {
						return {
							kind: 'spectrum'
						};
					} else {
						return {
							kind: 'tag'
						};
					}
				}
			})
		];
	}
});
