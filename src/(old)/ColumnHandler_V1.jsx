
function ColumnHandler(props) 
{
    console.log(props);
    const column_value=props.column_value;
    const column=props.column;

    return(
        <td>
        <button onClick={() => props.update_sort(column,"ASC")}>ASC</button>
        <button onClick={() => props.update_sort(column,"DESC")}>DESC</button>
        <input value={column_value} name={column} onChange={props.handleInputs}/>
        <select>{select_options}</select>
        </td>
    )
}

export default ColumnHandler;