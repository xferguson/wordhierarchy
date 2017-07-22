var buildTable = function(data, target, termType) {
	var termType = undefined === termType ? 'Term' : termType;
	var WHTable = function(props) {
		return (
			<div className='wh-table'>
				<div className='wh-row wh-header-row'>
					<div className='wh-cell'><h3>Primary {props.term}</h3></div>
					<div className='wh-cell'><h3>Secondary {props.term}</h3></div>
					<div className='wh-cell'><h3>Tertiary {props.term}</h3></div>
				</div>
				<div className='wh-row'>
					<div className='wh-cell'><p>test vocab</p></div>
					<div className='wh-cell'><p>test vocab</p></div>
					<div className='wh-cell'><p>test vocab</p></div>
				</div>
			</div>
		)
	};

	ReactDOM.render(
		<WHTable data={data} term={termType} />,
		document.getElementById(target)
	);
};

buildTable(sampleHierarchy, 'wh-sample');
