<script lang="ts">
	import { createSwapy, type SlotItemMapArray, type Swapy, utils } from 'swapy';
	import { onDestroy, onMount, untrack } from 'svelte';
	import Tiptap from './widgets/tiptap/Tiptap.svelte';
	import Placeholder from './widgets/Placeholder.svelte';

	type Item = {
		id: string;
		type: 'placeholder' | 'editor';
	};

	type Slot = {
		id: string;
		row: number;
		col: number;
		rowSpan: number;
		colSpan: number;
	};

	type Grid = {
		rows: number;
		cols: number;
	};

	let intialGrid: Grid = { rows: 3, cols: 4 };

	let initialSlots: Slot[] = [
		{ id: 'slot-1', row: 1, col: 1, rowSpan: 1, colSpan: 4 },
		{ id: 'slot-2', row: 2, col: 1, rowSpan: 2, colSpan: 2 },
		{ id: 'slot-3', row: 2, col: 3, rowSpan: 1, colSpan: 2 },
		{ id: 'slot-4', row: 3, col: 3, rowSpan: 1, colSpan: 2 }
	];

	const initialItems: Item[] = [{ id: 'item-1', type: 'placeholder' }];

	const initialSlotsToMerge: String[] = ['slot-3', 'slot-4'];

	function initSlotItemMap<Item>(slots: Slot[], items: Item[]): SlotItemMapArray {
		return slots.map((slot, index) => ({
			item: items[index] ? (items[index] as Item).id : '',
			slot: slot.id
		}));
	}

	function toSlottedItems(items: Item[], slots: Slot[], slotItemMap: SlotItemMapArray) {
		return slots.map((slot) => {
			const map = slotItemMap.find((m) => m.slot === slot.id);
			const item = items.find((i) => i.id === map?.item);
			return { slotId: slot.id, itemId: map?.item, slot, item };
		});
	}

	let grid = $state(intialGrid);
	let slots = $state(initialSlots);
	$inspect(slots);
	let items = $state(initialItems);
	let slotItemMap = $state(initSlotItemMap(initialSlots, initialItems));
	let slottedItems = $derived(toSlottedItems(items, slots, slotItemMap));
	let slotsToMerge = $state(initialSlotsToMerge);

	let container: HTMLElement;
	let swapy: Swapy | null = null;
	let dragEnabled = $state(true);

	let setSlotItemMap = (value: SlotItemMapArray) => (slotItemMap = value);

	$effect(() => {
		utils.dynamicSwapy(
			swapy,
			items,
			'id',
			untrack(() => slotItemMap),
			setSlotItemMap
		);
	});

	onMount(() => {
		if (container) {
			swapy = createSwapy(container, {
				manualSwap: true,
				swapMode: 'drop',
				enabled: dragEnabled
			});

			swapy.onSwap((event) => {
				requestAnimationFrame(() => {
					slotItemMap = event.newSlotItemMap.asArray;
				});
			});
		}
	});

	onDestroy(() => {
		swapy?.destroy();
	});

	function toggleDrag() {
		dragEnabled = !dragEnabled;
		if (swapy) {
			swapy.enable(dragEnabled);
		}
	}

	function mergeSlots() {
		if (slotsToMerge.length === 0) return;

		// Find the bounding box of the slots to merge
		let minRow = Infinity,
			maxRow = -Infinity;
		let minCol = Infinity,
			maxCol = -Infinity;
		let slotSet = new Set(slotsToMerge); // For quick lookup

		slotsToMerge.forEach((slotId) => {
			const slot = slots.find((s) => s.id === slotId);

			// Check if any of the slots to merge has an item
			const map = slotItemMap.find((m) => m.slot === slotId);
			if (map?.item) {
				throw new Error('Merge aborted: One of the selected slots has an item.');
			}

			if (slot) {
				minRow = Math.min(minRow, slot.row);
				maxRow = Math.max(maxRow, slot.row + slot.rowSpan - 1);
				minCol = Math.min(minCol, slot.col);
				maxCol = Math.max(maxCol, slot.col + slot.colSpan - 1);
			}
		});

		// Check if all positions in the bounding box are covered by the slots in slotsToMerge
		for (let r = minRow; r <= maxRow; r++) {
			for (let c = minCol; c <= maxCol; c++) {
				const isCovered = slots.some(
					(s) =>
						slotSet.has(s.id) &&
						r >= s.row &&
						r < s.row + s.rowSpan &&
						c >= s.col &&
						c < s.col + s.colSpan
				);
				if (!isCovered) {
					throw new Error('Merge aborted: The selected slots do not form a full rectangle.');
				}
			}
		}

		// Perform the merge
		const mergedSlot = {
			id: `merged-${Date.now()}`,
			row: minRow,
			col: minCol,
			rowSpan: maxRow - minRow + 1,
			colSpan: maxCol - minCol + 1
		};

		console.log(mergedSlot);

		// Remove previous slots and add new merged slot
		slots = slots.filter((s) => !slotSet.has(s.id));
		slots.push(mergedSlot);
		slotsToMerge = [];
		swapy.update();
	}
</script>

<div class="flex items-center gap-4">
	<button onclick={toggleDrag} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
		{dragEnabled ? 'Disable Drag' : 'Enable Drag'}
	</button>

	<button onclick={mergeSlots} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
		Merge Slots
	</button>
</div>
<div class="h-full w-full" bind:this={container}>
	{#key grid}
		<div
			class="grid h-full w-full gap-1"
			style="grid-template-columns: repeat({grid.cols}, 1fr); grid-template-rows: repeat({grid.rows}, 1fr);"
		>
			{#each slottedItems as { slotId, itemId, slot, item }, index}
				{#if slot}
					{#key slot.id}
						<div
							class="bg relative rounded bg-black/5 p-2 {slotsToMerge.includes(slot.id)
								? 'border-blue border-3'
								: ''}"
							data-swapy-slot={slot.id}
							style="grid-column: {slot.col} / span {slot.colSpan}; grid-row: {slot.row} / span {slot.rowSpan};"
						>
							{#if item}
								{#key itemId}
									<div class="h-full w-full" data-swapy-item={itemId}>
										{#if item.type === 'editor'}
											<Tiptap />
										{:else if item.type === 'placeholder'}
											<Placeholder />
										{/if}
									</div>
								{/key}
							{/if}
						</div>
					{/key}
				{/if}
			{/each}
		</div>
	{/key}
</div>
