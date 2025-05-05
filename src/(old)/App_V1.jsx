import { useState,useEffect } from 'react'
import TaekwondoElement from './TaekwondoElement';
import './App.css'
import get_excel_data from './get_excel_data.js'

const file_name="Class_Data.xlsx";
const columns=["ID","Name","Day","Start","End","Age"];

function App() {
  function handle_data()
  {
      console.log("Sorting with "+sort_column+" "+sort_direction);
      let sorted_data=[...taekwondo_class_dictionaries];

      console.log(sorted_data[0][sort_column]+" "+isNaN(sorted_data[0][sort_column]));
      if(sort_direction=="DESC")
      {
        if(isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column].localeCompare(a[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column]-a[sort_column]);
        }
      }
      else
      {
        if(isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column].localeCompare(b[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column]-b[sort_column]);
        }
      }
      /*const listItems = people.map(person => <li>{person}</li>);*/
      console.log(sorted_data);
      let taekwondo_class_elements=sorted_data.map(taekwondo_class => <TaekwondoElement key={taekwondo_class.ID} taekwondo_class={taekwondo_class}></TaekwondoElement>);
      setTaekwondo_Elements_Mapped(taekwondo_class_elements);
  }
  function update_sort(column,direction)
  {
    setSort_Column(column)
    setSort_Direction(direction);
    
    console.log(column+","+direction);
  }
  function handleInputs(e)
  {
    const column=e.target.name;
    const value=e.target.value;
    setInputs({...inputs,[column]:value});
  }
  

  //Creates an input for each column
  const [inputs,setInputs]=useState(Object.fromEntries(columns.map(key => [key, ""])));

  //Handles input updates
  useEffect(()=>
  {
    console.log("Inputs updated");
    console.log(inputs);
  },[inputs]);

  const columns_mapped_head=columns.map(column =><th key={column}>{column}</th>);
  /*const columns_mapped_body=columns.map(column=>
    <td key={column}>
    <button onClick={() => update_sort(column,"ASC")}>ASC</button>
    <button onClick={() => update_sort(column,"DESC")}>DESC</button>
    <input value={inputs[column]} name={column} onChange={handleInputs}/>
    </td>
  );*/
  const columns_mapped_body=columns.map(column=>
    <ColumnHandler key={column} column_value={inputs[value]}></ColumnHandler>
  );



  const [taekwondo_class_elements_mapped, setTaekwondo_Elements_Mapped ] = useState();

  //Create Buttons that let you sort by taekwondo_class data column
  const [ sort_direction, setSort_Direction ] = useState("ASC");
  const [ sort_column, setSort_Column ] = useState("ID");

  const [taekwondo_class_dictionaries,setTaekwondoDictionaries]=useState(null);

  useEffect(()=>
  {
    get_excel_data(file_name).then(setTaekwondoDictionaries);
  },[]);

  useEffect(() => {
    console.log("Effect Activated");
    if(taekwondo_class_dictionaries!=null)
    {
      handle_data();
    }
  }, [taekwondo_class_dictionaries,sort_column,sort_direction]); // <- this runs every time `data` changes


  return (
    <>
    <h1>Talium Classes</h1>
    <table>
    <thead><tr>{columns_mapped_head}</tr></thead>
    <tbody><tr>{columns_mapped_body}</tr></tbody>
    </table>
    {taekwondo_class_elements_mapped}
    </>
  )
}

export default App
