<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let gridSize = 4; // Grid is 4x4 by default
	let items = $state([]);

	function initializeGrid() {
		let initialItems = [];
		let id = 1;
		for (let row = 1; row <= gridSize; row++) {
			for (let col = 1; col <= gridSize; col++) {
				initialItems.push({ id, row, col, rowSpan: 1, colSpan: 1 });
				id++;
			}
		}
		items = initialItems;
	}

	function resizeItem(id, newRowSpan, newColSpan) {
		items = items.map((item) => {
			if (item.id === id) {
				return { ...item, rowSpan: newRowSpan, colSpan: newColSpan };
			}
			return item;
		});
		items = rebalanceGrid(items);
	}

	function rebalanceGrid(updatedItems) {
		let filledPositions = new Set();
		let newGrid = [];
		let idCounter = 1;

		for (let item of updatedItems) {
			let position = `${item.row}-${item.col}`;
			if (!filledPositions.has(position)) {
				newGrid.push({ ...item });
				for (let r = 0; r < item.rowSpan; r++) {
					for (let c = 0; c < item.colSpan; c++) {
						filledPositions.add(`${item.row + r}-${item.col + c}`);
					}
				}
			}
		}

		for (let row = 1; row <= gridSize; row++) {
			for (let col = 1; col <= gridSize; col++) {
				if (!filledPositions.has(`${row}-${col}`)) {
					newGrid.push({ id: idCounter++, row, col, rowSpan: 1, colSpan: 1 });
				}
			}
		}

		return newGrid;
	}

	$effect(initializeGrid);
</script>

<div class="grid">
	{#each items as item (item.id)}
		<div
			class="grid-item"
			style="grid-column: {item.col} / span {item.colSpan}; grid-row: {item.row} / span {item.rowSpan};"
		>
			{item.id}
			<div class="resize-controls">
				<button onclick={() => resizeItem(item.id, item.rowSpan + 1, item.colSpan)}>↓</button>
				<button onclick={() => resizeItem(item.id, item.rowSpan, item.colSpan + 1)}>→</button>
				<button onclick={() => resizeItem(item.id, Math.max(1, item.rowSpan - 1), item.colSpan)}
					>↑</button
				>
				<button onclick={() => resizeItem(item.id, item.rowSpan, Math.max(1, item.colSpan - 1))}
					>←</button
				>
			</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 100px);
		grid-template-rows: repeat(4, 100px);
		gap: 5px;
	}
	.grid-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: lightblue;
		border: 1px solid #000;
		position: relative;
	}
	.resize-controls {
		position: absolute;
		bottom: 5px;
		right: 5px;
		background: white;
		cursor: pointer;
	}
</style>
