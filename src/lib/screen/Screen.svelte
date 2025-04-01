<script lang="ts">
	import { createSwapy, type SlotItemMapArray, type Swapy, utils } from 'swapy';
	import { onDestroy, onMount, untrack } from 'svelte';
	import Placeholder from './widgets/placeholder/Placeholder.svelte';
	import Note from './widgets/notes/Note.svelte';

	type ScreenItem = {
		id: string;
		type: 'placeholder' | 'note';
	};

	type ScreenSlot = {
		id: string;
		row: number;
		col: number;
		rowSpan: number;
		colSpan: number;
	};

	type ScreenGrid = {
		rows: number;
		cols: number;
	};

	let intialGrid: ScreenGrid = { rows: 3, cols: 4 };

	let initialSlots: ScreenSlot[] = [
		{ id: 'slot-1', row: 1, col: 1, rowSpan: 1, colSpan: 4 },
		{ id: 'slot-2', row: 2, col: 1, rowSpan: 2, colSpan: 2 },
		{ id: 'slot-3', row: 2, col: 3, rowSpan: 1, colSpan: 2 },
		{ id: 'slot-4', row: 3, col: 3, rowSpan: 1, colSpan: 2 }
	];

	const initialItems: ScreenItem[] = [{ id: 'item-1', type: 'note' }];

	const initialSlotsToMerge: String[] = [
		// 'slot-1',
		// 'slot-2',
		// 'slot-3'
	];

	function initSlotItemMap(slots: ScreenSlot[], items: ScreenItem[]): SlotItemMapArray {
		return slots.map((slot, index) => ({
			item: items[index] ? items[index].id : '',
			slot: slot.id
		}));
	}

	function toSlottedItems(items: ScreenItem[], slots: ScreenSlot[], slotItemMap: SlotItemMapArray) {
		return slots.map((slot) => {
			const map = slotItemMap.find((m) => m.slot === slot.id);
			const item = items.find((i) => i.id === map?.item);
			return { slotId: slot.id, itemId: map?.item, slot, item };
		});
	}

	let grid = $state(intialGrid);
	let slots = $state(initialSlots);
	let items = $state(initialItems);
	let slotItemMap = $state(initSlotItemMap(initialSlots, initialItems));
	$inspect(slotItemMap);
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

		let itemId = '';

		slotsToMerge.forEach((slotId) => {
			// Check if any of the slots to merge has an item
			const map = slotItemMap.find((m) => m.slot === slotId);
			if (map?.item) {
				if (itemId === '') {
					itemId = map.item;
				} else {
					throw new Error('Merge aborted: More than one selected slot has an item.');
				}
			}

			const slot = slots.find((s) => s.id === slotId);

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

		// Replace slots with a new array containing the merged slot
		slots = [...slots.filter((s) => !slotSet.has(s.id)), mergedSlot];

		// Remove previous slots from slotItemMap and add the new merged slot
		slotItemMap = [
			...slotItemMap.filter((m) => !slotSet.has(m.slot)),
			{ slot: mergedSlot.id, item: itemId }
		];

		// Clear slotsToMerge
		slotsToMerge = [];

		// Update Swapy
		if (swapy) {
			swapy.update();
		}
	}

	function splitSlot(slotId: string) {
		const slot = slots.find((s) => s.id === slotId);
		if (!slot) return;

		// Check if the slot has an item
		let itemId = slotItemMap.find((m) => m.slot === slotId)?.item;

		// Create new slots
		let id: string;
		let newSlots: ScreenSlot[] = [];
		let newSlotItemMaps: SlotItemMapArray = [];
		for (let r = slot.row; r < slot.row + slot.rowSpan; r++) {
			for (let c = slot.col; c < slot.col + slot.colSpan; c++) {
				id = `split-${Date.now()}-${r}-${c}`;
				newSlots.push({
					id,
					row: r,
					col: c,
					rowSpan: 1,
					colSpan: 1
				});

				if (itemId) {
					newSlotItemMaps.push({ slot: id, item: itemId });
					itemId = '';
				} else {
					newSlotItemMaps.push({ slot: id, item: '' });
				}
			}
		}

		// Replace slots with a new array containing the new slots
		slots = [...slots.filter((s) => s.id !== slotId), ...newSlots];

		// Remove previous slot from slotItemMap and add the new slots
		slotItemMap = [...slotItemMap.filter((m) => m.slot !== slotId), ...newSlotItemMaps];

		// Update Swapy
		if (swapy) {
			swapy.update();
		}
	}
</script>

<div class="flex items-center gap-4">
	<button onclick={toggleDrag} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
		{dragEnabled ? 'Disable Drag' : 'Enable Drag'}
	</button>

	<button onclick={mergeSlots} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
		Merge Slots
	</button>

	<button
		onclick={() => splitSlot('slot-2')}
		class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black"
	>
		Split Slot 2
	</button>
</div>
<div class="h-full w-full" bind:this={container}>
	{#key grid}
		<div
			class="grid h-full w-full gap-1"
			style="grid-template-columns: repeat({grid.cols}, minmax(0, 1fr)); grid-template-rows: repeat({grid.rows}, minmax(0, 1fr));"
		>
			{#each slottedItems as { slotId, itemId, slot, item }, index}
				{#if slot}
					{#key slot.id}
						<div
							class="relative max-h-full max-w-full rounded bg-black/5 {slotsToMerge.includes(
								slot.id
							)
								? 'border-blue border-3'
								: ''}"
							data-swapy-slot={slot.id}
							style="grid-column: {slot.col} / span {slot.colSpan}; grid-row: {slot.row} / span {slot.rowSpan};"
						>
							{#if item}
								{#key itemId}
									<div class="h-full w-full shadow-xl" data-swapy-item={itemId}>
										{#if item.type === 'note'}
											<Note />
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
