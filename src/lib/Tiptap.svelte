<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Document from '@tiptap/extension-document';
	import Heading from '@tiptap/extension-heading';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
	import { MistHighlight } from '$lib/tiptap/extension-tag';

	let element: Element;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'flex flex-col items-start bg-red-100 p-4 font-serif text-normal'
				}
			},
			element: element,
			extensions: [
				Document,

				Paragraph.configure({
					HTMLAttributes: {
						class: 'font-serif mt-2'
					}
				}),
				Heading.configure({
					HTMLAttributes: {
						class: 'border-b-4 border-black font-title text-3xl font-black uppercase'
					}
				}),
				Text,
				MistHighlight
			],
			content: `<h1>Vector ★★★</h1>
			<p>When the crew encounters Vector, she is likely to be deep inside her virus structure made of human bodies. Vector can only be seen and reached if the structure is pierced or taken apart, in which case she is revealed to be Veronica Chang, barefoot and in a patient own,with eyes and veins blackened by the Vector substance.</p>`,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>

	<button
		on:click={() => editor.chain().focus().toggleTag().run()}
		class:active={editor.isActive('mistHighlight')}
	>
		Toggle tag
	</button>
	<button
		on:click={() => editor.chain().focus().unsetTag().run()}
		disabled={!editor.isActive('mistHighlight')}
	>
		Unset tag
	</button>
{/if}

<div bind:this={element}></div>

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
