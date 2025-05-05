import './TaekwondoElement.css';

function TaekwondoElement(props)
{
    function decimal_to_written_time(num)
    {
        //Convert
        num*=24;
        let hours = Math.floor(num);
        const minutes = Math.round((num - hours) * 60);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    }
    const taekwondo_class=props.taekwondo_class;
    return (
        <div className="TaekwondoElement">
        <h2>{taekwondo_class["Name/Rank"]}</h2>
        <h3>{taekwondo_class.Day} {decimal_to_written_time(taekwondo_class.Start)} - {decimal_to_written_time(taekwondo_class.End)}</h3>
        </div>
    );
}

export default TaekwondoElement;