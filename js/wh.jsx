class WHRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// idRoot: this.props.id,
			// value: (undefined !== props.value && null !== props.value && 'string' === typeof props.value) ? props.value : '',
			value: props.value,
			word: props.word,
			level: props.level,
			maxLevel: props.maxLevel,
			// children: (undefined !== props.children && Array.isArray(props.children) && props.children.length > 0) ? props.children : [{}],
			children: (undefined !== props.children && Array.isArray(props.children) && props.children.length > 0) ? props.children : null,
			edit: this.props.edit ? this.props.edit : false,
			unMount: props.unMount ? props.unMount : false,
			// keyBase: props.keyBase,
		};
		this.deleteRow = props.deleteRow ? props.deleteRow : null;
	}
	render() {
		const that = this;
		const maxLevel = that.state.maxLevel;
		const toggleEdit = function(e) {
			e.preventDefault();
			that.setState({
				edit: !that.state.edit,
			});
		}
		const updateValue = function(e) {
			e.preventDefault();
			that.setState({
				value: e.target.value,
			});
		}
		const handleDeleteRow = function(value) {
			var newSubCells = that.state.children.slice();
			var id = newSubCells.findIndex((element) => value in element);
			newSubCells.splice(id, 1);
			that.setState({
				children: newSubCells.length !== 0 ? newSubCells : [{}],
			});

		}
		const filterRowValue = function(value) {
			var newValue = value;
			if (undefined === newValue || null === newValue || '' === newValue.trim()) {
				newValue = '+' + that.props.table.newRowCounter;
				that.props.table.newRowCounter = that.props.table.newRowCounter + 1;
			}
			return newValue;
		}
		const handleAddRow = function(e) {
			e.preventDefault();
			that.setState({
				children: that.state.children.concat({'': []}),
			});
		}
		const children = function(childRows, level) {
			if (maxLevel > level) {
				return(
					childRows.map((row, index) => {
						// const oldId = index;
						// const newId = that.state.idRoot + '-' + index;
						// const word = (undefined !== row && null !== row && 'object' === typeof row) ? row : {};
						const word = row.word;
						// const value = (undefined !== Object.keys(word)[0] && null !== Object.keys(word)[0]) ? Object.keys(word)[0] : '';
						// const filteredValue = filterRowValue(Object.keys(word)[0]);
						const children = row.children;
						// return (
						//  <WHRow key={index} value={index} word={word} level={0} children={children} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(index, event)} addRow={handleAddRow} table={that} />
						// 	<WHRow key={that.state.keyBase + '_' + filteredValue} keyBase={that.state.keyBase + '_' + filteredValue} id={newId} unMount={that.state.unMount} value={value} level={level} children={children} maxLevel={maxLevel} deleteRow={handleDeleteRow} table={that.props.table} />
						// );
						return (
							<WHRow key={index} unMount={that.state.unMount} word={word} value={index} level={level} children={children} maxLevel={maxLevel} deleteRow={handleDeleteRow} table={that.props.table} />
						);
					})
				);
			} else {
				if (maxLevel === level) {
					const word = childRows.map((row) => row.word).join(', ');
					// return(
					// 	<WHRow key={index} value={index} word={word} level={0} children={children} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(index, event)} addRow={handleAddRow} table={that} />
					// 	<WHRow key={0} value={0} word={word} level={level + 1} maxLevel={maxLevel} table={that.props.table} />
					// );
					return(
						<WHRow key={0} value={0} word={word} level={level} maxLevel={maxLevel} table={that.props.table} />
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
						<form onSubmit={toggleEdit}>
							<input id="edit-input-text" type="text" word={that.state.word} onChange={updateValue}></input>
						</form>
						<div className="edit edit-mode-button"><a href="#" onClick={toggleEdit}>Update</a></div>
					</div>
				);				
			} else {
				return(	
					<div className='wh-cell'>
						<p>{that.state.word}</p>
						<div className="edit edit-mode-button"><a href="#" onClick={toggleEdit}>Edit</a></div>
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
						{(that.state.level < (that.state.maxLevel-1) ) ? (<div className="add edit-mode-button"><a href="#" onClick={handleAddRow}>Add Row</a></div>) : ('')}
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
		this.state = {
			term: undefined === props.term ? 'Term' : props.term,
			data: props.data,
			maxLevel: props.maxLevel,
			editMode: false,
		};
		this.newRowCounter = 0; // This is used to add a unique key to new rows (with no value) so as to add multiple rows 
	}
	render() {
		const that = this;
		const maxLevel = that.state.maxLevel;
		const handleAddRow = function(e) {
			e.preventDefault();
			that.setState({
				data: that.state.data.concat({}),
			});
		}
		const handleDeleteRow = function(value) {
			var newData = that.state.data.slice();
			var id = newData.findIndex((element) => value in element); // Search by term name.
			newData.splice(id, 1);
			that.setState({
				data: newData,
			});
		}
		const toggleEdit = function(e) {
			e.preventDefault();
			that.setState({editMode: !that.state.editMode});
		}
		const tableClasses = function() {
			return 'wh-table-box' + (that.state.editMode ? ' edit-mode' : '');
		}
		const resetTable = function(e) {
			e.preventDefault();
			that.setState({
				data: that.props.data
			});
		}
		const newTable = function(e) {
			e.preventDefault();
			that.setState({
				data: [{}]
			});
		}
		const tableRows = that.state.data.map((row, index) => {
			// if (null === row || 'object' !== typeof row || Array.isArray(row)) {
			// 	return null;
			// }
			const word = row.word;
			const children = row.children;
			// return (
			// 	// <WHRow key={index} keyBase={index} id={id} value={value} level={0} children={children} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(value, event)} addRow={handleAddRow} table={that} /> //handleAddRow={(function(e) {e.preventDefault(); that.state.data = that.state.data.push({});})} />
			// );
			return (
				<WHRow key={index} value={index} word={word} level={1} children={children} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(index, event)} addRow={handleAddRow} table={that} />
			);
		});
		return (
			<div className={tableClasses()}>
				<div className="table-button-box">
					<div className="reset table-button"><a href="#" onClick={resetTable}>Revert to Sample</a></div>
					<div className="new table-button"><a href="#" onClick={newTable}>Create New Table</a></div>
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
					<div className="add edit-mode-button"><a href="#" onClick={handleAddRow}>Add Row</a></div>
				</div>
				<div className="toggle-edit"><a href="#" onClick={toggleEdit}>Edit Mode</a></div>
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
