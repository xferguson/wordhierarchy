class WHRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idRoot: (undefined !== props.id && null !== props.id && 'string' === typeof props.id) ? props.id : props.level.toString(),
			value: props.value,
			level: props.level,
			maxLevel: props.maxLevel,
			subCells: (undefined !== props.subCells && Array.isArray(props.subCells) && props.subCells.length > 0) ? props.subCells : null,
			edit: this.props.edit ? this.props.edit : false,
		};
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
		const subRows = function(subs, level) {
			if (subs !== null) {
				if (maxLevel === level) {
					const value = subs.map((row) => Object.keys(row)[0]).join(', ');
					return(
						<WHRow id={that.state.idRoot + '-' + 0} value={value} level={level} />
					);
				} else {
					return(
						subs.map((row, index) => {
							const word = row;
							const value = Object.keys(word)[0];
							const sub = word[value];
							return (
								<WHRow id={that.state.idRoot + '-' + index} value={value} level={level} subCells={sub} maxLevel={maxLevel} />
							);
						})
					);
				}
			} else {
				return null;
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
		return(
			<div className='wh-row'>
				{cellType(that.state.value)}
				<div className='sub'>{subRows(that.state.subCells, (that.state.level + 1))}</div>
			</div>
		);
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
	}
	render() {
		const maxLevel = this.state.maxLevel;
		const tableRows = this.state.data.map((row) => {
			const word = row;
			const value = Object.keys(word)[0];
			const sub = word[value];
			return (
				<WHRow value={value} level={0} subCells={sub} maxLevel={maxLevel} />
			);
		});
		return (
			<div className='wh-table'>
				<div className='wh-row wh-header-row'>
					<div className='wh-primary'>
						<div className='wh-cell'><h3>Primary {this.state.term}</h3></div>
						<div className='wh-secondary'>
							<div>
								<div className='wh-cell'><h3>Secondary {this.state.term}</h3></div>
								<div className='wh-tertiary'>
									<div>
										<div className='wh-cell'><h3>Tertiary {this.state.term}</h3></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{tableRows}
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
