/* eslint-env browser */
/* global React, ReactDOM, sampleHierarchy */
class WHRow extends React.Component {
    constructor(props) {
        super(props);
        /* Bindings */
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleUpdateValue = this.handleUpdateValue.bind(this);
        this.handleAddChildRow = this.handleAddChildRow.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.onRowUpdate = this.onRowUpdate.bind(this);
        this.onRowDelete = this.onRowDelete.bind(this);
        /* Set States */
        this.state = {
            value: props.value,
            word: props.word,
            level: props.level,
            maxLevel: props.maxLevel,
            children: (undefined !== props.children && Array.isArray(props.children) && props.children.length > 0) ? props.children : [{}],
            edit: this.props.edit ? this.props.edit : false,
        };
        /* Props */
        this.dataNeedsUpdate = false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.dataNeedsUpdate === true) {
            this.setState({
                word: nextProps.word,
                children: nextProps.children,
            });
            this.dataNeedsUpdate = false;
        }
    }

    toggleEdit(e) {
        e.preventDefault();
        this.setState({
            edit: !this.state.edit,
        });
    }
    handleUpdateValue(e) {
        let index = this.state.value,
            children = this.state.children ? this.state.children.concat() : null,
            row = {
                word: e.target.value,
                children: children,
            };
        e.preventDefault();
        this.dataNeedsUpdate = true;
        this.props.onRowUpdate(index, row);
    }
    handleAddChildRow(e) {
        let index = this.state.value,
            childRow = {
                word: "",
                children: null,
            },
            children = this.state.children ? this.state.children.concat([childRow]) : [childRow],
            row = {
                word: this.state.word,
                children: children,
            };
        e.preventDefault();
        this.dataNeedsUpdate = true;
        this.props.onRowUpdate(index, row);
    }
    handleDeleteRow(e) {
        let index = this.state.value;
        e.preventDefault();
        this.dataNeedsUpdate = true;
        this.props.onRowDelete(index);
    }
    onRowUpdate(rowIndex, row) {
        let index = this.state.value,
            children = this.state.children.concat(),// ? this.state.children.concat() : null,
            newRow;
        children[rowIndex] = row;
        newRow = {
            word: this.state.word,
            children: children,
        };

        this.props.onRowUpdate(index, newRow);
    }
    onRowDelete(rowIndex) {
        let index = this.state.value,
            children = this.state.children.concat(),
            newRow;
        children.splice(rowIndex, 1);
        newRow = {
            word: this.state.word,
            children: children,
        };

        this.props.onRowUpdate(index, newRow);
    }

    render() {
        const that = this;
        const maxLevel = that.state.maxLevel;
        const children = function(childRows, level) {
            if (childRows) {
                if (maxLevel > level) {
                    return(
                        childRows.map((row, index) => {
                            const word = row.word;
                            const children = row.children;
                            return (
                                <WHRow key={index} word={word} value={index} level={level} children={children} maxLevel={maxLevel} onRowUpdate={that.onRowUpdate} onRowDelete={that.onRowDelete} />
                            );
                        })
                    );
                } else {
                    if (maxLevel === level) {
                        const word = childRows.map((row) => row.word).join(", ");
                        return(
                            <WHRow key={0} value={0} word={word} level={level} maxLevel={maxLevel} onRowUpdate={that.onRowUpdate} onRowDelete={that.onRowDelete} />
                        );
                    } else {
                        return null;
                    }
                }
            } else {
                if (maxLevel === level) {
                    return(
                        <WHRow key={0} value={0} word={""} level={level} maxLevel={maxLevel} onRowUpdate={that.onRowUpdate} onRowDelete={that.onRowDelete} />
                    );
                } else {
                    return null;
                }
            }
        };
        const cellType = function(word) {
            if (that.state.edit) {
                return(    
                    <div className="wh-cell">
                        <form onSubmit={that.toggleEdit}>
                            <input id="edit-input-text" type="text" value={word} onChange={that.handleUpdateValue}></input>
                        </form>
                        <div className="edit edit-mode-button"><a href="#" onClick={that.toggleEdit}>Update</a></div>
                    </div>
                );                
            } else {
                return(    
                    <div className="wh-cell">
                        <p>{word}</p>
                        <div className="edit edit-mode-button"><a href="#" onClick={that.toggleEdit}>Edit</a></div>
                    </div>
                );
            }
        };
        return(
            <div className="wh-row">
                {cellType(that.state.word)}
                <div className="sub">
                    {children(that.state.children, (that.state.level + 1))}
                    {(that.state.level < (that.state.maxLevel-1) ) ? (<div className="add edit-mode-button"><a href="#" onClick={that.handleAddChildRow}>Add Row</a></div>) : ("")}
                </div>
                {(that.state.level < (that.state.maxLevel) ) ? (<div className="delete edit-mode-button"><a href="#" onClick={that.handleDeleteRow}>Delete</a></div>) : ("")}
            </div>
        );
    }
}
class WHTable extends React.Component {
    constructor(props) {
        super(props);
        /* Bindings */
        this.resetTable = this.resetTable.bind(this);
        this.newTable = this.newTable.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleAddChildRow = this.handleAddChildRow.bind(this);
        this.onRowUpdate = this.onRowUpdate.bind(this);
        this.onRowDelete = this.onRowDelete.bind(this);
        this.toggleEditTerm = this.toggleEditTerm.bind(this);
        this.handleEditTerm = this.handleEditTerm.bind(this);
        /* Set State */
        this.state = {
            term: undefined === props.term ? "Term" : props.term,
            data: props.data,
            maxLevel: props.maxLevel,
            editMode: false,
            editTerm: false,
        };
        this.newRowCounter = 0; // This is used to add a unique key to new rows (with no value) so as to add multiple rows 
    }

