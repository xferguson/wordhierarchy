class WHRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// idRoot: (undefined !== props.key && null !== props.key && 'string' === typeof props.key) ? props.key : props.level.toString(),
			idRoot: this.props.id,
			value: (undefined !== props.value && null !== props.value && 'string' === typeof props.value) ? props.value : '',
			level: props.level,
			maxLevel: props.maxLevel,
			subCells: (undefined !== props.subCells && Array.isArray(props.subCells) && props.subCells.length > 0) ? props.subCells : [{}],
			edit: this.props.edit ? this.props.edit : false,
			unMount: props.unMount ? props.unMount : false,
		};
		// this.addRow = props.addRow;
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
				// edit: false,
			});
		}
		const handleDeleteRow = function(id) {
			console.log('id: ' + id);
			console.log(that.state.subCells[id])
			console.log('level: ' + that.state.level);
			console.log('maxLevel: ' + that.state.maxLevel);
			console.log('unMount: ' + that.state.unMount);
			// that.setState({
			// 	unMount: true,
			// 	value: null,
			// 	subCells: [],
			// 	edit: false,
			// });
			var id = id.split('-').pop();
			that.setState({
				subCells: that.state.subCells.slice(0,id).concat(that.state.subCells.slice(0,id+1)),
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
						console.log('Sub level ' + level + '\'s key is ' + newId);
						return (
							<WHRow id={newId} unMount={that.state.unMount} value={value} level={level} subCells={sub} maxLevel={maxLevel} deleteRow={handleDeleteRow} />
						);
					})
				);
			} else {
				if (maxLevel === level) {
					const value = subs.map((row) => Object.keys(row)[0]).join(', ');
					return(
						<WHRow id={that.state.idRoot + '-' + 0} value={value} level={level} maxLevel={maxLevel} />
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
						<div className="edit"><a href="#" onClick={toggleEdit}>Update</a></div>
					</div>
				);				
			} else {
				return(	
					<div className='wh-cell'>
						<p>{that.state.value}</p>
						<div className="edit"><a href="#" onClick={toggleEdit}>Edit</a></div>
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
						{(that.state.level < (that.state.maxLevel-1) ) ? (<div className="add"><a href="#" onClick={handleAddRow}>Add Row</a></div>) : ('')}
					</div>
					<div className="delete"><a href="#" onClick={(event) => {event.preventDefault(); that.deleteRow(that.state.idRoot)}}>Delete</a></div>
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
		};
		// this.handleAddRow = this.handleAddRow.bind(this);
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
		const handleDeleteRow = function(id) {
			// console.log('id: ' + id);
			// console.log(that.state.data[id])
			// that.setState({
			// 	data: that.state.data.concat({}),
			// });
			var id = id.split('-').pop();
			that.setState({
				data: that.state.data.slice(0,id).concat(that.state.data.slice(0,id+1)),
			});
		}
		const tableRows = that.state.data.map((row, index) => {
			if (null === row || 'object' !== typeof row || Array.isArray(row)) {
				return null;
			}
			const id = index;
			const word = row;
			const value = Object.keys(word)[0];
			const sub = word[value];
			console.log('main row has id of ' + id);
			return (
				<WHRow id={id} value={value} level={0} subCells={sub} maxLevel={maxLevel} deleteRow={(event) => handleDeleteRow(index, event)} addRow={handleAddRow} /> //handleAddRow={(function(e) {e.preventDefault(); that.state.data = that.state.data.push({});})} />
			);
		});
		return (
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
				<div className="add"><a href="#" onClick={handleAddRow}>Add Row</a></div>
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
