class WHRow extends React.Component {
	constructor(props) {
		super(props);
		/* Bindings */
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
		this.onRowUpdate = this.onRowUpdate.bind(this);
		this.handleDeleteRow = this.handleDeleteRow.bind(this);
		this.handleAddRow = this.handleAddRow.bind(this);
		/* Set States */
		this.state = {
			value: props.value,
			word: props.word,
			level: props.level,
			maxLevel: props.maxLevel,
			children: (undefined !== props.children && Array.isArray(props.children) && props.children.length > 0) ? props.children : null,
			edit: this.props.edit ? this.props.edit : false,
			unMount: props.unMount ? props.unMount : false,
		};
		this.deleteRow = props.deleteRow ? props.deleteRow : null;

	}

	toggleEdit(e) {
		e.preventDefault();
		this.setState({
			edit: !this.state.edit,
		});
	}
	handleUpdateValue(e) {
		let index = this.state.value,
			children = this.state.children.concat(),
			row = {
				word: e.target.value,
				children: children,
			};
		e.preventDefault();
		this.props.onRowUpdate(index, row);
	}
	onRowUpdate(rowIndex, row) {
		let index = this.state.value,
			children = this.state.children.concat(),
			newRow;
		children[rowIndex] = row;		

		newRow = {
			word: this.state.word.concat(),
			children: children,
		};

		this.props.onRowUpdate(index, newRow);
	}
	handleDeleteRow(value) {
		var newSubCells = this.state.children.slice();
		var id = newSubCells.findIndex((element) => value in element);
		newSubCells.splice(id, 1);
		this.setState({
			children: newSubCells.length !== 0 ? newSubCells : [{}],
		});
	}
	handleAddRow(e) {
		e.preventDefault();
		that.setState({
			children: that.state.children.concat({'': []}),
		});
	}


	render() {
		const that = this;
		const maxLevel = that.state.maxLevel;
		const children = function(childRows, level) {
			if (maxLevel > level) {
				return(
					childRows.map((row, index) => {
						const word = row.word;
						const children = row.children;
						return (
							<WHRow key={index} unMount={that.state.unMount} word={word} value={index} level={level} children={children} maxLevel={maxLevel} deleteRow={that.handleDeleteRow} table={that.props.table} onRowUpdate={that.onRowUpdate} />
						);
					})
				);
			} else {
				if (maxLevel === level) {
					const word = childRows.map((row) => row.word).join(', ');
					return(
						<WHRow key={0} value={0} word={word} level={level} maxLevel={maxLevel} table={that.props.table} onRowUpdate={that.onRowUpdate} />
					);
				} else {
					return null;
				}
			}
		}
		const cellType = function(word) {
			if (that.state.edit) {
				return(	
					<div className='wh-cell'>
						<form onSubmit={that.toggleEdit}>
							<input id="edit-input-text" type="text" word={word} onChange={that.handleUpdateValue}></input>
						</form>
						<div className="edit edit-mode-button"><a href="#" onClick={that.toggleEdit}>Update</a></div>
					</div>
				);				
			} else {
				return(	
					<div className='wh-cell'>
						<p>{word}</p>
						<div className="edit edit-mode-button"><a href="#" onClick={that.toggleEdit}>Edit</a></div>
					</div>
				);
			}
		}
		if (that.state.unMount === false || that.state.level === that.state.maxLevel) {
			return(
				<div className='wh-row'>
					{cellType(that.state.word)}
					<div className='sub'>
						{children(that.state.children, (that.state.level + 1))}
						{(that.state.level < (that.state.maxLevel-1) ) ? (<div className="add edit-mode-button"><a href="#" onClick={that.handleAddRow}>Add Row</a></div>) : ('')}
					</div>
					{(that.state.level < (that.state.maxLevel) ) ? (<div className="delete edit-mode-button"><a href="#" onClick={(event) => {event.preventDefault(); that.deleteRow(that.state.value)}}>Delete</a></div>) : ('')}
				</div>
			);
		} else {
			return null;
		}
	}
}
class WHTable extends React.Component {
	constructor(props) {
		super(props);
		/* Bindings */
		this.resetTable = this.resetTable.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.onRowUpdate = this.onRowUpdate.bind(this);
		/* State */
		this.state = {
			term: undefined === props.term ? 'Term' : props.term,
			data: props.data,
			maxLevel: props.maxLevel,
			editMode: false,
		};
		this.newRowCounter = 0; // This is used to add a unique key to new rows (with no value) so as to add multiple rows 
	}
	resetTable(e) {
		e.preventDefault();
		this.setState({
			data: this.props.data
		});
	}
	newTable(e) {
		e.preventDefault();
		this.setState({
			data: [{}]
		});
	}
	toggleEdit(e) {
		e.preventDefault();
		this.setState({editMode: !this.state.editMode});
	}
	onRowUpdate(index, row) {
		let rows = this.state.data.concat();
		rows[index] = row;
		this.setState({
			data: rows,
		});
	}
	handleAddRow(e) {
		e.preventDefault();
		this.setState({
			data: this.state.data.concat({}),
		});
	}
	handleDeleteRow(value) {
		var newData = this.state.data.slice();
		var id = newData.findIndex((element) => value in element); // Search by term name.
		newData.splice(id, 1);
		this.setState({
			data: newData,
		});
	}
	render() {
		const that = this;
		const maxLevel = that.state.maxLevel;
		const tableClasses = function() {
			return 'wh-table-box' + (that.state.editMode ? ' edit-mode' : '');
		}
		const tableRows = that.state.data.map((row, index) => {
			const word = row.word;
			const children = row.children;
			return (
				<WHRow key={index} value={index} word={word} level={1} children={children} maxLevel={maxLevel} onRowUpdate={that.onRowUpdate} deleteRow={(event) => that.handleDeleteRow(index, event)} addRow={that.handleAddRow} table={that} />
			);
		});
		return (
			<div className={tableClasses()}>
				<div className="table-button-box">
					<div className="reset table-button"><a href="#" onClick={that.resetTable}>Revert to Sample</a></div>
					<div className="new table-button"><a href="#" onClick={that.newTable}>Create New Table</a></div>
					<div className="print table-button"><a href="#" onClick={print}>Print Table</a></div>
				</div>
				<div className='wh-table'>
					<div className='wh-row wh-header-row'>
						<div className='wh-primary'>
							<div className='wh-cell'><h3>Primary {that.state.term}</h3></div>
							<div className='wh-secondary'>
								<div>
									<div className='wh-cell'><h3>Secondary {that.state.term}</h3></div>
									<div className='wh-tertiary'>
										<div>
											<div className='wh-cell'><h3>Tertiary {that.state.term}</h3></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{tableRows}
					<div className="add edit-mode-button"><a href="#" onClick={that.handleAddRow}>Add Row</a></div>
				</div>
				<div className="toggle-edit"><a href="#" onClick={that.toggleEdit}>Edit Mode</a></div>
			</div>
		);
	}
}

var buildTable = function(data, targetId, termType, maxLevel) {

	ReactDOM.render(
		<WHTable data={data} term={termType} maxLevel={maxLevel} />,
		document.getElementById(targetId)
	);
};

buildTable(sampleHierarchy, 'wh-sample', "Emotion", 3);