    resetTable(e) {
        e.preventDefault();
        this.setState({
            term: undefined === this.props.term ? "Term" : this.props.term,
            data: this.props.data,
            editMode: false,
            editTerm: false,
        });
    }
    newTable(e) {
        e.preventDefault();
        this.setState({
            term: "",
            data: [{ word: "", children: [{}] }],
            editMode: true,
            editTerm: true,
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
    onRowDelete(index) {
        let rows = this.state.data.concat();
        rows.splice(index, 1);
        this.setState({
            data: rows,
        });
    }
    handleAddChildRow(e) {
        let newRow = {
                word: "",
                children: null,
            },
            rows = this.state.data ? this.state.data.concat([newRow]) : [newRow];
        e.preventDefault();
        this.setState({
            data: rows,
        });
    }
    toggleEditTerm(e) {
        e.preventDefault();
        this.setState({
            editTerm: !this.state.editTerm,
        });
    }
    handleEditTerm(e) {
        e.preventDefault();
        this.setState({
            term: e.target.value,
        });
    }
    
    render() {
        const that = this;
        const maxLevel = that.state.maxLevel;
        const tableClasses = function() {
            return "wh-table-box" + (that.state.editMode ? " edit-mode" : "");
        };
        const isEditTermActive = () => that.state.editTerm ? "edit-term table-button active" : "edit-term table-button";
        const tableRows = that.state.data.map((row, index) => {
            const word = row.word;
            const children = row.children;
            return (
                <WHRow key={index} value={index} word={word} level={1} children={children} maxLevel={maxLevel} onRowUpdate={that.onRowUpdate} onRowDelete={that.onRowDelete} />
            );
        });
        return (
            <div className={tableClasses()}>
                <div className="table-button-box">
                    <div className="reset table-button"><a href="#" onClick={that.resetTable}>Revert to Sample</a></div>
                    <div className="new table-button"><a href="#" onClick={that.newTable}>Create New Table</a></div>
                    <div className={isEditTermActive()}>
                        <form onSubmit={that.toggleEditTerm}>
                            <input id="edit-input-text" type="text" placeholder="Enter Term" value={that.state.term} onChange={that.handleEditTerm}></input>
                        </form>
                        <a href="#" onClick={that.toggleEditTerm}>Edit Term</a>
                    </div>
                    <div className="print table-button"><a href="#" onClick={print}>Print Table</a></div>
                </div>
                <div className="wh-table">
                    <div className="wh-row wh-header-row">
                        <div className="wh-primary">
                            <div className="wh-cell"><h3>Primary {that.state.term}</h3></div>
                            <div className="wh-secondary">
                                <div>
                                    <div className="wh-cell"><h3>Secondary {that.state.term}</h3></div>
                                    <div className="wh-tertiary">
                                        <div>
                                            <div className="wh-cell"><h3>Tertiary {that.state.term}</h3></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tableRows}
                    <div className="add edit-mode-button"><a href="#" onClick={that.handleAddChildRow}>Add Row</a></div>
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

buildTable(sampleHierarchy, "wh-sample", "Emotion", 3);
