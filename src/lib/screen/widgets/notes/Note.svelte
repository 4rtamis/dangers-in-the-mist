<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import cx from 'clsx';
	import { Editor, EditorContent, FloatingMenu, createEditor } from 'svelte-tiptap';
	import YellowHighlight from './extensions/YellowHighlight';
	import PurpleHighlight from './extensions/PurpleHighlight';
	import GreenHighlight from './extensions/GreenHighlight';
	import RedHighlight from './extensions/RedHighlight';
	import NoteHeading from './extensions/NoteHeading';

	let editor = $state() as Readable<Editor>;
	type Level = 1 | 2 | 3 | 4 | 5 | 6;

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit.configure({
					heading: false, // disable default
					paragraph: {
						HTMLAttributes: {
							class: ''
						}
					}
				}),
				NoteHeading,
				YellowHighlight,
				PurpleHighlight,
				GreenHighlight,
				RedHighlight
			],
			content: `
                    <h1>Player Moves</h1>
					<p>
						When a PC <b>Investigates</b> and scores a 7-9, or as a 
						hard move, you can choose to ask the player about 
						their me that Martha knows it (per her custom move 
						<b>Pain Behind the Eyes</b>). This is a good chance to give 
						the character's themes and backstory some airtime.
					</p>
                `,
			editorProps: {
				attributes: {
					class:
						'bg-mist-note-box border-3 border-mist-note-border rounded-lg outline-none h-full w-full *:px-3 font-sans space-y-2'
				}
			}
		});
	});

	const toggleHeading = (level: Level) => {
		return () => {
			$editor.chain().focus().toggleHeading({ level }).run();
		};
	};

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};

	const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

{#if editor}
	<FloatingMenu editor={$editor}>
		<div data-test-id="floating-menu">
			<button
				class={cx('rounded-sm border border-black px-2 hover:bg-black hover:text-white', {
					'bg-black text-white': isActive('heading', { level: 1 })
				})}
				type="button"
				onclick={toggleHeading(1)}
			>
				h1
			</button>
			<button
				class={cx('rounded-sm border border-black px-2 hover:bg-black hover:text-white', {
					'bg-black text-white': isActive('bold')
				})}
				type="button"
				onclick={toggleBold}
			>
				bold
			</button>
			<button
				class={cx('rounded-sm border border-black px-2 hover:bg-black hover:text-white', {
					'bg-black text-white': isActive('italic')
				})}
				type="button"
				onclick={toggleItalic}
			>
				italic
			</button>
			<button onclick={() => $editor.chain().focus().setMark('yellowHighlight').run()}>
				Yellow
			</button>
		</div>
	</FloatingMenu>
{/if}

<EditorContent editor={$editor} class="bg-mist-note-box h-full w-full rounded-lg p-2" />

<style>
	ul {
		@apply list-disc space-y-2 pl-6;
	}
	strong {
		@apply font-bold;
	}
</style>
