class WHRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idRoot: this.props.id,
			value: (undefined !== props.value && null !== props.value && 'string' === typeof props.value) ? props.value : '',
			level: props.level,
			maxLevel: props.maxLevel,
			subCells: (undefined !== props.subCells && Array.isArray(props.subCells) && props.subCells.length > 0) ? props.subCells : [{}],
			edit: this.props.edit ? this.props.edit : false,
			unMount: props.unMount ? props.unMount : false,
			keyBase: props.keyBase,
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
			var newSubCells = that.state.subCells.slice();
			var id = newSubCells.findIndex((element) => value in element);
			newSubCells.splice(id, 1);
			that.setState({
				subCells: newSubCells.length !== 0 ? newSubCells : [{}],
			});

		}
		const handleAddRow = function(e) {
			e.preventDefault();
			that.setState({
				subCells: that.state.subCells.concat({}),
			});
		}
		const subRows = function(subs, level) {
			if (maxLevel > level) {
				return(
					subs.map((row, index) => {
						const oldId = index;
						const newId = that.state.idRoot + '-' + index;
						const word = (undefined !== row && null !== row && 'object' === typeof row) ? row : {};
						const value = undefined !== Object.keys(word)[0] ? Object.keys(word)[0] : '';
						const sub = word[value];
						return (
							<WHRow key={that.state.keyBase + '_' + value} keyBase={that.state.keyBase + '_' + value} id={newId} unMount={that.state.unMount} value={value} level={level} subCells={sub} maxLevel={maxLevel} deleteRow={handleDeleteRow} />
						);
					})
				);
			} else {
				if (maxLevel === level) {
					const value = subs.map((row) => Object.keys(row)[0]).join(', ');
					return(
						<WHRow key={that.state.keyBase + '_' + value} keyBase={that.state.keyBase + '_' + value} id={that.state.idRoot + '-' + 0} value={value} level={level} maxLevel={maxLevel} />
					);
				} else {
					return false;
				}
			}
		}
		const cellType = function(value) {
			if (that.state.edit) {
				return(	
					<div className='wh-cell'>
						<form onSubmit={toggleEdit}>
							<input id="edit-input-text" type="text" value={that.state.value} onChange={updateValue}></input>
						</form>
						<div className="edit edit-mode-button"><a href="#" onClick={toggleEdit}>Update</a></div>
					</div>
				);				
			} else {
				return(	
					<div className='wh-cell'>
						<p>{that.state.value}</p>
						<div className="edit edit-mode-button"><a href="#" onClick={toggleEdit}>Edit</a></div>
					</div>
				);
			}
		}
		if (that.state.unMount === false || (that.state.level) === that.state.maxLevel) {
			return(
				<div className='wh-row'>
					{cellType(that.state.value)}
					<div className='sub'>
						{subRows(that.state.subCells, (that.state.level + 1))}
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
			maxLevel: props.maxLevel - 1, // account for 0 based indexing
			editMode: false,
		};
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
		const toggleEdit = function() {
			that.setState({editMode: !that.state.editMode});
		}
		const tableClasses = function() {
			return 'wh-table' + (that.state.editMode ? ' edit-mode' : '');
		}
		const tableRows = that.state.data.map((row, index) => {
			if (null === row || 'object' !== typeof row || Array.isArray(row)) {
				return null;
			}
			const id = index;
			const word = row;
			const value = Object.keys(word)[0];
			const sub = word[value];
			return (
				<WHRow key={value} keyBase={value} id={id} value={value} level={0} subCells={sub} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(value, event)} addRow={handleAddRow} /> //handleAddRow={(function(e) {e.preventDefault(); that.state.data = that.state.data.push({});})} />
			);
		});
		return (
			<div className={tableClasses()}>
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
					<div className="toggle-edit"><a href="#" onClick={toggleEdit}>Edit Mode</a></div>
				</div>
				{tableRows}
				<div className="add edit-mode-button"><a href="#" onClick={handleAddRow}>Add Row</a></div>
			</div>
		);
	}
}

var buildTable = function(data, target, termType, maxLevel) {

	ReactDOM.render(
		<WHTable data={data} term={termType} maxLevel={maxLevel} />,
		document.getElementById(target)
	);
};

buildTable(sampleHierarchy, 'wh-sample', "Emotion", 3);
