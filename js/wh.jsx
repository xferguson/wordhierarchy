var buildTable = function(data, target, termType) {
	var termType = undefined === termType ? 'Term' : termType;
	var SecondTier = function(props) {
		var secondaryWords = props.secondaryWords;
		console.log(secondaryWords);
		const secondary = secondaryWords.map((secondaryWord) =>
			<div>
				<div className='wh-cell wh-secondary'><p>{secondaryWord.word}</p></div>
				<div className='wh-cell wh-tertiary'><p>test vocab</p></div>
			</div>
		);
		return (
			<div>
				{secondary}
			</div>
		);
	};
	var WHTable = function(props) {
		var rows = props.data;
		const tableRows = rows.map((row) =>
			<div className='wh-row'>
				<div className='wh-cell wh-primary'><p>{row.word}</p></div>
				<SecondTier secondaryWords={row.sub_words} />
			</div>
		);
		return (
			<div className='wh-table'>
				<div className='wh-row wh-header-row'>
					<div className='wh-cell wh-primary'><h3>Primary {props.term}</h3></div>
					<div className='wh-cell wh-secondary'><h3>Secondary {props.term}</h3></div>
					<div className='wh-cell wh-tertiary'><h3>Tertiary {props.term}</h3></div>
				</div>
				{tableRows}
			</div>
		);
	};

	ReactDOM.render(
		<WHTable data={data} term={termType} />,
		document.getElementById(target)
	);
};

buildTable(sampleHierarchy, 'wh-sample', "Emotion");
