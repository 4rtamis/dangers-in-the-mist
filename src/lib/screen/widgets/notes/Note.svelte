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
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableHeader from '@tiptap/extension-table-header';
	import TableCell from '@tiptap/extension-table-cell';

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
				Table.configure({
					lastColumnResizable: false,
					resizable: true
				}),
				TableRow.configure({
					HTMLAttributes: {
						class: 'even:bg-transparent odd:bg-black/10'
					}
				}),
				TableHeader.configure({
					HTMLAttributes: {
						class: 'py-2 font-bold text-left align-top'
					}
				}),
				TableCell.configure({
					HTMLAttributes: {
						class: 'py-2 text-left align-top'
					}
				}),
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
					<table>
						<thead>
							<tr>
							<th colspan=3>When the PC's action primary goal is to...</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td><b>Gain an advantage or remedy a disadvantage</b> (generate Juice)</td>
							<td>Heal an ally, shake off a negative effect, create or obtain something useful, weaken a foe, change the environment as support (add/burn tag, give/remove status)</td>
							<td><b>CHANGE THE GAME</b></td>
							</tr>
							<tr>
							<td><b>Get someone to do something</b></td>
							<td>Intimidate, persuade, command, charm, seduce, negotiate</td>
							<td><b>CONVINCE</b></td>
							</tr>
							<tr>
							<td><b>Reduce or avoid an incoming status</b></td>
							<td>Block, dodge, parry, resist effect, withstand or ignore an attack or an attempt to influence</td>
							<td><b>FACE DANGER</b></td>
							</tr>
							<tr>
							<td><b>Overcome the opposition</b> (whether to secure a goal or to harm someone)</td>
							<td>Seize an object, person, or position under contention, outrun / outsmart / outmaneuver / overpower someone, attack a defensive opponent</td>
							<td><b>GO TOE TO TOE</b></td>
							</tr>
							<tr>
							<td><b>Harm someone or something that is open to attack</b> (give a status)</td>
							<td>Attack at a moment of opportunity or vulnerability: punch, blast, shoot, stab, put a spell on someone, cause social or financial harm</td>
							<td><b>HIT WITH ALL YOU'VE GOT</b></td>
							</tr>
							<tr>
							<td><b>Gather any kind of information</b> (generate Clues)</td>
							<td>Observe, search, study, call contacts, ask around, contact or tap into otherworldly knowledge</td>
							<td><b>INVESTIGATE</b> or <b>LOOK BEYOND THE MIST</b></td>
							</tr>
							<tr>
							<td><b>Hide</b> herself, her motives, her actions, or her allies</td>
							<td>Lie undetected, sneak, pickpocket, impersonate, follow someone, avoid electronic or magical detection</td>
							<td><b>SNEAK AROUND</b></td>
							</tr>
							<tr>
							<td><b>Perform a dangerous task under pressure</b></td>
							<td>Acrobatics, athletics, break a fall, climbing, high-speed or combat driving or piloting, picking a lock or cracking a safe, gambling, anything involving high risk</td>
							<td><b>TAKE THE RISK</b></td>
							</tr>
							<tr>
							<td colspan=3>When the PC's action <b>exceeds the agreed scope or use of her powers</b>, the player must <b>STOP. HOLDING. BACK.</b> and hope!</td>
							</tr>
							<tr>
							<td colspan=3>When the PC's action <b>goes against her Mysteries or Identities</b>, the player can, at his option, <b>MAKE A HARD CHOICE</b>.</td>
							</tr>
						</tbody>
					</table>

                `,
			editorProps: {
				attributes: {
					class:
						'bg-mist-note-box border-3 border-mist-note-border rounded-lg outline-none h-full w-full *:px-3 [&_th]:px-3 [&_td]:px-3 font-sans space-y-2 overflow-scroll'
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
	@reference "../../../../app.css";

	/*
	 * Workaround for the issue with the table not being able to be styled using classes when using resize: true
	 */

	:global {
		.tiptap {
			table {
				border-collapse: collapse;
				margin: 0;
				overflow: hidden;
				table-layout: fixed;
				width: 100%;

				td,
				th {
					position: relative;
					vertical-align: top;
				}

				td:nth-child(n + 2),
				th:nth-child(n + 2) {
					border-left-width: 2px;
					border-left-style: solid;
					border-left-color: var(--tw-border-mist-note-border); /* Tailwind color variable */
				}

				.selectedCell:after {
					background: var(--gray-2);
					content: '';
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					pointer-events: none;
					position: absolute;
					z-index: 2;
				}

				.column-resize-handle {
					background-color: var(--color-mist-note-border);
					bottom: 0px;
					pointer-events: none;
					position: absolute;
					right: -3px;
					top: 0;
					width: 4px;
				}
			}

			.tableWrapper {
				margin: 0;
				padding-left: 0;
				padding-right: 0;
				overflow-x: auto;
			}

			&.resize-cursor {
				cursor: ew-resize;
				cursor: col-resize;
			}
		}
	}
</style>
