var buildTable = function(data, target, termType) {
	var termType = undefined === termType ? 'Term' : termType;
	var ThirdTier = function(props) {
		var tertiaryWords = props.tertiaryWords;
		var compileWords = function(wordList) {
			console.log(wordList);
			var wordArray = [];
			for (var i = wordList.length - 1; i >= 0; i--) {
				wordArray.push(wordList[i].word);
			}
			return wordArray.join(', ');
		}
		var tertiaryString = compileWords(tertiaryWords);
		return (
			<div className='wh-tertiary'>
				<div className='wh-cell'><p>{tertiaryString}</p></div>
			</div>
		);
	};
	var SecondTier = function(props) {
		var secondaryWords = props.secondaryWords;
		var tertiaryString = function(wordList) {
			console.log(wordList);
			var wordArray = [];
			for (var i = wordList.length - 1; i >= 0; i--) {
				wordArray.push(wordList[i].word);
			}
			return wordArray.join(', ');
		}
		const secondary = secondaryWords.map((secondaryWord) =>
			<div>
				<div className='wh-cell'><p>{secondaryWord.word}</p></div>
				<div className='wh-tertiary'>
					<div>
						<div className='wh-cell'><p>{tertiaryString(secondaryWord.sub_words)}</p></div>
					</div>
				</div>
			</div>
		);
		return (
			<div className='wh-secondary'>
				{secondary}
			</div>
		);
	};
	var WHTable = function(props) {
		var rows = props.data;
		const tableRows = rows.map((row) =>
			<div className='wh-row'>
				<div className='wh-primary'>
					<div className='wh-cell'><p>{row.word}</p></div>
					<SecondTier secondaryWords={row.sub_words} />
				</div>
			</div>
		);
		return (
			<div className='wh-table'>
				<div className='wh-row wh-header-row'>
					<div className='wh-cell'><h3>Primary {props.term}</h3></div>
					<div className='wh-cell'><h3>Secondary {props.term}</h3></div>
					<div className='wh-cell'><h3>Tertiary {props.term}</h3></div>
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
