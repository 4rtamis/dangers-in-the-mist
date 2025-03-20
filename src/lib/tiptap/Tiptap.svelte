<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Document from '@tiptap/extension-document';
	import BulletList from '@tiptap/extension-bullet-list';
	import ListItem from '@tiptap/extension-list-item';
	import Heading from '@tiptap/extension-heading';
	import Paragraph from '@tiptap/extension-paragraph';
	import Italic from '@tiptap/extension-italic';
	import Bold from '@tiptap/extension-bold';
	import HorizontalRule from '@tiptap/extension-horizontal-rule';
	import Text from '@tiptap/extension-text';
	import { MistHighlight } from '$lib/tiptap/extension-mist-highlight';

	let element: Element;
	let editor: Editor;

	const levelClassMap = {
		1: 'border-b-4 border-black font-title text-3xl font-black uppercase',
		2: 'text-2xl font-rift uppercase font-bold'
	};

	const MistHeading = Heading.extend({
		addAttributes() {
			return {
				level: {
					default: 1,
					//rendered: false,
					renderHTML: (attributes) => {
						return {
							class: levelClassMap[attributes.level]
						};
					}
				}
			};
		}
	});

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'flex flex-col items-start bg-red-100 p-4 font-serif text-normal shadow-xl'
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
				MistHeading,
				Text,
				HorizontalRule.configure({
					HTMLAttributes: {
						class: 'border-t-2 border-black w-full my-4'
					}
				}),
				BulletList.configure({
					HTMLAttributes: {
						class: 'list-disc list-inside'
					}
				}),
				ListItem.configure({
					HTMLAttributes: {
						class: '*:inline'
					}
				}),
				MistHighlight,
				Bold.configure({
					HTMLAttributes: {
						class: 'font-black'
					}
				}),
				Italic
			],
			content: `<h1>Vector ★★★</h1>
			<h2>Hurt or Subdue 6 / Convince or Mind-Control 5 / Cure 5</h2>
			<p>When the crew encounters Vector, she is likely to be deep inside her virus structure made of human bodies. Vector can only be seen and reached if the structure is pierced or taken apart, in which case she is revealed to be Veronica Chang, barefoot and in a patient own,with eyes and veins blackened by the Vector substance.</p>
			<ul>
				<li><strong>Human Exoskeleton:</strong> Vector is a living virus, and her body is made of human bodies. If there is way to pierce or take apart the structure, she can be reached and interacted with.</li>
			</ul>
			<hr/>
			<ul>
				<li>Infect someone with an intense viral load (<mark data-kind="status">infected-3</mark>)</li>
				<li>Fight the cure (remove three tiers from the <mark data-kind="spectrum">cure:5</mark> spectrum)</li>
			</ul>
			<hr/>
			<ul>
				<li>Lash out in rage</li>
				<li>Reveal her story as an unpopular teenager and her newfound sense of belonging</li>
			</ul>
			`,
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
		on:click={() => editor.chain().focus().toggleMistHighlight().run()}
		class:active={editor.isActive('mistHighlight')}
	>
		Toggle tag
	</button>
	<button
		on:click={() => editor.chain().focus().unsetMistHighlight().run()}
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
