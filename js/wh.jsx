class WHCell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			subCells: (undefined !== props.subCells && null !== props.subCells && props.subCells.length > 0) ? props.subCells : null,
		};
	}
	render() {
		const getSubs = function(subs) {

			// const subRow = subs.map((row) => {
			// 	const word = row;
			// 	console.log(word);
			// 	const value = Object.keys(word)[0];
			// 	console.log(value);
			// 	const sub = word[value];
			// 	console.log(sub);
			// 	return (
			// 		<WHCell value={value} level={0} subCells={sub} />
			// 	);
			// });
			if (subs !== null) {
				return(
					subs.map((row) => {
						const word = row;
						console.log(word);
						const value = Object.keys(word)[0];
						console.log(value);
						const sub = word[value];
						console.log(sub);
						return (
							<WHCell value={value} level={0} subCells={sub} />
						);
					})
				);
			} else {
				return null;
			}
		}
		return(
			<div className='wh-cell'><p>{this.state.value}</p>{getSubs(this.state.subCells)}</div>
		);
	}
}
class WHTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfLevels: 3,
			term: undefined === props.term ? 'Term' : props.term,
			data: props.data,
		};
	}
	render() {
		const tableRows = this.state.data.map((row) => {
			const word = row;
			const value = Object.keys(word)[0];
			const sub = word[value];
			return (
				<div className='wh-row'>
					<WHCell value={value} level={0} subCells={sub} />
				</div>
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

var buildTable = function(data, target, termType) {

	// var termType = undefined === termType ? 'Term' : termType;
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
				wordArray.unshift(wordList[i].word); // make it alphabetical
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

	ReactDOM.render(
		<WHTable data={data} term={termType} />,
		document.getElementById(target)
	);
};

buildTable(sampleHierarchy, 'wh-sample', "Emotion");
